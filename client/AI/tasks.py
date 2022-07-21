import time
from config.celery import app


@app.task
def test():
    time.sleep(1)
    print(1)
    time.sleep(1)
    print(2)
    return 10