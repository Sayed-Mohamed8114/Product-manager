from fastapi import FastAPI,status
from models.products_model import Product
from database.database import session_local , engine
import models.schema.db_product_shema as DB

DB.Base.metadata.create_all(bind=engine)


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
    ),
    Product(
            id=3,
            name="Note book",
            description="200 page note book",
            price=20,
            quantity=15
        )
]

# some dummy data for the show in the project 
def init_db():
    db = session_local()
    # now we want it to only run one time in the beginning of the project not every time we make it 
    count = db.query(DB.Product).count
    if count ==0 :
        for product in products:
            # now we add this as a dump to make a dict to us also we need to make unpacking with **
            db.add(DB.Product(**product.model_dump()))
        db.commit() # to commit the changes in the db 

init_db()

@app.get("/get_all_products")
async def get_all_products():
    db = session_local()
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

