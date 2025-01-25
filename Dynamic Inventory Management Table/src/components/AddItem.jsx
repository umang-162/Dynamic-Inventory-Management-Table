import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantityValue = parseInt(quantity, 10);
    if (!name || !category || isNaN(quantityValue) || quantityValue <= 0) {
      alert("All fields are required, and quantity must be a positive number.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      category,
      quantity: quantityValue,
    };

    const storedItems =
      JSON.parse(localStorage.getItem("inventoryItems")) || [];
    storedItems.push(newItem);
    localStorage.setItem("inventoryItems", JSON.stringify(storedItems));

    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
