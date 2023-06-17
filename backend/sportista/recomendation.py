import os

import tensorflow as tf
import numpy as np
from django.forms.models import model_to_dict

from backendSportista import settings
from sportista.models import UserGradesFieldTemp, SportistaUser, Renter, Sport, Field


def create_user_field_model():
    sports = list(Sport.objects.values('id'))
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(100, activation='relu', input_shape=(4 + 2*len(sports),)),
        tf.keras.layers.Dense(5, activation='softmax')
    ])

    model_path = os.path.join(os.getcwd(), 'saved_model')
    os.makedirs(model_path, exist_ok=True)
    model.save(model_path)


def train():
    save_dir = os.path.join(os.getcwd(), 'saved_model')
    model = tf.keras.models.load_model(save_dir)
    train_data = []
    data = list(UserGradesFieldTemp.objects.all())
    print(data)
    for sample in data:
        user = SportistaUser.objects.filter(id=sample['id_usera'])
        train_data.append({user['']})
    print(train_data)






