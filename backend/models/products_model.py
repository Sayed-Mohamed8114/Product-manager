# pydantic is to make a validation and put conditions 
from pydantic import BaseModel

class Product(BaseModel):
    id:int 
    name:str
    description:str 
    price:float 
    quantity:int 


