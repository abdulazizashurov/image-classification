# Generated by Django 3.2.4 on 2021-06-14 18:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='classfied',
            new_name='classified',
        ),
    ]
