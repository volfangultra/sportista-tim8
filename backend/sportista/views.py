from django.core import serializers
from django.db.models.functions import ExtractMonth
from django.forms import model_to_dict
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.utils import json
from django.shortcuts import redirect
from django.core.mail import send_mail
from django.http import HttpResponse

from sportista.models import Field, Sport, Renter, UserAccount, SportistaUser, Inbox

from sportista.models import Field, Sport, UserAccount, SportistaUser, Renter, Team, TeamRentsField


from sportista.recomendation import train, create_user_field_model


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

    print(prazna)
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
    print(request.data.get("start"))
    objekat = Field(id_rentera_id=request.data.get("user"), name=request.data.get("name"),address=request.data.get("location"),details=request.data.get("description"),starts=request.data.get("start"),ends=request.data.get("end"),is_sport_id=request.data.get("sport"),price=request.data.get("price"))
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
            temp = {"id": user.id, "firstName": odgovarajuci_user[0].first_name, "lastName": odgovarajuci_user[0].last_name,
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
    team = Team(id_leader=SportistaUser.objects.get(id=request.data.get("id_usera")), plays_sport_id=request.data.get("id_sporta"))
    team.save()
    print(request.data)
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
        rentals_count = TeamRentsField.objects.annotate(rental_month=ExtractMonth('beginning')).filter(rental_month=months[month]).count()
        rentals_per_month.append(rentals_count)

    data = {
        'rentals_per_month': rentals_per_month,
    }
    json_data = json.dumps(data)
    return HttpResponse(json_data, content_type='application/json')

@api_view(['POST'])
def sendMessage(request):
    message = Inbox(first_name = request.data.get("firstName"), last_name = request.data.get("lastName"), subject = request.data.get("subject"), text = request.data.get("message"))
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


