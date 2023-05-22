# Generated by Django 4.2.1 on 2023-05-20 12:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('city', models.CharField(max_length=255)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_user', models.BooleanField(default=False)),
                ('is_renter', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Field',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=255)),
                ('details', models.CharField(max_length=1000)),
                ('image', models.ImageField(null=True, upload_to='')),
                ('starts', models.TimeField()),
                ('ends', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Sport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SportistaUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('gender', models.BooleanField()),
                ('date_of_birth', models.DateField()),
                ('favourite_fields', models.ManyToManyField(blank=True, related_name='users_favourite_set', to='sportista.field')),
                ('id_logina', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='users_loged_in_account', to=settings.AUTH_USER_MODEL)),
                ('plays_sports', models.ManyToManyField(to='sportista.sport')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('id_leader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams_leader_set', to='sportista.sportistauser')),
                ('plays_sport', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams_sport_set', to='sportista.sport')),
                ('users', models.ManyToManyField(blank=True, related_name='teams_users_set', to='sportista.sportistauser')),
            ],
        ),
        migrations.CreateModel(
            name='UserGradesField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.IntegerField()),
                ('id_fielda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sportista.field')),
                ('id_usera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sportista.sportistauser')),
            ],
        ),
        migrations.CreateModel(
            name='TeamRentsField',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('beginning', models.DateTimeField()),
                ('ending', models.DateTimeField()),
                ('id_fielda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sportista.field')),
                ('id_teama', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sportista.team')),
            ],
        ),
        migrations.CreateModel(
            name='Renter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('phone_number', models.CharField(max_length=255)),
                ('has_sports', models.ManyToManyField(to='sportista.sport')),
                ('id_logina', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='renterts_loged_in_account', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='field',
            name='grades',
            field=models.ManyToManyField(blank=True, through='sportista.UserGradesField', to='sportista.sportistauser'),
        ),
        migrations.AddField(
            model_name='field',
            name='has_teams',
            field=models.ManyToManyField(blank=True, through='sportista.TeamRentsField', to='sportista.team'),
        ),
        migrations.AddField(
            model_name='field',
            name='id_rentera',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sportista.renter'),
        ),
        migrations.AddField(
            model_name='field',
            name='is_sport',
            field=models.ManyToManyField(to='sportista.sport'),
        ),
    ]
