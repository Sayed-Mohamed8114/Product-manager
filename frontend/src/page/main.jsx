import { useEffect, useState } from "react";
import AddProductInput from "../components/AddProductInput";
import ProductsTable from "../components/ProductsTable";
import { getAllProducts } from "../services/products";
import EditForm from "../components/EditForm";
import { AnimatePresence , motion} from "framer-motion";

export default function Main() {
  const [products, setProducts] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setShowEditForm(true);
    setSelectedProduct(product);
  };

  const fetchAllProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <>
      <AnimatePresence>
        {showEditForm && (
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
            className="fixed top-5 left-0 lg:left-5 items-center justify-center w-full z-50 "
          >
            <EditForm
              product={selectedProduct}
              onClose={() => setShowEditForm(false)}
              onUpdated={fetchAllProducts}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-screen items-center w-full overflow-x-hidden flex flex-col gap-10 justify-center bg-linear-to-br from-slate-600 via-slate-700 to-slate-800">
        <AddProductInput onProductAdded={fetchAllProducts} />
        <ProductsTable
          products={products}
          onProductDeleted={fetchAllProducts}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
}
