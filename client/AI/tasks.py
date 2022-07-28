import base64
import numpy as np
import os
import sys
import subprocess
from AI.ai import comment_moon, keySentence, keyword_extract
from AI.models import AI
from diary.views import writeView
from diary.models import Diary
from config.celery import app



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


@app.task
def run_pixray(doc, dId):
    keyW = keyword_extract(doc)
    keyW = keyW.replace(' ', '_')
    print(keyW)
    os.chdir("/home/lab/yugyeom/lab/MoonDiary/client/AI/drawing_diary/pixray")
    sys.path.append("/home/lab/yugyeom/lab/MoonDiary/client/AI/drawing_diary/pixray")
    subprocess.run(
        ["python", "pixray.py", "--drawer=line_sketch", "--prompt=%s" % (keyW), "--outdir=../output"])
    image_path = f'http://168.188.123.158:8000/media/output{writeView.returnID()}.png' #동적으로 변경해야함
    data = AI.objects.get(diaryId=dId)
    data.image = image_path
    data.save()
    return data.image
