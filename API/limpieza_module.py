import nltk
from nltk.corpus import stopwords

class limpieza:

    def solo_letras(self, texto):
        abc = set(list("abcdefghijklmnñopqrstuvwxyz"))
        new_texto = ""
        for i in range(len(texto)):
            if texto[i] not in abc:
                new_texto += " "
            else:
                new_texto += texto[i]
        return new_texto

    def texto(self):
        self.data = self.data.lower()
        self.data = self.data.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u")
        self.data = self.solo_letras(self.data)
        return self.data
    
    def stopwords(self):
        stop = stopwords.words("spanish")
        self.data = " ".join([item for item in self.data.split() if item not in stop])
        return self.data

    def stem(self):
        stemmer = nltk.SnowballStemmer("spanish")
        self.data = " ".join([stemmer.stem(item) for item in self.data.split()])
        return self.data
    
    def limpiar(self, data):
        self.data = data
        self.texto()
        self.stem()
        self.stopwords()
        return self.data
