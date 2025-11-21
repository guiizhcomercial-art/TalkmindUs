import React from "react";
import LivingBackground from "../components/LivingBackground.jsx";

export default function Stories({ setStoryData, changeView }) {
  const stories = [
    {
      id: 1,
      title: "O Encontro Misterioso",
      desc: "Uma história simples para iniciantes praticarem leitura.",
      content: [
        {
          text: "Maria estava caminhando para a escola quando encontrou um objeto estranho no chão.",
          question: "O que Maria encontrou?",
          options: ["Um livro", "Um objeto estranho", "Um cachorro", "Uma chave"],
          correct: "Um objeto estranho",
        },
        {
          text: "Ela pegou o objeto e percebeu que havia uma luz azul brilhante saindo dele.",
          question: "Qual era a cor da luz?",
          options: ["Vermelha", "Amarela", "Azul", "Verde"],
          correct: "Azul",
        },
      ],
    },
    {
      id: 2,
      title: "O Cachorro Viajante",
      desc: "Uma história divertida sobre um cachorro curioso.",
      content: [
        {
          text: "Rex era um cachorro muito curioso que adorava explorar novos lugares.",
          question: "Como era Rex?",
          options: ["Preguiçoso", "Bravo", "Curioso", "Triste"],
          correct: "Curioso",
        },
        {
          text: "Um dia, ele encontrou uma porta secreta no quintal.",
          question: "O que ele encontrou?",
          options: ["Um osso", "Uma porta secreta", "Um gato", "Uma caixa"],
          correct: "Uma porta secreta",
        },
      ],
    },
  ];

  const openStory = (story) => {
    setStoryData(story);
    changeView("story");
  };

  return (
    <div className="relative w-full min-h-screen px-6 pt-10 pb-24">
      <LivingBackground />

      <h1 className="text-3xl font-bold mb-6">Histórias</h1>
      <p className="text-gray-300 mb-8">Melhore sua leitura com histórias simples e interativas.</p>

      <div className="grid grid-cols-1 gap-5">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => openStory(story)}
            className="bg-white/10 border border-white/20 p-5 rounded-xl hover:bg-white/20 transition-all text-left"
          >
            <h3 className="text-xl font-semibold">{story.title}</h3>
            <p className="text-gray-300 text-sm mt-1">{story.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}