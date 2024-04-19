import pandas as pd

from sklearn.model_selection import train_test_split

import nltk
nltk.download('stopwords', quiet=True)
from nltk.corpus import stopwords

from sklearn.pipeline import Pipeline

from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.linear_model import LogisticRegression

class limpieza:
    def solo_letras(self, texto):
        abc = "abcdefghijklmnñopqrstuvwxyz"
        new_texto = ""
        for i in range(len(texto)):
            if texto[i] not in abc:
                new_texto += " "
            else:
                new_texto += texto[i]
        return new_texto

    def limpiar(self):
        self.data = self.data.str.lower()
        self.data = self.data.str.replace("á", "a").str.replace("é", "e").str.replace("í", "i").str.replace("ó", "o").str.replace("ú", "u")
        self.data = self.data.apply(lambda x: self.solo_letras(x))
        return self.data
    
    def stopwords(self):
        stop = stopwords.words("spanish")
        self.data = self.data.apply(lambda x: " ".join([item for item in x.split() if item not in stop]))
        return self.data

    def stem(self):
        stemmer = nltk.SnowballStemmer("spanish")
        self.data = self.data.apply(lambda x: " ".join([stemmer.stem(item) for item in x.split()]))
        return self.data
    
    def fit(self, data, y=None):
        self.data = data
        self.limpiar()
        self.stem()
        self.stopwords()
        return self
    
    def transform(self, data):
        self.data = data
        self.limpiar()
        self.stem()
        self.stopwords()
        return self.data


data = pd.read_csv('tipo2_entrenamiento_estudiantes.csv')
data_train, data_test = train_test_split(data, test_size=0.2)
x_train, x_test = data_train["Review"], data_test["Review"]
y_train, y_test = data_train["Class"], data_test["Class"]
