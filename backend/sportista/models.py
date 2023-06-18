from datetime import datetime, timedelta, time

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


# Create your models here.



class Sport(models.Model):
    name = models.CharField(max_length=255)


class SportistaUser(models.Model):
    id_logina = models.ForeignKey("UserAccount", blank=True, related_name="users_loged_in_account",
                                  on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    gender = models.BooleanField()
    date_of_birth = models.DateField()
    plays_sports = models.ManyToManyField(Sport)
    favourite_fields = models.ManyToManyField("Field", blank=True, related_name="users_favourite_set")

    monday_start = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    monday_end = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    tuesday_start = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    tuesday_end = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    wednesday_start = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    wednesday_end = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    thursday_start = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    thursday_end = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    friday_start = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    friday_end = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    saturday_start = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    saturday_end = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    sunday_start = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)
    sunday_end = models.TimeField(default=time(hour=0, minute=0, second=0, microsecond=0), null=True)


class Renter(models.Model):
    id_logina = models.ForeignKey("UserAccount", blank=True, related_name="renterts_loged_in_account",
                                  on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=255)
    rates_user = models.ManyToManyField(SportistaUser, through="RenterRatesUser", blank=True)


class UserAccountManager(BaseUserManager):
    def create_user(self, email, is_user, is_renter, is_admin, password=None, city=None):
        if not email:
            raise ValueError("Users must have email address")
        email = self.normalize_email(email)
        user = self.model(email=email, is_user=is_user, is_renter=is_renter, is_admin=is_admin, city=city)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra):
        if not email:
            raise ValueError("Users must have email address")
        email = self.normalize_email(email)
        user = self.model(email=email, is_superuser=True, is_staff=True, is_active=True, is_admin=True)
        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    city = models.CharField(max_length=255)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_user = models.BooleanField(default=False)
    is_renter = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["is_user", "is_renter", "is_admin", "city"]

    def __str__(self):
        return self.email


class Team(models.Model):
    id_leader = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="teams_leader_set")
    name = models.CharField(max_length=255, unique=False, null=True)
    users = models.ManyToManyField(SportistaUser, related_name="teams_users_set", blank=True)


class Field(models.Model):
    id_rentera = models.ForeignKey(Renter, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="field_name")
    address = models.CharField(max_length=255)
    details = models.CharField(max_length=1000)

    images = models.TextField(null=True)
    starts = models.TimeField()
    ends = models.TimeField()
    lock = models.BooleanField(default=False)

    image = models.TextField(null=True)
    price = models.IntegerField(null=True)

    is_sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    has_teams = models.ManyToManyField(Team, through="TeamRentsField", blank=True)

    def set_my_images(self, value):
        self.images = 'SPLIT'.join(value)

    def get_my_images(self):
        return self.images.split('SPLIT') if self.images else []

    def __str__(self):
        return str(self.get_my_images())


class TeamRentsField(models.Model):
    id_teama = models.ForeignKey(Team, on_delete=models.CASCADE)
    id_fielda = models.ForeignKey(Field, on_delete=models.CASCADE)
    cancelled = models.BooleanField(default=False)
    played = models.BooleanField(default=False)
    beginning = models.DateTimeField()
    ending = models.DateTimeField()
    price = models.IntegerField(default=0, null=True)


class RenterRatesUser(models.Model):
    id_renter = models.ForeignKey(Renter, on_delete=models.CASCADE)
    id_user = models.ForeignKey(SportistaUser, on_delete=models.CASCADE)
    rating = models.IntegerField()


class UserGradesField(models.Model):
    id_usera = models.ForeignKey(SportistaUser, on_delete=models.CASCADE)
    id_fielda = models.ForeignKey(Field, on_delete=models.CASCADE)
    grade = models.IntegerField()


class UserGradesFieldTemp(models.Model):
    id_usera = models.ForeignKey(SportistaUser, on_delete=models.CASCADE)
    id_fielda = models.ForeignKey(Field, on_delete=models.CASCADE)
    grade = models.IntegerField()


class UserClicksFieldTemp(models.Model):
    grade_giver = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="grade_giver", null=True)
    grade_reciver = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="grade_reciver", null=True)


class Inbox(models.Model):
    first_name = models.TextField(null=True)
    last_name = models.TextField(null=True)
    subject = models.TextField(null=True)
    text = models.TextField(null=True)
    time = models.DateTimeField(default=timezone.now)
    archived = models.BooleanField(default=False)


class TeamInvite(models.Model):
    sender = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="id_sender")
    reciver = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="id_reciver")


class PlayInvite(models.Model):
    invite_sender = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="id_invite_sender")
    invite_reciver = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="id_invite_reciver")
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, related_name="id_sport", null=True)
    field = models.ForeignKey(Field, on_delete=models.CASCADE, related_name="Id_field", null=True)
    price = models.IntegerField(null=True)
    start = models.DateTimeField(null=True)
    ends = models.DateTimeField(null=True)
    accepted = models.BooleanField(default=False, null=True)


class UserRatesUSer(models.Model):
    id_graders = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="grader", null=True)
    id_player = models.ForeignKey(SportistaUser, on_delete=models.CASCADE, related_name="player", null=True)
    grade = models.IntegerField(null=True)
