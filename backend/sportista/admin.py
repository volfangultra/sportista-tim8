from django.contrib import admin
from .models import UserAccount, Field, Renter, Sport, Team, SportistaUser

# Register your models here.
admin.site.register(Team)
admin.site.register(Sport)
admin.site.register(Renter)
admin.site.register(SportistaUser)
admin.site.register(Field)
admin.site.register(UserAccount)
