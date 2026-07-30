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

@app.post("/product",status_code=status.HTTP_201_CREATED,summary="add product")
async def add(product:Product):
    try:   
        products.append(product)
        return "created successfully"
    except:
        return "error happened"

@app.put("/product/{id}",status_code=status.HTTP_200_OK,summary="Update Product")
async def update_product(id: int, updated_product: Product):
    for index, product in enumerate(products):
        if product.id == id:
            updated_product.id = id
            products[index] = updated_product
            return updated_product
        
    return {
        "message": f"No product found with id {id}"
    }

@app.delete("/product/{id}",status_code=status.HTTP_200_OK , summary = "delete product")
async def delete_product(id:int):
    try:
        for i in range(len(products)):
            if products[i].id == id:
                products.remove(products[i])
        return "product deleted successfully"
    except:
        return { "message": f"No product found with id {id}"}

