from django.db import models
from django.utils import timezone
from users.models import User
# Create your models here.
class Diary(models.Model):
    class Meta:
        db_table = "Diary"
    
    diaryId = models.AutoField(primary_key=True)
    userId = models.ForeignKey(User, related_name="user", on_delete=models.CASCADE, db_column='userId')
    date = models.DateField(default=timezone.now)
    liked = models.BooleanField(default = False)
    title = models.TextField(default = 'title')
    contents = models.TextField()
    weather = models.CharField(max_length=20)

    