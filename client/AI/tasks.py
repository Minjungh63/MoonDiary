import base64
import numpy as np
import os
import sys
import subprocess
from AI.ai import comment_moon, keySentence, keyword_extract
from AI.models import AI
from diary.models import Diary
from config.celery import app
from PIL import Image



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
    # image_path = './AI/drawing_diary/output/image'+'01'+'.png'
    # with open(image_path, "rb") as image_file:
    #     image_data = base64.b64encode(image_file.read()).decode('utf-8')
    image = Image.open('./AI/drawing_diary/output/output.png')
    data = AI.objects.get(diaryId=dId)
    data.image = image
    data.save()

    return data.image
