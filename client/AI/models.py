from django.db import models
from diary.models import Diary
# Create your models here.
class AI(models.Model):
    class Meta:
        db_table = "AI"
        
    diaryId = models.ForeignKey(Diary, related_name="diaryId_id", on_delete=models.CASCADE, primary_key=True)
    image = models.TextField()
    comment = models.CharField(max_length=100)
    keyS = models.TextField()
    keyW = models.TextField()
    emotion = models.CharField(max_length=10)
    color = models.CharField(max_length=10)