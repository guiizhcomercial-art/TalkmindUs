import React from "react";
import LivingBackground from "../components/LivingBackground.jsx";
import AvatarDisplay from "../components/AvatarDisplay.jsx";
import { BookOpen, Play, RefreshCcw, FolderKanban } from "lucide-react";

export default function Home({ targetLang, level, setLessonData, changeView }) {
  const lessons = [
    {
      id: 1,
      title: "Vocabulário Básico",
      desc: "Aprenda palavras essenciais.",
      questions: [
        { word: "house", correct: "casa", options: ["casa", "carro", "porta", "livro"] },
        { word: "sun", correct: "sol", options: ["noite", "sol", "vento", "chuva"] },
        { word: "dog", correct: "cachorro", options: ["gato", "pássaro", "cachorro", "peixe"] }
      ]
    },
    {
      id: 2,
      title: "Frases Iniciais",
      desc: "Comece a formar frases simples.",
      questions: [
        { word: "I am happy", correct: "eu estou feliz", options: ["eu estou feliz", "eu estou comendo", "eu estou indo", "eu sinto frio"] },
        { word: "Good morning", correct: "bom dia", options: ["boa noite", "bom dia", "oi", "tchau"] }
      ]
    }
  ];

  const startLesson = (lesson) => {
    setLessonData(lesson);
    changeView("lesson");
  };

  return (
    <div className="relative w-full min-h-screen px-6 pt-10 pb-24">
      <LivingBackground />

      <h1 className="text-3xl font-bold mb-2">Aprendendo {targetLang?.toUpperCase()}</h1>
      <p className="text-gray-300 mb-6">Level {level} • Continue evoluindo!</p>

      <div className="flex justify-center mb-10">
        <AvatarDisplay config={{ gender: "male", skin: "#f5d0b0", hair: "short", outfit: "#6366f1", accessories: [] }} size={180} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Começar Aula</h2>
      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => startLesson(lesson)}
            className="bg-white/10 border border-white/20 p-5 rounded-xl hover:bg-white/20 transition-all flex items-center gap-4"
          >
            <Play size={26} />
            <div className="text-left">
              <h3 className="font-bold text-lg">{lesson.title}</h3>
              <p className="text-gray-300 text-sm">{lesson.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Outras Ações</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => changeView("stories")}
          className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all flex flex-col items-center"
        >
          <BookOpen size={26} />
          <span className="mt-2 text-sm">Histórias</span>
        </button>

        <button
          onClick={() => alert("Função de revisão futura!")}
          className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all flex flex-col items-center"
        >
          <RefreshCcw size={26} />
          <span className="mt-2 text-sm">Revisão</span>
        </button>

        <button
          onClick={() => alert("Vocabulário em breve!")}
          className="bg-white/10 border border-white/20 p-4 rounded-xl hover:bg-white/20 transition-all flex flex-col items-center"
        >
          <FolderKanban size={26} />
          <span className="mt-2 text-sm">Vocabulário</span>
        </button>
      </div>
    </div>
  );
}