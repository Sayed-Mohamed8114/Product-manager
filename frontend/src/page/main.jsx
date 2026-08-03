import { useEffect, useState } from "react";
import AddProductInput from "../components/AddProductInput";
import ProductsTable from "../components/ProductsTable";
import { getAllProducts } from "../services/products";

export default function Main() {
  const [products,setProducts] = useState([]); 
  const fetchAllProducts = async () =>{
    const data = await getAllProducts();
    setProducts(data);
  }
  useEffect(()=>{
    fetchAllProducts();
  },[])
  return (
    <div className="h-screen items-center w-full overflow-x-hidden flex flex-col gap-10 justify-center bg-linear-to-br from-slate-600 via-slate-700 to-slate-800">
      <AddProductInput onProductAdded={fetchAllProducts}/>
      <ProductsTable products={products} onProductDeleted={fetchAllProducts}/>
    </div>
  );
}
