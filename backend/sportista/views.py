from django.core import serializers
from django.core.serializers import serialize
from django.db.models.functions import ExtractMonth
from django.forms import model_to_dict
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.utils import json
from django.shortcuts import redirect
from django.core.mail import send_mail
from django.http import HttpResponse
from datetime import datetime
from pytz import timezone

from sportista.models import Field, Sport, Renter, UserAccount, SportistaUser, Inbox, UserGradesField, \
    UserGradesFieldTemp, TeamInvite

from sportista.models import Field, Sport, UserAccount, SportistaUser, Renter, Team, TeamRentsField

from sportista.recomendation import train, create_user_field_model, predict


# from sportista.models import Users


# Create your views here.

def test(request):
    train()
    create_user_field_model()
    return HttpResponse("To je backend Sporiste hehe")


def index(request):
    return HttpResponse("To je backend Sporiste hehe")


@api_view(['GET'])
def get_sports(request):
    list_of_sports = Sport.objects.all()
    res = serializers.serialize('json', list_of_sports)
    return HttpResponse(res, content_type="text/json-comment-filtered")


def get_emails(request):
    list_of_emails = list(UserAccount.objects.values_list('email', flat=True).all())
    res = json.dumps(list_of_emails)
    return HttpResponse(res, content_type="text/json-comment-filtered")


# @api_view(['GET'])
# def getListaUsera(request):
#    list_of_users = Field.objects.filter(is_sport=1)
#    res = serializers.serialize('json', list_of_users)
#
#    return HttpResponse(res, content_type="text/json-comment-filtered")

@api_view(['GET'])
def getFields(request, params):
    list_of_fields = Field.objects.filter(is_sport=params, lock=False)

    res = serializers.serialize('json', list_of_fields)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getRenterData(request, params):
    data1 = Renter.objects.filter(id_logina_id=params)
    data2 = UserAccount.objects.filter(id=params)

    data = list(data1) + list(data2)
    res = serializers.serialize('json', data)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getRenterFields(request, params):
    list_of_fields = Field.objects.filter(id_rentera_id=params)
    res = serializers.serialize('json', list_of_fields)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getUserReservations(request, params):
    citavatabela = TeamRentsField.objects.all()
    prazna = []

    for red in citavatabela:
        red = model_to_dict(red)
        tim = Team.objects.get(id=red["id_teama"])
        tim = model_to_dict(tim)
        fild = Field.objects.get(id=red["id_fielda"])
        fild = model_to_dict(fild)

        if tim["id_leader"] == params:
            red["beginning"] = red["beginning"].strftime('%Y-%m-%d %H:%M:%S')
            red["ending"] = red["ending"].strftime('%Y-%m-%d %H:%M:%S')
            red["fild"] = fild
            red["fild"]["starts"] = red["fild"]["starts"].strftime('%Y-%m-%d %H:%M:%S')
            red["fild"]["ends"] = red["fild"]["ends"].strftime('%Y-%m-%d %H:%M:%S')
            red["fild"]["has_teams"] = ""
            prazna.append(red)

    res = json.dumps(prazna)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getUserFields(request):
    list_of_fields = Field.objects.filter(lock=False)
    res = serializers.serialize('json', list_of_fields)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['POST'])
def changeRenterData(request, params):
    r = Renter.objects.get(id_logina_id=params)
    r.name = request.data.get("name")
    r.phone_number = request.data.get("phone_number")
    u = UserAccount.objects.get(id=params)
    u.city = request.data.get("city")
    u.email = request.data.get("email")
    r.save()
    u.save()

    return HttpResponse("ok")


@api_view(['GET'])
def getUserData(request, params):
    data1 = SportistaUser.objects.filter(id_logina_id=params)
    data2 = UserAccount.objects.filter(id=params)

    data = list(data1) + list(data2)
    res = serializers.serialize('json', data)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getFieldData(request, params):
    data = Field.objects.filter(id=params)

    res = serializers.serialize('json', data)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['POST'])
def changeUserData(request, params):
    su = SportistaUser.objects.get(id_logina_id=params)
    su.first_name = request.data.get("first_name")
    su.last_name = request.data.get("last_name")
    u = UserAccount.objects.get(id=params)
    u.city = request.data.get("city")
    u.email = request.data.get("email")
    su.save()
    u.save()

    return HttpResponse("ok")


@api_view(['POST'])
def editFieldData(request, params):
    f = Field.objects.get(id=params)
    f.name = request.data.get("name")
    if (request.data.get("sport")):
        f.is_sport_id = request.data.get("sport")
    f.address = request.data.get("location")
    f.details = request.data.get("description")
    f.price = request.data.get("price")
    if (request.data.get("img")):
        f.image = request.data.get("img")

    f.save()

    return HttpResponse("ok")


