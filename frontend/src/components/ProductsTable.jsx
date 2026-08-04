import { deleteProduct } from "../services/products";

export default function ProductsTable({ products, onProductDeleted , onEdit}) {
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await onProductDeleted();
      alert("deleted successfully");
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  const table_head_style = `text-center text-slate-200 font-bold text-lg w-auto px-2 py-2 cursor-pointer hover:underline hover:text-slate-900 duration-700 transition `;
  const table_row_style = `text-center text-slate-100 font-extrabold text-sm px-3 py-1`;
  return (
    <table
      border="1"
      className="bg-white/15 backdrop-blur-2xl h-auto w-[70%] text-slate-50 rounded-lg  shadow-sm shadow-slate-800"
    >
      <thead>
        <tr>
          <th className={table_head_style}>ID</th>
          <th className={table_head_style}>Name</th>
          <th className={table_head_style}>Description</th>
          <th className={table_head_style}>Price</th>
          <th className={table_head_style}>Quantity</th>
          <th className={table_head_style}>edit product</th>
          <th className={table_head_style}>Delete product</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="m-2">
            <td className={table_row_style}>{product.id}</td>
            <td className={table_row_style}>{product.name}</td>
            <td className={table_row_style}>{product.description}</td>
            <td className={table_row_style}>${product.price}</td>
            <td className={table_row_style}>{product.quantity}</td>
            <td className="text-center px-2 py-1 ">
              <button
              onClick={()=>{onEdit(product)}}
               className="bg-green-600 rounded-lg p-1 cursor-pointer w-[70%] text-white hover:text-green-100 hover:bg-green-900 transition duration-700">
                Edit
              </button>
            </td>
            <td className="text-center px-2 py-1 ">
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-700 rounded-lg p-1 cursor-pointer w-[70%] text-white hover:text-green-100 hover:bg-red-900 transition duration-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
