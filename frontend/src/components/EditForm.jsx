import { useState } from "react";
import { editProduct } from "../services/products";

export default function EditForm({ product, onClose, onUpdated }) {
  const [formdata, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProduct(product.id, {
        id: product.id,
        ...formdata,
      });
      alert("updated successfully");
      await onUpdated();
      onClose();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="fixed w-full md:w-[85%]  items-center justify-center flex">
      <form
        onSubmit={handleSubmit}
        className="bg-white/15 backdrop-blur-xl p-3 rounded-lg shadow-lg justify-between w-full flex-col lg:flex-row flex  gap-4"
      >
        <h2 className="text-xl font-extrabold text-slate-100 text-center">
          Edit Product
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formdata.name}
          onChange={handleChange}
          className="border p-2  placeholder:text-white text-slate-100 border-slate-100 rounded-lg "
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formdata.description}
          onChange={handleChange}
          className="border p-2  placeholder:text-white text-slate-100 border-slate-100 rounded-lg "
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formdata.price}
          onChange={handleChange}
          className="border p-2 placeholder:text-white text-slate-50 border-slate-100 rounded-lg "
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formdata.quantity}
          onChange={handleChange}
          className="border p-2  placeholder:text-white text-slate-100 border-slate-100 rounded-lg "
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className=" p-2  placeholder:text-white cursor-pointer bg-red-900 hover:bg-red-700 duration-700 text-slate-100  rounded-lg "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 cursor-pointer duration-700 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