@api_view(['DELETE'])
def deleteRenterField(request, params):
    Field.objects.filter(id=params).delete()
    return HttpResponse("Ok")


@api_view(['POST'])
def spremi(request):
    objekat = Field(id_rentera_id=request.data.get("user"), name=request.data.get("name"),
                    address=request.data.get("location"), details=request.data.get("description"),
                    starts=request.data.get("start"), ends=request.data.get("end"),
                    is_sport_id=request.data.get("sport"), price=request.data.get("price"))
    objekat.save()
    lista = objekat.get_my_images()
    for image in request.data.get("img"):
        lista.append(image)
    objekat.set_my_images(lista)
    objekat.save()
    return HttpResponse("okej")


@api_view(['POST'])
def lock_field(request, id_field, state):
    if state == 0:
        Field.objects.filter(pk=id_field).update(lock=False)
    else:
        Field.objects.filter(pk=id_field).update(lock=True)
    return HttpResponse("okej")


@api_view(['GET'])
def getRenters(request):
    list_of_renters2 = UserAccount.objects.filter(is_renter=1)
    novi_renteri = []
    i = 0
    for user in list_of_renters2:
        odgovarajuci_renter = Renter.objects.filter(id_logina=user.id)

        if odgovarajuci_renter:
            temp = {"id": user.id, "name": odgovarajuci_renter[0].name, "phone": odgovarajuci_renter[0].phone_number,
                    "email": list_of_renters2[i].email, "city": list_of_renters2[i].city}
            i = i + 1
            novi_renteri.append(temp)

    res = json.dumps(novi_renteri)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getUsers(request):
    list_of_users2 = UserAccount.objects.filter(is_user=1)
    novi_useri = []
    i = 0
    for user in list_of_users2:
        odgovarajuci_user = SportistaUser.objects.filter(id_logina=user.id)

        if odgovarajuci_user:
            temp = {"id": user.id, "firstName": odgovarajuci_user[0].first_name,
                    "lastName": odgovarajuci_user[0].last_name,
                    "gender": odgovarajuci_user[0].gender,
                    "email": list_of_users2[i].email, "city": list_of_users2[i].city}
            i = i + 1
            novi_useri.append(temp)

    res = json.dumps(novi_useri)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['DELETE'])
def deleteRenter(request, params):
    Renter.objects.filter(id_logina_id=params).delete()
    UserAccount.objects.filter(id=params).delete()
    return HttpResponse("Ok")


@api_view(['DELETE'])
def deleteUser(request, params):
    SportistaUser.objects.filter(id_logina_id=params).delete()
    UserAccount.objects.filter(id=params).delete()
    return HttpResponse("Ok")


@api_view(['POST'])
def book_field_solo(request):
    # Pretvaranje stringa u datetime objekt
    start_time_str = request.data.get("start").replace('Z', '-02:00')
    end_time_str = request.data.get("ends").replace('Z', '-02:00')
    start_time = datetime.fromisoformat(start_time_str)
    end_time = datetime.fromisoformat(end_time_str)

    # Prilagođavanje vremena u željenu vremensku zonu
    tz = timezone('Europe/Sarajevo')
    adjusted_start_time = start_time.astimezone(tz)
    adjusted_end_time = end_time.astimezone(tz)

    # Spremanje prilagođenog vremena u bazu
    team = Team(id_leader=SportistaUser.objects.get(id=request.data.get("id_usera")))
    team.save()
    field = Field.objects.get(id=request.data.get("id_fielda"))
    field.has_teams.add(team, through_defaults={
        'price': request.data.get("price"),
        'beginning': adjusted_start_time,
        'ending': adjusted_end_time
    })

    return HttpResponse("Ok")

@api_view(['POST'])
def book_field_team(request, team_id):
    team = Team.objects.get(id=team_id)
    field = Field.objects.get(id=request.data.get("id_fielda"))
    field.has_teams.add(team, through_defaults={
        'price': request.data.get("price"),
        'beginning': request.data.get("start"),
        'ending': request.data.get("ends")
    })

    return HttpResponse("Ok")


@api_view(['GET'])
def get_dates(request, field_id):
    timovi = list(TeamRentsField.objects.all())
    temp = []
    for tim in timovi:
        temp.append({
            "start": str(tim.beginning),
            "end": str(tim.ending),
            "id_field": tim.id_fielda_id
        })
    res = json.dumps(temp)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['POST'])
def sendEmail(request):
    if request.method == 'POST':
        sender_email = request.data.get('sender_email')
        recipient_email = request.data.get('recipient_email')
        message = request.data.get('message')

        send_mail(
            'Warning',
            message,
            sender_email,
            [recipient_email],
            fail_silently=False,
        )
        return HttpResponse('Email sent successfully')

    return HttpResponse('Invalid request method')


