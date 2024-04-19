from typing import Optional

from fastapi import FastAPI

import pandas as pd
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

from DataModel import DataModel
from joblib import load

from createPipeline import x_test, y_test

app = FastAPI()

model = load("reviewModel.joblib")

y_pred = model.predict(x_test)
report = classification_report(y_test, y_pred, output_dict=True)

@app.get("/")
def read_root():
   return {"status": "Running"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
   return {"item_id": item_id, "q": q}

@app.post("/predict")
def make_predictions(dataModel: DataModel) -> str:
    df = pd.DataFrame(dataModel.dict(), columns=dataModel.dict().keys(), index=[0])
    df.columns = dataModel.columns()
    print("LOADING")
    model = load("reviewModel.joblib")
    print("FUNCIONO")
    result = model.predict(df)
    return str(result)


# python -m uvicorn main:app --reload