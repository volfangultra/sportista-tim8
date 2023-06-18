import os

import tensorflow as tf
import numpy as np
from django.forms.models import model_to_dict
from django.utils import timezone
from sklearn.preprocessing import MinMaxScaler

from backendSportista import settings
from sportista.models import UserGradesFieldTemp, SportistaUser, Renter, Sport, Field


def create_user_field_model():
    sports = list(Sport.objects.values('id'))
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(100, activation='relu', input_shape=(3 + 2 * len(sports),)),
        tf.keras.layers.Dense(5, activation='softmax')
    ])
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    model_path = os.path.join(os.getcwd(), 'saved_model')
    os.makedirs(model_path, exist_ok=True)
    model.save(model_path)


def izracunaj_godina(datum):
    current_date = timezone.now().date()

    age = current_date.year - datum.year

    if (current_date.month, current_date.day) < (datum.month, datum.day):
        age -= 1

    return age


def train():
    data = list(UserGradesFieldTemp.objects.all())

    if len(data) > 10:
        save_dir = os.path.join(os.getcwd(), 'saved_model')
        sports = list(Sport.objects.values('id'))
        model = tf.keras.models.load_model(save_dir)
        train_data = []
        y_train = []
        for sample in data:
            temp = []

            user = model_to_dict(sample.id_usera)
            field = model_to_dict(sample.id_fielda)

            if user['gender']:
                gender = 1
            else:
                gender = 0
            temp.append(gender)

            age = izracunaj_godina(user['date_of_birth'])
            temp.append(age)

            for i in range(len(user['plays_sports'])):
                user['plays_sports'][i] = user['plays_sports'][i].id
            for id in sports:
                if id['id'] in user['plays_sports']:
                    temp.append(1)
                else:
                    temp.append(0)
            temp.append(field['id'])
            for id in sports:
                if id['id'] == field['is_sport']:
                    temp.append(1)
                else:
                    temp.append(0)
            train_data.append(temp)
            y_train.append(sample.grade - 1)

        scaler = MinMaxScaler()

        train_data = np.array([np.array(xi) for xi in train_data])

        train_data = np.array(train_data)
        normalized_data = scaler.fit_transform(train_data)
        y_train = np.array(y_train)
        model.fit(normalized_data, y_train)
        model.save(save_dir)
        UserGradesFieldTemp.objects.all().delete()


def calculate_grade(grade):
    return grade[0] * 1 + grade[1] * 2 + grade[2] * 3 + grade[3] * 4 + grade[4] * 5


def predict(user):
    rez = []
    fields = Field.objects.all()
    sports = list(Sport.objects.values('id'))
    test_data = []
    for i in range(len(user['plays_sports'])):
        user['plays_sports'][i] = user['plays_sports'][i].id
    for field in fields:
        test = []
        field = model_to_dict(field)
        if user['gender']:
            gender = 1
        else:
            gender = 0
        test.append(gender)

        age = izracunaj_godina(user['date_of_birth'])
        test.append(age)

        for id in sports:
            if id['id'] in user['plays_sports']:
                test.append(1)
            else:
                test.append(0)

        test.append(field['id'])
        for id in sports:
            if id['id'] == field['is_sport']:
                test.append(1)
            else:
                test.append(0)
        test_data.append(test)

    save_dir = os.path.join(os.getcwd(), 'saved_model')
    model = tf.keras.models.load_model(save_dir)
    y_test = model.predict(test_data)
    print(y_test.shape)
    for i in range(len(fields)):
        temp_grade = calculate_grade(y_test[i])
        rez.append({"grade": temp_grade,
                    "field": fields[i].id
                    })

    return rez
