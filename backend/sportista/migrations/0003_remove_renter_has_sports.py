# Generated by Django 4.2.1 on 2023-05-24 17:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sportista', '0002_alter_useraccount_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='renter',
            name='has_sports',
        ),
    ]
