from django.db import models
from tensorflow import keras
import numpy as np
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2,decode_predictions,preprocess_input



class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Image classfied at {self.uploaded.strftime("%Y-%m-%d %H:%M")}'

    def save(self, *args, **kwargs):
        try:
            picture = f"{self.picture.path}"
            img = keras.preprocessing.image.load_img(picture, target_size=(299,299))
            img_array = keras.preprocessing.image.img_to_array(img)
            to_pred = np.expand_dims(img_array,axis=0) #(1,299,299,3)
            prep = preprocess_input(to_pred)
            model = InceptionResNetV2(weights='imagenet')
            prediction = model.predict(prep)
            decoded = decode_predictions(prediction)[0][0][1]
            self.classified = str(decoded)
        except Exception as err:

            print('Error', err)
        
        super().save(*args, **kwargs)


