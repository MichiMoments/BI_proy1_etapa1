import nltk
from nltk.corpus import stopwords

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
