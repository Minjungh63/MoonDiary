import os
import time
from celery import Celery
 
# `celery` 프로그램을 작동시키기 위한 기본 장고 세팅 값을 정한다. 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
 
app = Celery('config')
# namespace='CELERY'는 모든 셀러리 관련 구성 키를 의미한다. 반드시 CELERY라는 접두사로 시작해야 한다. 
app.config_from_object('django.conf:settings', namespace='CELERY')
# 장고 app config에 등록된 모든 taks 모듈을 불러온다. 
app.autodiscover_tasks()

@app.task
def add(x, y):
    print(x+y)
    return x + y

@app.task(bind=True)
def hello(self, a, b):
    time.sleep(1)
    self.update_state(state="PROGRESS", meta={'progress': 50})
    time.sleep(1)
    self.update_state(state="PROGRESS", meta={'progress': 90})
    time.sleep(1)
    return '결과값 리턴 : %i' % (a+b)

@app.task(bind=True)
def oneSeconds(self, a, b):
    time.sleep(1)
    self.update_state(state="PROGRESS", meta={'progress': 50})
    time.sleep(1)
    self.update_state(state="PROGRESS", meta={'progress': 90})
    return '1초씩 2번 : %i' % (a+b)

@app.task(bind=True)
def twoSeconds(self, a, b):
    time.sleep(2)
    self.update_state(state="PROGRESS", meta={'progress': 50})
    time.sleep(2)
    self.update_state(state="PROGRESS", meta={'progress': 90})
    return '2초씩 두번 : %i' % (a+b)