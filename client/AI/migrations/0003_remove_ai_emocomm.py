# Generated by Django 4.0.5 on 2022-07-21 07:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AI', '0002_alter_ai_emocomm'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ai',
            name='emocomm',
        ),
    ]