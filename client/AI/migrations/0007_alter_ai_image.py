# Generated by Django 4.0.5 on 2022-07-27 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AI', '0006_alter_ai_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ai',
            name='image',
            field=models.ImageField(blank=True, upload_to='images/'),
        ),
    ]
