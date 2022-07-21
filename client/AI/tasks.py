import numpy as np
from AI.ai import comment_moon, get_emotion, keySentence
from AI.models import AI
from config.celery import app


@app.task
def run_emotion(doc, diaryId):
    emotion = get_emotion(doc)
    AI.objects.create(diaryId=diaryId, emotion = emotion.get())
    return emotion

@app.task
def run_comment(doc,diaryId):
    keyS = keySentence(doc)
    comm_moon = comment_moon(keyS)
    data = AI.objects.get(diaryId=diaryId)
    data.comment = comm_moon
    data.save()

# @app.task
# def run_picture(doc):
#     emotion = get_emotion(doc)
#     comm_emo = comment_emo(emotion)
#     keyW = keyword_extract(doc)
#     keyS = keySentence(doc)
#     comm_moon = comment_moon(keyS)
#     comm = comm_emo + comm_moon

#     return emotion, keyW, comm