@api_view(['POST'])
def favorite_field(request, field_id, user_id):
    user = SportistaUser.objects.get(id=user_id)
    field = Field.objects.get(id=field_id)
    user.favourite_fields.add(field)
    return HttpResponse("Ok")


@api_view(['POST'])
def unfavorite_field(request, field_id, user_id):
    user = SportistaUser.objects.get(id=user_id)
    field = Field.objects.get(id=field_id)
    user.favourite_fields.remove(field)
    return HttpResponse("Ok")


@api_view(['GET'])
def get_favorite_field(request, user_id):
    user = SportistaUser.objects.get(id=user_id)
    fields = list(user.favourite_fields.all())
    temp = []
    for field in fields:
        temp.append(field.id)
    res = json.dumps(temp)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def get_dates(request, field_id):
    timovi = list(TeamRentsField.objects.all())
    temp = []
    for tim in timovi:
        temp.append({
            "start": str(tim.beginning),
            "end": str(tim.ending)
        })
    res = json.dumps(temp)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getUsersCount(request):
    count = SportistaUser.objects.count()
    data = {'broj_osoba': count}
    json_data = json.dumps(data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['GET'])
def getRentersCount(request):
    count = Renter.objects.count()
    data = {'broj_osoba': count}

    json_data = json.dumps(data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['GET'])
def getRentalsData(request):
    rentals_per_month = []
    months = {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
    }

    # Logika za brojanje iznajmljenih terena po mjesecima
    for month in months:
        rentals_count = TeamRentsField.objects.annotate(rental_month=ExtractMonth('beginning')).filter(
            rental_month=months[month]).count()
        rentals_per_month.append(rentals_count)

    data = {
        'rentals_per_month': rentals_per_month,
    }
    json_data = json.dumps(data)
    return HttpResponse(json_data, content_type='application/json')


@api_view(['POST'])
def sendMessage(request):
    message = Inbox(first_name=request.data.get("firstName"), last_name=request.data.get("lastName"),
                    subject=request.data.get("subject"), text=request.data.get("message"))
    message.save()
    return HttpResponse("ok")


@api_view(['GET'])
def getMessages(request):
    messages = Inbox.objects.filter(archived=0)
    res = serializers.serialize('json', messages)
    print(res)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getArchivedMessages(request):
    messages = Inbox.objects.filter(archived=1)
    res = serializers.serialize('json', messages)
    print(res)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['DELETE'])
def deleteMessage(request, params):
    print(params)
    Inbox.objects.filter(pk=params).delete()
    return HttpResponse('OK')


@api_view(['POST'])
def archiveMessage(request, params):
    message = Inbox.objects.get(pk=params)
    message.archived = True
    message.save()
    return HttpResponse("OK")


@api_view(['GET'])
def get_bookings(request, id_rentera):
    bookings = list(TeamRentsField.objects.all())
    for i in range(len(bookings)):
        bookings[i] = model_to_dict(bookings[i])

    res = []
    for booking in bookings:
        print(booking)
        if not booking["cancelled"] and not booking["played"]:
            team = model_to_dict(Team.objects.get(id=booking["id_teama"]))
            user = model_to_dict(SportistaUser.objects.get(id=team["id_leader"]))
            userLogin = model_to_dict(UserAccount.objects.get(id=user["id_logina"]))
            field = model_to_dict(Field.objects.get(id=booking["id_fielda"]))
            if field["id_rentera"] == id_rentera:
                res.append({
                    "id": booking["id"],
                    "field": field["name"],
                    "booked_by": user["first_name"] + " " + user["last_name"],
                    "start": booking["beginning"].strftime('%Y-%m-%d %H:%M:%S'),
                    "end": booking["ending"].strftime('%Y-%m-%d %H:%M:%S'),
                    "email": userLogin["email"]
                })
    res = json.dumps(res)
    return HttpResponse(res, content_type='application/json')


@api_view(['POST'])
def cancel_booking(request, id_booking):
    print("HELLO")
    TeamRentsField.objects.filter(pk=id_booking).update(cancelled=True)

    return HttpResponse("ok")


@api_view(['POST'])
def approve_booking(request, id_booking):
    TeamRentsField.objects.filter(pk=id_booking).update(played=True)

    return HttpResponse("ok")


@api_view(['POST'])
def rate_field(request, rating, id_field, id_user):
    ocjena = UserGradesField(id_usera_id=id_user, id_fielda_id=id_field, grade=rating)
    ocjena_temp = UserGradesFieldTemp(id_usera_id=id_user, id_fielda_id=id_field, grade=rating)
    ocjena.save()
    ocjena_temp.save()
    return HttpResponse("ok")


