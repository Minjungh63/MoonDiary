# Generated by Django 4.0.5 on 2022-07-27 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AI', '0007_alter_ai_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ai',
            name='image',
            field=models.TextField(null=True),
        ),
    ]
