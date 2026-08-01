import { useEffect, useState } from "react";
import { getAllProducts } from "../services/products";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const fetchProdcuts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProdcuts();
  }, []);

  return (
    <table
      border="1"
      cellPadding="10"
      cellSpacing="10"
      className="bg-white/15 backdrop-blur-2xl h-auto w-[50%] text-slate-50 rounded-md"
    >
      <thead className="">
        <tr className="">
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="text-center">{product.id}</td>
            <td className="text-center">{product.name}</td>
            <td className="text-center">{product.description}</td>
            <td className="text-center">${product.price}</td>
            <td className="text-center">{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
