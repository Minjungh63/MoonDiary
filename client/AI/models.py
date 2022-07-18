from django.db import models
# Create your models here.
class AI(models.Model):
    class Meta:
        db_table = "AI"
        
    diaryId = models.ForeignKey('diary.Diary', related_name="diary", on_delete=models.CASCADE, db_column='diaryId', unique=True, primary_key=True)
    image = models.TextField()
    comment = models.CharField(max_length=100)
    keyS = models.TextField()
    keyW = models.TextField()
    emotion = models.CharField(max_length=10)
    color = models.CharField(max_length=10)