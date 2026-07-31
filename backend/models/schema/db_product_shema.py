from sqlalchemy.orm import Mapped , mapped_column , DeclarativeBase 

class Base(DeclarativeBase):
    pass 

class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True , index=True) 
    name :Mapped[str]
    description: Mapped[str]
    price :Mapped[float]
    quantity: Mapped[int]