@api_view(['GET'])
def get_ratings(request):
    ratings = UserGradesField.objects.all()
    res = serializers.serialize('json', ratings)

    return HttpResponse(res, content_type="application/json")


@api_view(['GET'])
def getRenterFieldsCount(request, params):
    sports = Sport.objects.all()
    renter_fields_count = []

    for sport in sports:
        field_count = Field.objects.filter(id_rentera_id=params, is_sport=sport).count()
        renter_fields_count.append({"sport": sport.name, "count": field_count})

    res = json.dumps(renter_fields_count)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getRenterFieldsPrice(request, params):
    fields = Field.objects.filter(id_rentera_id=params)
    renter_fields_price = []

    for field in fields:
        renter_fields_price.append({"name": field.name, "price": field.price})

    res = json.dumps(renter_fields_price)
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def getRenterFieldsTotalCount(request, params):
    fields_count = Field.objects.filter(id_rentera_id=params).count()
    res = json.dumps({"total_fields_count": fields_count})
    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['GET'])
def get_bookings_count(request, id_rentera):
    bookings = list(TeamRentsField.objects.all())
    count = 0

    for booking in bookings:
        booking = model_to_dict(booking)

        if not booking["cancelled"] and not booking["played"]:
            field = model_to_dict(Field.objects.get(id=booking["id_fielda"]))
            if field["id_rentera"] == id_rentera:
                count += 1

    res = json.dumps({"booking_count": count})
    return HttpResponse(res, content_type='application/json')


@api_view(['GET'])
def get_recommended_fields(request, user_id):
    user = SportistaUser.objects.get(id=user_id)
    rezultat = predict(model_to_dict(user))
    print(rezultat)
    rezultat = json.dumps(rezultat)


    return HttpResponse(rezultat, content_type='application/json')


@api_view(['GET'])
def get_team(request, id_user):
    teams = Team.objects.filter(id_leader_id=id_user)
    res = []
    for team in teams:
        team = model_to_dict(team)
        if team['users']:
            for i in range(len(team['users'])):
                team['users'][i] = model_to_dict(team['users'][i])
                team['users'][i].pop('date_of_birth')
                team['users'][i].pop('plays_sports')
                team['users'][i].pop('favourite_fields')
                team['users'][i].pop('monday_start')
                team['users'][i].pop('monday_end')
                team['users'][i].pop('tuesday_start')
                team['users'][i].pop('tuesday_end')
                team['users'][i].pop('wednesday_start')
                team['users'][i].pop('wednesday_end')
                team['users'][i].pop('thursday_start')
                team['users'][i].pop('thursday_end')
                team['users'][i].pop('friday_start')
                team['users'][i].pop('friday_end')
                team['users'][i].pop('saturday_start')
                team['users'][i].pop('saturday_end')
                team['users'][i].pop('sunday_end')
                team['users'][i].pop('sunday_start')
            res = team

    res = json.dumps(res)

    return HttpResponse(res, content_type="text/json-comment-filtered")


@api_view(['POST'])
def send_invite(request, id_user):
    sender = SportistaUser.objects.get(id=id_user)
    reciver_account= UserAccount.objects.get(email=request.data['email'])
    reciver = SportistaUser.objects.filter(id_logina_id=reciver_account.id)
    if reciver:
        temp = list(TeamInvite.objects.filter(sender=sender, reciver=reciver[0]))
        print(temp)
        if not temp:
            print("DOBAR")
            invite = TeamInvite(sender=sender, reciver=reciver[0])
            invite.save()
        return HttpResponse("Ok")
    else:
        return HttpResponse("Not OK")


@api_view(['GET'])
def get_invites(request, id_user):
    invites = TeamInvite.objects.filter(reciver_id=id_user)
    lista = []
    for invite in invites:
        sender = model_to_dict(invite.sender)
        reciver = model_to_dict(invite.reciver)
        lista.append({
            "id_sender": sender['id'],
            "sender_name": sender['first_name'] + " " + sender['last_name'],
            "id": invite.id,
        })

    lista = json.dumps(lista)
    return HttpResponse(lista, content_type="text/json-comment-filtered")

@api_view(['POST'])
def enter_team(request, id_user, id_invite, id_leader):
    print(id_user, id_invite, id_leader)
    teams = Team.objects.filter(id_leader_id=id_leader)
    print(teams)
    real_team = ""
    for team in teams:
        team = model_to_dict(team)
        if team['users']:
            real_team = team
    if real_team == "":
        new_team = Team(id_leader_id=id_leader)
        new_team.save()
        new_team.users.add(SportistaUser.objects.get(id=id_user))
        new_team.save()
        new_team.save()
    else:
        real_team.users.add(SportistaUser.objects.get(id=id_user))
        real_team.save()

    invite = TeamInvite.objects.get(id=id_invite)
    invite.delete()

    return HttpResponse("OK")


