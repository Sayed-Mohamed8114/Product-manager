# pydantic is to make a validation and put conditions 
from pydantic import BaseModel

# base model here its job is to make a validation of the data that will be passed to the api 

class Product(BaseModel):
    id:int 
    name:str
    description:str 
    price:float 
    quantity:int 


