from fastapi import FastAPI
from models.products_model import Product

app = FastAPI()

@app.get("/") 
async def greet(name):
    return f"hello {name} from the first app "

products = [
    Product(
        id=1,
        name="Laptop",
        description="Modern HP Laptop",
        price=2000.50,
        quantity=20
    ),
    Product(
        id=2,
        name="Phone",
        description="Modern Samsung Phone",
        price=200.50,
        quantity=10
    )
]

@app.get("/get_all_products")
async def get_all_products():
    return products