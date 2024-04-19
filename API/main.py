from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

from DataModel import DataModel
from joblib import load

from limpieza_module import limpieza

import numpy as np

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load("reviewModel.joblib")
from transformData import x_test, y_test

@app.get("/")
def read_root():
   return {"status": "Running"}

@app.post("/predict")
def make_predictions(dataModel: DataModel):
   df = pd.DataFrame(dataModel.dict(), columns=dataModel.dict().keys(), index=[0])
   df.columns = dataModel.columns()
   
   df["review"] = df["review"].apply(limpieza().limpiar)
   
   result = model.predict(df["review"]).tolist()[0]
   prob = model.predict_proba(df["review"]).tolist()[0]

   return {"result": result, "prob": prob}

@app.get("/metrics")
def get_metrics():
   y_pred = model.predict(x_test)
   
   report = classification_report(y_test, y_pred, target_names=model.named_steps['logisticregression'].classes_, output_dict=True)
   weighted = report.pop("weighted avg")
   del weighted["support"]
   keys = list(report.keys())
   for i in keys:
      try:
         del report[i]["support"]
         report[str(i)] = report[i]
         del report[i]
      except:
         continue
   report["weighted avg"] = weighted

   words = {}

   feature_names = model.named_steps['tfidfvectorizer'].get_feature_names_out()
   coefficients = model.named_steps['logisticregression'].coef_
   for i, class_label in enumerate(model.named_steps['logisticregression'].classes_):
      top5 = np.argsort(coefficients[i])[-5:][::-1]
      words[str(class_label)] = [[feature_names[j], coefficients[i][j]] for j in top5]
   
   return {"report": report, "words": words}

# python -m uvicorn main:app --reload