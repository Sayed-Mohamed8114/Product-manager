from fastapi import FastAPI,status,HTTPException,Depends
from models.products_model import Product
from database.database import session_local , engine
import models.schema.db_product_shema as DB
from sqlalchemy.orm import Session
from sqlalchemy import select

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

# make the session one time and also try it with yield to pause until the db is return what we need then we will close it with finally 
def get_db():
    db =session_local()
    try:
        yield db 
    finally:    
        db.close()

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
async def get_all_products(db:Session = Depends(get_db)):
    db_Products = db.query(DB.Product).all()
    return db_Products

@app.get("/Product/{id}")
async def get_by_id(id:int,db:Session = Depends(get_db)):
    db_product = db.query(DB.Product).filter(DB.Product.id==id).first()
    try :
        if db_product:
            return db_product 
    except:
        return "No product with this id"

@app.post("/product",status_code=status.HTTP_201_CREATED,summary="add product")
async def add(product:Product,db:Session = Depends(get_db)):
    try:   
        db.add(DB.Product(**product.model_dump()))
        db.commit()
        return "created successfully"
    except:
        raise HTTPException(
            status_code=404 , detail = f"Cannot add in this moment"
        )

@app.put("/product/{id}",status_code=status.HTTP_200_OK,summary="Update Product")
async def update_product(id: int, updated_product: Product, db:Session = Depends(get_db)):
    db_product = db.query(DB.Product).filter(DB.Product.id==id).first()
    if db_product:
        db_product.name = updated_product.name
        db_product.description = updated_product.description
        db_product.price = updated_product.price 
        db_product.quantity = updated_product.quantity
        db.commit()
        return "updated successfully"
    else:    
        return {
            "message": f"No product found with id {id}"
        }

@app.delete("/product/{id}",status_code=status.HTTP_200_OK , summary = "delete product")
async def delete_product(id:int,db:Session = Depends(get_db)):
    db_product = db.query(DB.Product).filter(DB.Product.id==id).first()
    if db_product is None:
        raise HTTPException(
            status_code=404,
            detail=f"No product found with id {id}"
        )
    
    db.delete(db_product)
    db.commit()
    return {
        "message": "Product deleted successfully"
    }

