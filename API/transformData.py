from sklearn.model_selection import train_test_split
from limpieza_module import limpieza
import pandas as pd

data = pd.read_csv('tipo2_entrenamiento_estudiantes.csv')

data["Review"] = data["Review"].apply(limpieza().limpiar)

data_train, data_test = train_test_split(data, test_size=0.2)
x_train, x_test = data_train["Review"], data_test["Review"]
y_train, y_test = data_train["Class"], data_test["Class"]