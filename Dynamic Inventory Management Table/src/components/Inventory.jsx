import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem("inventoryItems")) || [];
    setItems(storedItems);
  }, []);

  const handleEditItem = (id) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const name = prompt("Edit item name:", item.name);
      const category = prompt("Edit item category:", item.category);
      let quantity = parseInt(prompt("Edit item quantity:", item.quantity), 10);

      if (name && category && !isNaN(quantity) && quantity > 0) {
        const updatedItems = items.map((i) =>
          i.id === id ? { ...i, name, category, quantity } : i
        );
        setItems(updatedItems);
        localStorage.setItem("inventoryItems", JSON.stringify(updatedItems));
      } else {
        alert("Quantity must be a positive number.");
      }
    }
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("inventoryItems", JSON.stringify(updatedItems));
  };

  const filteredItems = items.filter((item) =>
    filter ? item.category.toLowerCase() === filter.toLowerCase() : true
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.quantity - b.quantity;
    } else {
      return b.quantity - a.quantity;
    }
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="mb-4 flex items-center space-x-4">
        <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Item
        </Link>
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-4 py-2"
          value={filter}
        >
          <option value="">All Categories</option>
          {[...new Set(items.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
          }
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sort by Quantity ({sortOrder})
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? "bg-red-100" : "bg-white"}
            >
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditItem(item.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
