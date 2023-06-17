from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from django.shortcuts import redirect
from rest_framework.utils import json
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import get_object_or_404
import json

from urllib.parse import unquote

from sportista.models import Field, Sport, Renter, UserAccount, SportistaUser
from sportista.recomendation import create_user_field_model, train


def reset_password_confirm(request, uid, token):
    return redirect('http://localhost:3000/password/reset/confirm/' + uid + "/" + token)


def activate_account(request, uid, token):
    return redirect('http://localhost:3000/activate/' + uid + "/" + token)


@api_view(['POST'])
def add_renter(request):
    data = request.data
    account = UserAccount.objects.get(id=data['id'])
    r = Renter(name=unquote(data['name']), id_logina=account, phone_number=data['phone'])
    r.save()
    return HttpResponse()


@api_view(['POST'])
def add_user(request):
    data = request.data
    account = UserAccount.objects.get(id=data['id'])
    u = ""
    if data['gender'] == 'Male':
        u = SportistaUser(first_name=unquote(data['first_name']), last_name=unquote(data['last_name']), id_logina=account,gender=True, date_of_birth=data['date_of_birth'])
    else:
        u = SportistaUser(first_name=unquote(data['first_name']), last_name=unquote(data['last_name']),id_logina=account, gender=False, date_of_birth=data['date_of_birth'])
    u.save()
    for day, hours in data['user_availability'].items():
        if day == "Monday":
            u.monday_start = hours['startHour']
            u.monday_end = hours['endHour']
        if day == "Tuesday":
            u.tuesday_start = hours['startHour']
            u.tuesday_end = hours['endHour']
        if day == "Wednesday":
            u.wednesday_start = hours['startHour']
            u.wednesday_end = hours['endHour']
        if day == "Thursday":
            u.thursday_start = hours['startHour']
            u.thursday_end = hours['endHour']
        if day == "Friday":
            u.friday_start = hours['startHour']
            u.friday_end = hours['endHour']
        if day == "Saturday":
            u.saturday_start = hours['startHour']
            u.saturday_end = hours['endHour']
        if day == "Sunday":
            u.sunday_start = hours['startHour']
            u.sunday_end = hours['endHour']
    for i in range(len(data['sports'])):
        data['sports'][i] = int(data['sports'][i])

    sports = Sport.objects.filter(id__in=data['sports'])
    u.plays_sports.add(*sports)
    u.save()
    return HttpResponse()


@api_view(['GET'])
def get_renter(request, id):
    renters = list(Renter.objects.filter(id_logina=id).values())
    res = json.dumps(renters[0])
    return HttpResponse(res, content_type="text/json-comment-filtered")

@api_view(['GET'])
def get_user(request, id):
    train()
    sportista_users = list(SportistaUser.objects.filter(id_logina=id).values())
    res = json.dumps(sportista_users[0], cls=DjangoJSONEncoder)
    return HttpResponse(res, content_type="text/json-comment-filtered")
