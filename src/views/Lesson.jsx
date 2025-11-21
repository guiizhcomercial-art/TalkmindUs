import React, { useState } from "react";
import LivingBackground from "../components/LivingBackground.jsx";

export default function Lesson({ data, setLevel, setXp, setMindcash, changeView }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const current = data.questions[step];

  const checkAnswer = (option) => {
    setSelected(option);
    const correct = option === current.correct;
    setFeedback(correct ? "correct" : "wrong");

    setTimeout(() => {
      if (correct) {
        setXp((xp) => xp + 15);
        setMindcash((mc) => mc + 5);

        if (step + 1 < data.questions.length) {
          setStep(step + 1);
        } else {
          setLevel((lvl) => lvl + 1);
          alert("Aula concluída! Você ganhou XP e MindCash! ✨");
          changeView("home");
        }
      } else {
        alert("Resposta incorreta 😢 Tente novamente.");
      }

      setSelected(null);
      setFeedback(null);
    }, 900);
  };

  return (
    <div className="relative w-full min-h-screen px-6 pt-10 pb-24">
      <LivingBackground />

      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>

      <div className="bg-white/10 border border-white/20 p-5 rounded-xl mb-6 text-lg leading-relaxed">
        Traduza:
        <span className="block text-2xl font-semibold mt-2">{current.word}</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => checkAnswer(option)}
            className={`p-4 rounded-xl border transition-all text-left
                ${
                  selected === option
                    ? feedback === "correct"
                      ? "bg-green-500/30 border-green-500"
                      : "bg-red-500/30 border-red-500"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }
              `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}