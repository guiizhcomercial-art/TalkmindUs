import React from "react";
import LivingBackground from "../components/LivingBackground.jsx";

export default function LangSelect({ setNativeLang, setTargetLang, changeView }) {
  const languages = [
    { id: "en", label: "Inglês" },
    { id: "es", label: "Espanhol" },
    { id: "fr", label: "Francês" },
    { id: "de", label: "Alemão" },
  ];

  const handleSelect = (native, target) => {
    setNativeLang(native);
    setTargetLang(target);
    changeView("home");
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6">
      <LivingBackground />

      <h1 className="text-4xl font-bold mb-6 fade-in">Bem-vindo ao TalkMind</h1>
      <p className="text-gray-300 mb-10 text-lg fade-in">
        Escolha seu idioma nativo e o idioma que deseja aprender.
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-md w-full fade-in">
        {languages.map((n) => (
          languages
            .filter((t) => t.id !== n.id)
            .map((t) => (
              <button
                key={n.id + t.id}
                className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all"
                onClick={() => handleSelect(n.id, t.id)}
              >
                <span className="block text-md font-semibold">{n.label} → {t.label}</span>
              </button>
            ))
        ))}
      </div>
    </div>
  );
}