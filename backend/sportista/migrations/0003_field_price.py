# Generated by Django 4.2.1 on 2023-05-29 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sportista', '0002_alter_field_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='field',
            name='price',
            field=models.IntegerField(null=True),
        ),
    ]