import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/productSend");

      setProducts(res.data);
    } catch (error) {
      toast.error("Products not loaded");
    }
  };

  const send = async () => {
    if (!title || !category || !price || !stock) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (update) {
        const res = await axios.post("http://localhost:4000/editProduct", {
          title,
          category,
          price,
          stock,
          _id: update._id,
        });

        toast.success(res.data.msg || "Product Updated");
      } else {
        const res = await axios.post("http://localhost:4000/addProduct", {
          title,
          category,
          price,
          stock,
        });

        toast.success(res.data.msg || "Product Added");
      }

      setTitle("");
      setCategory("");
      setPrice("");
      setStock("");
      setUpdate(null);
      setIsOpen(false);

      getProducts();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const editProduct = (item) => {
    setTitle(item.title);
    setCategory(item.category);
    setPrice(item.price);
    setStock(item.stock);

    setUpdate(item);
    setIsOpen(true);
  };

  const deleteProduct = async (item) => {
    try {
      const res = await axios.post("http://localhost:4000/deleteProduct", {
        _id: item._id,
      });

      toast.success(res.data.msg || res.data);

      getProducts();
    } catch (error) {
      toast.error("Product not deleted");
    }
  };

  const openForm = () => {
    setTitle("");
    setCategory("");
    setPrice("");
    setStock("");
    setUpdate(null);
    setIsOpen(true);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const totalStock = products.reduce(
    (total, item) => total + Number(item.stock),
    0
  );

  const totalValue = products.reduce(
    (total, item) => total + Number(item.price) * Number(item.stock),
    0
  );

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Products Management</h1>

              <p className="text-slate-400 text-sm">Manage your products</p>
            </div>

            <button
              onClick={openForm}
              className="bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-500"
            >
              + Add Product
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-6">
            <div className="bg-slate-900 p-5 rounded-xl">
              <p className="text-slate-400">Total Products</p>

              <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl">
              <p className="text-slate-400">Total Stock</p>

              <h2 className="text-3xl font-bold text-emerald-400 mt-2">
                {totalStock}
              </h2>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl">
              <p className="text-slate-400">Total Value</p>

              <h2 className="text-3xl font-bold text-green-400 mt-2">
                ${totalValue.toFixed(2)}
              </h2>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-t border-slate-800">
                    <td className="p-4">{item.title}</td>

                    <td className="p-4">{item.category}</td>

                    <td className="p-4">${item.price}</td>

                    <td className="p-4">{item.stock}</td>

                    <td className="p-4 flex gap-3">
                      <button
                        onClick={() => editProduct(item)}
                        className="bg-blue-600 px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(item)}
                        className="bg-red-600 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-5 text-center text-slate-400">
                      No Products Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4">
          <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-5">
              {update ? "Edit Product" : "Add Product"}
            </h2>

            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mb-3 bg-slate-800 rounded-lg outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 mb-3 bg-slate-800 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Footwear">Footwear</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 mb-3 bg-slate-800 rounded-lg outline-none"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-3 mb-5 bg-slate-800 rounded-lg outline-none"
            />

            <div className="flex gap-3">
              <button
                onClick={send}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 p-3 rounded-lg"
              >
                {update ? "Update Product" : "Save Product"}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-slate-700 p-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;