import numpy as np
from AI.ai import comment_moon, get_emotion, keySentence, keyword_extract
from AI.models import AI
from diary.models import Diary
from config.celery import app


@app.task
def run_emotion(doc, dId):
    emotion = get_emotion(doc)
    print(emotion,"emotion")
    AI.objects.create(diaryId=Diary.objects.get(diaryId=dId), emotion = emotion)
    
    return emotion
    
    

@app.task
def run_comment(doc,dId):
    keyS = keySentence(doc)
    print(keyS,"keyS")
    comm_moon = comment_moon(keyS)
    print(comm_moon,"comm_moon")

    data = AI.objects.get(diaryId = dId)
    print(data)
    data.comment= comm_moon
    data.save()

    return comm_moon

# @app.task
# def run_picture(doc):
#     emotion = get_emotion(doc)
#     comm_emo = comment_emo(emotion)
#     keyW = keyword_extract(doc)
#     keyS = keySentence(doc)
#     comm_moon = comment_moon(keyS)
#     comm = comm_emo + comm_moon

#     return emotion, keyW, comm
