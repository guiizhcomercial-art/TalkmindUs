import React, { useState } from "react";
import LivingBackground from "../components/LivingBackground.jsx";
import AvatarDisplay from "../components/AvatarDisplay.jsx";
import items from "../data/avatarItems.js";

export default function Shop({ avatarConfig, setAvatarConfig, mindcash, setMindcash }) {
  const categories = ["hair", "outfit", "skin", "accessories"];
  const [category, setCategory] = useState("hair");

  const handlePurchase = (item) => {
    if (mindcash < item.price) {
      alert("Você não tem MindCash suficiente 😢");
      return;
    }

    setMindcash(mindcash - item.price);

    if (category === "accessories") {
      setAvatarConfig({ ...avatarConfig, accessories: [...avatarConfig.accessories, item.value] });
    } else {
      setAvatarConfig({ ...avatarConfig, [category]: item.value });
    }
  };

  return (
    <div className="relative w-full min-h-screen px-6 pt-10 pb-24">
      <LivingBackground />

      <h1 className="text-3xl font-bold mb-2">Loja</h1>
      <p className="text-gray-300 mb-6">Personalize seu avatar com MindCash</p>

      <div className="flex justify-center mb-8">
        <AvatarDisplay config={avatarConfig} size={180} />
      </div>

      <div className="flex gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl border transition-all
              ${category === cat ? "bg-white/20 border-white" : "bg-white/10 border-white/20"}
            `}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items[category].map((item) => (
          <button
            key={item.value}
            onClick={() => handlePurchase(item)}
            className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all text-left"
          >
            <p className="font-semibold">{item.label}</p>
            <p className="text-sm text-gray-300">Preço: {item.price}💰</p>
          </button>
        ))}
      </div>
    </div>
  );
}