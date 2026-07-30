from fastapi import FastAPI,status
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

@app.get("/Product/{id}")
async def get_by_id(id:int):
    for product in products:
        if product.id == id:
            return product 
        else:
            return "product not found"

@app.post("/product",status_code=status.HTTP_201_CREATED,summary="product creation",tags=["products"])
async def create_item(product:Product):
    try:   
        products.append(product)
        return "created successfully"
    except:
        return "error happened"