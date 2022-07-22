import numpy as np
from AI.ai import comment_moon, get_emotion, keySentence, keyword_extract
from AI.models import AI
from diary.models import Diary
from config.celery import app


@app.task
def run_emotion(doc, dId):
    emotion = get_emotion(doc)
    print(emotion, "emotion")
    AI.objects.create(diaryId=Diary.objects.get(diaryId=dId), emotion=emotion)

    return emotion


@app.task
def run_comment(doc, dId):
    keyS = keySentence(doc)
    print(keyS, "keyS")
    comm_moon = comment_moon(keyS)
    print(comm_moon, "comm_moon")

    data = AI.objects.get(diaryId=dId)
    print(data)
    data.comment = comm_moon
    data.save()

    return comm_moon


<<<<<<< HEAD
# @app.task
# def run_picture(doc):
#     emotion = get_emotion(doc)
#     comm_emo = comment_emo(emotion)
#     keyW = keyword_extract(doc)
#     keyS = keySentence(doc)
#     comm_moon = comment_moon(keyS)
#     comm = comm_emo + comm_moon

#     return emotion, keyW, comm
=======
@app.task
def run_pixray(doc):
    keyW = keyword_extract(doc)
    keyW = keyW.replace(' ', '_')
    # keyW = 'mountain_climbing'
    os.chdir("drawing_diary/pixray")
    sys.path.append("drawing_diary/pixray")
    subprocess.run(
        ["python", "pixray.py", "--drawer=line_sketch", "--prompt=%s" % (keyW), "--outdir=../output"])
    PATH = 'drawing_diary/output/output.png'
    return keyW, PATH
>>>>>>> e766a6c49d1ddf9ef23e11eb9dbc6441751a02cd
