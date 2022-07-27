from django.db import models

# Create your models here.
class AI(models.Model):
    class Meta:
        db_table = "AI"
        
    diaryId = models.ForeignKey('diary.Diary', related_name="diary", on_delete=models.CASCADE, db_column='diaryId', unique=True, primary_key=True)
    image = models.FileField(upload_to='uploads/')
    comment = models.CharField(max_length=200, null = True)
    emotion = models.CharField(max_length=10, null = True)
