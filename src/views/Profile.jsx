import React from "react";
import LivingBackground from "../components/LivingBackground.jsx";
import AvatarDisplay from "../components/AvatarDisplay.jsx";

export default function Profile({ avatarConfig, nativeLang, level, xp, mindcash }) {
  return (
    <div className="relative w-full min-h-screen px-6 pt-10 pb-24">
      <LivingBackground />

      <h1 className="text-3xl font-bold mb-2">Seu Perfil</h1>
      <p className="text-gray-300 mb-6">Resumo do seu progresso</p>

      <div className="flex justify-center mb-8">
        <AvatarDisplay config={avatarConfig} size={200} />
      </div>

      <div className="bg-white/10 border border-white/20 p-5 rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-1">Idioma Nativo</h2>
        <p className="text-gray-300">{nativeLang?.toUpperCase()}</p>
      </div>

      <div className="bg-white/10 border border-white/20 p-5 rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-1">Nível</h2>
        <p className="text-gray-300">{level}</p>
      </div>

      <div className="bg-white/10 border border-white/20 p-5 rounded-xl mb-5">
        <h2 className="text-xl font-semibold mb-1">XP Total</h2>
        <p className="text-gray-300">{xp}</p>
      </div>

      <div className="bg-white/10 border border-white/20 p-5 rounded-xl">
        <h2 className="text-xl font-semibold mb-1">MindCash</h2>
        <p className="text-gray-300">{mindcash} 💰</p>
      </div>
    </div>
  );
}