import { useState } from "react";
import { addProduct } from "../services/products";

export default function AddProductInput({onProductAdded}) {
  const [formdata, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...formdata,
        id: Number(formdata.id),
        price: Number(formdata.price),
        quantity: Number(formdata.quantity),
      });
      await onProductAdded();
      alert("added successfully");
      setFormData({
        id:"",
        name: "",
        description: "",
        price: "",
        quantity: "",
      });
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  

  const input_style =
    "placeholder:text-slate-100 font-bold font-mono outline-0 border px-1 py-1.5 rounded-xl text-slate-200 text-center border-slate-300/40";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50/25 w-[50%] flex-col lg:flex-row lg:w-[75%]  py-5 px-3 flex items-center gap-5 justify-between rounded-lg "
    >
      <input
        type="text"
        name="id"
        className={input_style}
        placeholder="product id"
        value={formdata.id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        className={input_style}
        placeholder="product name"
        value={formdata.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        className={input_style}
        placeholder="product description"
        value={formdata.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        className={input_style}
        placeholder="product price"
        value={formdata.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        className={input_style}
        placeholder="quantity"
        value={formdata.quantity}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-slate-700 text-slate-50 px-15 py-1.5 rounded-md cursor-pointer z-10 transition-all font-extrabold
       duration-1000 hover:scale-105 hover:bg-slate-200 hover:text-black "
      >
        Add
      </button>
    </form>
  );
}
