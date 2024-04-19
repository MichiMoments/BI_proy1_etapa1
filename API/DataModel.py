from pydantic import BaseModel

class DataModel(BaseModel):
    review: str

    def columns(self):
        return ['review']