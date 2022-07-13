from django.shortcuts import render
from django.views import View
from .models import AI

import numpy as np
import itertools
import torch

from konlpy.tag import Okt, Komoran
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from transformers import pipeline
from googletrans import Translator
from textrank import KeysentenceSummarizer
from pytorch_lightning.core.lightning import LightningModule
from transformers import PreTrainedTokenizerFast, GPT2LMHeadModel

# Create your views here.
def ai(request):
    return JsonResponse("mangham")