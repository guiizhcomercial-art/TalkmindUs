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

export default stories;