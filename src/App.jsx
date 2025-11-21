import React, { useState, useEffect, useRef } from 'react';
import { 
    Check, X, Heart, Zap, Trophy, Volume2, Home, User, Star, Lock, 
    BookOpen, Play, Pause, Globe, Shirt, Key, Plane, Car, Coffee, 
    Sun, Briefcase, Stethoscope, BedDouble, ShoppingBag, AlertCircle, 
    Turtle, Languages, MessageCircle, Glasses, ChevronDown 
} from 'lucide-react';

// --- ESTILOS GLOBAIS & ANIMAÇÕES (CSS-in-JS) ---
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        
        body {
            font-family: 'Nunito', sans-serif;
        }

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes pulse-soft { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes fly { 0% { transform: translate(-100px, 50px) rotate(5deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(100vw, -50px) rotate(5deg); opacity: 0; } }
        @keyframes drive { 0% { transform: translateX(-100%); } 100% { transform: translateX(100vw); } }
        @keyframes slideDown { 0% { transform: translate(-50%, -100%); opacity: 0; } 100% { transform: translate(-50%, 20px); opacity: 1; } }
        @keyframes slideUp { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes floatingItem { 0% { transform: translateY(100vh) rotate(0deg); opacity: 0; } 20% { opacity: 0.5; } 80% { opacity: 0.5; } 100% { transform: translateY(-100px) rotate(360deg); opacity: 0; } }
        @keyframes slideInRight { 0% { transform: translateX(20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft { 0% { transform: translateX(-20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 3s infinite; }
        .animate-fly { animation: fly 15s linear infinite; }
        .animate-drive { animation: drive 10s linear infinite; }
        .animate-toast { animation: slideDown 0.5s ease-out forwards; }
        .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        .animate-floating-item { animation: floatingItem 10s linear infinite; }
        .msg-left { animation: slideInLeft 0.4s ease-out forwards; }
        .msg-right { animation: slideInRight 0.4s ease-out forwards; }
        
        .glass-panel { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        
        .btn-3d { 
            transition: all 0.1s; 
            border-bottom-width: 4px; 
            border-bottom-style: solid; 
        }
        .btn-3d:active { 
            transform: translateY(2px); 
            border-bottom-width: 0px; 
            margin-bottom: 4px; 
        }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
);

// --- DADOS CONSTANTES ---
const LANGUAGES = [
    { id: 'pt', name: 'Português', flag: '🇧🇷' },
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const TOPIC_ORDER = [
    'basics', 'basics', 'food', 'food', 'colors', 
    'animals', 'family', 'clothes', 'travel', 'house',
    'body', 'weather', 'school', 'sports', 'nature',
    'time', 'feelings', 'basics', 'food', 'travel',
    'house', 'clothes', 'animals', 'colors', 'body',
    'weather', 'school', 'sports', 'nature', 'time'
];

const VOCAB_DB = {
  basics: [ 
      { en: "Hello", pt: "Olá", de: "Hallo", es: "Hola", fr: "Bonjour" }, 
      { en: "Goodbye", pt: "Adeus", de: "Tschüss", es: "Adiós", fr: "Au revoir" }, 
      { en: "Please", pt: "Por favor", de: "Bitte", es: "Por favor", fr: "S'il vous plaît" },
      { en: "Thanks", pt: "Obrigado", de: "Danke", es: "Gracias", fr: "Merci" },
      { en: "Yes", pt: "Sim", de: "Ja", es: "Sí", fr: "Oui" },
      { en: "No", pt: "Não", de: "Nein", es: "No", fr: "Non" }
  ],
  food: [ 
      { en: "Apple", pt: "Maçã", de: "Apfel", es: "Manzana", fr: "Pomme" }, 
      { en: "Bread", pt: "Pão", de: "Brot", es: "Pan", fr: "Pain" },
      { en: "Water", pt: "Água", de: "Wasser", es: "Agua", fr: "Eau" },
      { en: "Milk", pt: "Leite", de: "Milch", es: "Leche", fr: "Lait" }
  ],
  colors: [ { en: "Red", pt: "Vermelho", de: "Rot" }, { en: "Blue", pt: "Azul", de: "Blau" } ],
  animals: [ { en: "Dog", pt: "Cachorro", de: "Hund" }, { en: "Cat", pt: "Gato", de: "Katze" } ],
  family: [ { en: "Mother", pt: "Mãe", de: "Mutter" }, { en: "Father", pt: "Pai", de: "Vater" } ],
  clothes: [ { en: "Shirt", pt: "Camisa", de: "Hemd" }, { en: "Shoes", pt: "Sapatos", de: "Schuhe" } ],
  travel: [ { en: "Ticket", pt: "Passagem", de: "Ticket" }, { en: "Hotel", pt: "Hotel", de: "Hotel" } ],
  house: [ { en: "Bed", pt: "Cama", de: "Bett" }, { en: "Kitchen", pt: "Cozinha", de: "Küche" } ],
  body: [ { en: "Head", pt: "Cabeça", de: "Kopf" }, { en: "Hand", pt: "Mão", de: "Hand" } ],
  weather: [ { en: "Sun", pt: "Sol", de: "Sonne" }, { en: "Rain", pt: "Chuva", de: "Regen" } ],
};

// --- HISTÓRIAS COMPLETAS (12 HISTÓRIAS) ---
const STORIES_DB = [
    {
        id: 1, title: "The Coffee Shop", desc: "Um pedido simples.", level: "Básico", color: "from-orange-500 to-amber-700", theme: 'cafe',
        dialogue: [
            { speaker: "Barista", text: "Hello! Welcome to Star Beans.", translation: "Olá! Bem-vindo ao Star Beans.", audio: "Hello! Welcome to Star Beans.", gender: "male" },
            { speaker: "You", text: "Hi. One coffee please.", translation: "Oi. Um café por favor.", audio: "Hi. One coffee please.", gender: "female" },
            { speaker: "Barista", text: "Hot or iced?", translation: "Quente ou gelado?", audio: "Hot or iced?", gender: "male" },
            { speaker: "You", text: "Hot, please.", translation: "Quente, por favor.", audio: "Hot, please.", gender: "female" },
            { speaker: "Barista", text: "Milk or sugar?", translation: "Leite ou açúcar?", audio: "Milk or sugar?", gender: "male" },
            { speaker: "You", text: "Just milk.", translation: "Apenas leite.", audio: "Just milk.", gender: "female" },
            { speaker: "Barista", text: "Here you go.", translation: "Aqui está.", audio: "Here you go.", gender: "male" },
            { speaker: "You", text: "Thanks! How much?", translation: "Obrigado! Quanto é?", audio: "Thanks! How much?", gender: "female" },
            { speaker: "Barista", text: "Three dollars.", translation: "Três dólares.", audio: "Three dollars.", gender: "male" },
            { speaker: "You", text: "Here it is.", translation: "Aqui está.", audio: "Here it is.", gender: "female" },
            { speaker: "Barista", text: "Have a nice day!", translation: "Tenha um bom dia!", audio: "Have a nice day!", gender: "male" },
            { speaker: "You", text: "You too.", translation: "Você também.", audio: "You too.", gender: "female" }
        ]
    },
    {
        id: 2, title: "At the Airport", desc: "Check-in rápido.", level: "Interm.", color: "from-blue-500 to-indigo-700", theme: 'plane',
        dialogue: [
            { speaker: "Agent", text: "Good morning. Passport please?", translation: "Bom dia. Passaporte por favor?", audio: "Good morning. Passport please?", gender: "female" },
            { speaker: "You", text: "Here it is.", translation: "Aqui está.", audio: "Here it is.", gender: "male" },
            { speaker: "Agent", text: "Where are you flying?", translation: "Para onde você vai voar?", audio: "Where are you flying?", gender: "female" },
            { speaker: "You", text: "I am going to London.", translation: "Estou indo para Londres.", audio: "I am going to London.", gender: "male" },
            { speaker: "Agent", text: "Checking any bags?", translation: "Vai despachar malas?", audio: "Checking any bags?", gender: "female" },
            { speaker: "You", text: "Yes, just one.", translation: "Sim, apenas uma.", audio: "Yes, just one.", gender: "male" },
            { speaker: "Agent", text: "Place it on the scale.", translation: "Coloque na balança.", audio: "Place it on the scale.", gender: "female" },
            { speaker: "You", text: "Is it too heavy?", translation: "Está muito pesada?", audio: "Is it too heavy?", gender: "male" },
            { speaker: "Agent", text: "No, it is perfect.", translation: "Não, está perfeita.", audio: "No, it is perfect.", gender: "female" },
            { speaker: "You", text: "Great.", translation: "Ótimo.", audio: "Great.", gender: "male" },
            { speaker: "Agent", text: "Here is your ticket.", translation: "Aqui está sua passagem.", audio: "Here is your ticket.", gender: "female" },
            { speaker: "You", text: "Thank you.", translation: "Obrigado.", audio: "Thank you.", gender: "male" }
        ]
    },
    { id: 3, title: "Taxi Ride", desc: "No táxi.", level: "Básico", color: "from-yellow-500 to-orange-600", theme: 'taxi', dialogue: [{speaker:"Driver", text:"Where to?", translation:"Para onde?", audio:"Where to?", gender:"male"}, {speaker:"You", text:"Hotel.", translation:"Hotel.", audio:"Hotel.", gender:"female"}] },
    { id: 4, title: "New Friend", desc: "Escola.", level: "Básico", color: "from-indigo-500 to-purple-600", theme: 'school', dialogue: [{speaker:"Hi", text:"Hi!", translation:"Oi!", audio:"Hi!", gender:"female"}] },
    { id: 5, title: "Shopping", desc: "Roupas.", level: "Básico", color: "from-pink-500 to-rose-600", theme: 'shop', dialogue: [{speaker:"Clerk", text:"Help?", translation:"Ajuda?", audio:"Help?", gender:"male"}] },
    { id: 6, title: "Doctor", desc: "Consulta.", level: "Avançado", color: "from-teal-500 to-green-600", theme: 'doctor', dialogue: [{speaker:"Doc", text:"Hurt?", translation:"Dói?", audio:"Hurt?", gender:"male"}] },
    { id: 7, title: "Grand Hotel", desc: "Reserva.", level: "Interm.", color: "from-violet-500 to-purple-700", theme: 'hotel', dialogue: [{speaker:"Host", text:"Name?", translation:"Nome?", audio:"Name?", gender:"female"}] },
    { id: 8, title: "Job Interview", desc: "Trabalho.", level: "Avançado", color: "from-slate-500 to-gray-700", theme: 'work', dialogue: [{speaker:"Boss", text:"Skills?", translation:"Habilidades?", audio:"Skills?", gender:"male"}] },
    { id: 9, title: "Sunny Day", desc: "Clima.", level: "Básico", color: "from-sky-400 to-cyan-600", theme: 'sun', dialogue: [{speaker:"You", text:"Hot!", translation:"Quente!", audio:"Hot!", gender:"female"}] },
    { id: 10, title: "Dinner", desc: "Jantar.", level: "Interm.", color: "from-red-500 to-rose-700", theme: 'cafe', dialogue: [{speaker:"Waiter", text:"Table?", translation:"Mesa?", audio:"Table?", gender:"male"}] },
    { id: 11, title: "Weekend", desc: "Planos.", level: "Básico", color: "from-lime-500 to-green-500", theme: 'sun', dialogue: [{speaker:"Friend", text:"Fun?", translation:"Diversão?", audio:"Fun?", gender:"female"}] },
    { id: 12, title: "Lost", desc: "Direções.", level: "Interm.", color: "from-emerald-500 to-teal-700", theme: 'car', dialogue: [{speaker:"You", text:"Map?", translation:"Mapa?", audio:"Map?", gender:"male"}] }
];

const AVATAR_ITEMS = {
    skin: [ { id: 'skin_1', color: '#fff0e6', cost: 0 }, { id: 'skin_2', color: '#f5d0b0', cost: 0 }, { id: 'skin_3', color: '#d6a987', cost: 0 }, { id: 'skin_4', color: '#a87b5b', cost: 0 }, { id: 'skin_5', color: '#754e36', cost: 0 }, { id: 'skin_6', color: '#4a3121', cost: 0 }, { id: 'skin_7', color: '#332218', cost: 0 } ],
    hair: [ { id: 'hair_0', name: 'Careca', style: 'none', cost: 0 }, { id: 'hair_1', name: 'Curto', style: 'short', cost: 0 }, { id: 'hair_2', name: 'Longo', style: 'long', cost: 150 }, { id: 'hair_3', name: 'Punk', style: 'punk', cost: 300 }, { id: 'hair_4', name: 'Afro', style: 'afro', cost: 200 }, { id: 'hair_5', name: 'Coque', style: 'bun', cost: 250 }, { id: 'hair_6', name: 'Tranças', style: 'braids', cost: 350 } ],
    outfit: [ { id: 'outfit_1', name: 'Camiseta', color: '#6366f1', cost: 0 }, { id: 'outfit_2', name: 'Terno', color: '#1e293b', cost: 400 }, { id: 'outfit_3', name: 'Vestido', color: '#db2777', cost: 400 }, { id: 'outfit_4', name: 'Ouro', color: '#fbbf24', cost: 1000 }, { id: 'outfit_5', name: 'Moletom', color: '#64748b', cost: 250 }, { id: 'outfit_6', name: 'Jaqueta', color: '#b91c1c', cost: 350 }, { id: 'outfit_7', name: 'Regata', color: '#f97316', cost: 150 }, { id: 'outfit_8', name: 'Pijama', color: '#94a3b8', cost: 200 }, { id: 'outfit_9', name: 'Uniforme', color: '#15803d', cost: 300 }, { id: 'outfit_10', name: 'Galáxia', color: '#4c1d95', cost: 800 } ],
    accessory: [ { id: 'acc_1', name: 'Óculos', style: 'glasses', cost: 200 }, { id: 'acc_2', name: 'Boné', style: 'cap', cost: 250 }, { id: 'acc_3', name: 'Brincos', style: 'earrings', cost: 150 }, { id: 'acc_4', name: 'Colar', style: 'necklace', cost: 300 }, { id: 'acc_5', name: 'Bandana', style: 'headband', cost: 200 }, { id: 'acc_6', name: 'Máscara', style: 'mask', cost: 400 } ]
};

// --- HELPERS ---
const getSentenceTemplate = (wordObj, targetLang) => {
    const templates = [
        { en: `I like ${wordObj.en}`, pt: `Eu gosto de ${wordObj.pt}`, de: `Ich mag ${wordObj.de || wordObj.en}`, extras: ['not', 'is', 'are'] },
        { en: `I have a ${wordObj.en}`, pt: `Eu tenho um ${wordObj.pt}`, de: `Ich habe ${wordObj.de || wordObj.en}`, extras: ['the', 'my', 'is'] },
        { en: `Where is the ${wordObj.en}?`, pt: `Onde está o ${wordObj.pt}?`, de: `Wo ist ${wordObj.de || wordObj.en}?`, extras: ['is', 'my', 'a'] }
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

const generateLessonContent = (levelId, topic, targetLang) => {
  const questions = [];
  const numQuestions = 12; 
  let wordBank = VOCAB_DB[topic] || VOCAB_DB.basics;

  for (let i = 0; i < numQuestions; i++) {
    const rand = Math.random();
    const wordObj = wordBank[Math.floor(Math.random() * wordBank.length)];
    const targetWord = targetLang === 'de' ? (wordObj.de || wordObj.en) : targetLang === 'es' ? (wordObj.es || wordObj.en) : targetLang === 'fr' ? (wordObj.fr || wordObj.en) : wordObj.en;

    if (rand > 0.6) {
        const distractors = wordBank.filter(w => w.en !== wordObj.en).sort(() => 0.5 - Math.random()).slice(0, 3).map(w => { const txt = targetLang === 'de' ? (w.de || w.en) : targetLang === 'es' ? (w.es || w.en) : w.en; return { text: txt, correct: false }; });
        const options = [...distractors, { text: targetWord, correct: true }].sort(() => 0.5 - Math.random());
        questions.push({ id: i, type: 'multiple_choice', prompt: `Como se diz "${wordObj.pt}"?`, audio: targetWord, options: options });
    } else {
        const template = getSentenceTemplate(wordObj, targetLang);
        const targetSentence = targetLang === 'de' ? template.de : template.en;
        const correctWords = targetSentence.replace(/[?.,]/g, '').split(" ");
        const shuffled = [...correctWords, ...template.extras].sort(() => 0.5 - Math.random());
        questions.push({ id: i, type: 'sentence_builder', prompt: `Traduza: "${template.pt}"`, target: targetSentence, targetClean: targetSentence.replace(/[?.,]/g, ''), words: shuffled, correctOrder: correctWords });
    }
  }
  return questions;
};

// --- COMPONENTES VISUAIS ---

const AvatarDisplay = ({ config, size = "large" }) => {
    const scale = size === "large" ? 1 : 0.55;
    const w = 140 * scale;
    const h = 140 * scale;
    const { skin, outfit, gender, hair } = config;
    const accessories = config.accessories || [];
    const isFemale = gender === 'female';
    const displayHair = (isFemale && hair === 'short') ? 'long' : hair;

    return (
        <div style={{ width: w, height: h }} className="relative flex justify-center items-center bg-gradient-to-t from-indigo-300 to-purple-200 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 z-0">
            {/* Cabelo Trás */}
            {displayHair === 'long' && <div className="absolute top-[35%] w-[85%] h-[60%] bg-slate-900 rounded-b-[40px] z-0"></div>}
            {displayHair === 'bun' && <div className="absolute top-[5%] w-[35%] h-[25%] bg-slate-900 rounded-full z-0"></div>}
            {displayHair === 'braids' && (
                <div className="absolute top-[30%] w-[95%] h-[60%] flex justify-around px-2 z-0">
                    <div className="w-[25%] h-full bg-slate-900 rounded-full"></div>
                    <div className="w-[25%] h-full bg-slate-900 rounded-full"></div>
                    <div className="w-[25%] h-full bg-slate-900 rounded-full"></div>
                </div>
            )}
            
            {/* Corpo */}
            <div className="absolute bottom-[-10%] w-[80%] h-[45%] rounded-t-[40px] z-10 flex justify-center overflow-hidden" style={{backgroundColor: outfit}}>
                {config.outfitDetail === 'tie' && <div className="w-4 h-full bg-red-500 mt-1"></div>}
                {config.outfitDetail === 'stripe' && <div className="w-full h-4 bg-white/20 mt-8"></div>}
                {config.outfitDetail === 'stars' && <div className="absolute inset-0 text-white/50 text-[8px] flex flex-wrap p-2">✨ ✶ ✨</div>}
                <div className="w-[2px] h-full bg-black/10 absolute top-0"></div>
            </div>
            
            {/* Pescoço */}
            <div className="absolute bottom-[28%] w-[22%] h-[15%] rounded-full z-10" style={{backgroundColor: skin, filter: 'brightness(0.9)'}}></div>

            {/* Cabeça */}
            <div className="absolute top-[18%] w-[60%] h-[55%] rounded-[35%] z-20 shadow-sm flex flex-col items-center" style={{backgroundColor: skin}}>
                <div className="absolute top-[45%] -left-[8%] w-[15%] h-[20%] rounded-full" style={{backgroundColor: skin}}></div>
                <div className="absolute top-[45%] -right-[8%] w-[15%] h-[20%] rounded-full" style={{backgroundColor: skin}}></div>
                {accessories.includes('earrings') && (<><div className="absolute top-[55%] -left-[12%] w-[6px] h-[6px] rounded-full bg-yellow-400 border border-yellow-600"></div><div className="absolute top-[55%] -right-[12%] w-[6px] h-[6px] rounded-full bg-yellow-400 border border-yellow-600"></div></>)}
                {accessories.includes('necklace') && <div className="absolute -bottom-[10%] w-[60%] h-[10%] border-b-4 border-yellow-400 rounded-full"></div>}
                
                <div className="relative w-full h-full flex flex-col items-center justify-center pt-2">
                     {/* Olhos Fofos */}
                     <div className="flex gap-3 mb-1">
                         <div className="w-[8px] h-[8px] bg-slate-900 rounded-full flex items-center justify-center relative"><div className="w-[3px] h-[3px] bg-white rounded-full absolute top-1 right-1"></div></div>
                         <div className="w-[8px] h-[8px] bg-slate-900 rounded-full flex items-center justify-center relative"><div className="w-[3px] h-[3px] bg-white rounded-full absolute top-1 right-1"></div></div>
                     </div>
                     {/* Cílios */}
                     {isFemale && (<div className="absolute top-[38%] w-[46%] flex justify-between px-1"><div className="w-[6px] h-[1px] bg-slate-900 -rotate-45 -ml-2"></div><div className="w-[6px] h-[1px] bg-slate-900 rotate-45 -mr-2"></div></div>)}
                     
                     {/* Sobrancelhas */}
                     <div className="flex gap-3 w-full justify-center mt-[-18px] mb-2 opacity-70"><div className={`w-[8px] h-[2px] bg-black/70 rounded-full ${isFemale ? '-mt-1 rotate-[-5deg]' : ''}`}></div><div className={`w-[8px] h-[2px] bg-black/70 rounded-full ${isFemale ? '-mt-1 rotate-[5deg]' : ''}`}></div></div>

                     <div className="w-[4px] h-[3px] bg-black/10 rounded-full mt-1"></div>
                     <div className="w-[10px] h-[4px] bg-black/20 rounded-b-full mt-1"></div>
                     
                     {/* Blush */}
                     {isFemale && (<div className="absolute top-[60%] w-full flex justify-between px-3 opacity-40"><div className="w-[8px] h-[5px] bg-rose-500 rounded-full blur-[2px]"></div><div className="w-[8px] h-[5px] bg-rose-500 rounded-full blur-[2px]"></div></div>)}
                </div>
            </div>

            {/* Cabelo Frente */}
            {displayHair === 'short' && <div className="absolute top-[15%] w-[65%] h-[15%] bg-slate-900 rounded-t-[40px] rounded-b-xl z-30"></div>}
            {displayHair === 'long' && <div className="absolute top-[15%] w-[65%] h-[15%] bg-slate-900 rounded-t-[40px] z-30"><div className="absolute top-full left-0 w-[25%] h-[60%] bg-slate-900 rounded-bl-full"></div><div className="absolute top-full right-0 w-[25%] h-[60%] bg-slate-900 rounded-br-full"></div></div>}
            {displayHair === 'punk' && <div className="absolute top-[8%] w-[25%] h-[30%] bg-green-500 rounded-t-full z-30 left-[45%] skew-x-12"></div>}
            {displayHair === 'afro' && <div className="absolute top-[10%] w-[80%] h-[40%] bg-slate-900 rounded-full z-30"></div>}
            {displayHair === 'braids' && (
                <div className="absolute top-[15%] w-[65%] h-[15%] bg-slate-900 rounded-t-[40px] z-30 flex justify-center">
                    <div className="w-[2px] h-full bg-white/10"></div>
                </div>
            )}

            {/* Acessórios */}
            {accessories.includes('glasses') && <div className="absolute top-[40%] w-[60%] flex justify-center gap-1 z-40"><div className="w-[20px] h-[20px] border-2 border-black rounded-full bg-blue-400/20"></div><div className="w-[5px] h-[2px] bg-black mt-2"></div><div className="w-[20px] h-[20px] border-2 border-black rounded-full bg-blue-400/20"></div></div>}
            {accessories.includes('mask') && <div className="absolute top-[55%] w-[40%] h-[20%] bg-white rounded-lg border border-gray-200 z-40 flex items-center justify-center"><div className="w-full h-[1px] bg-gray-300"></div></div>}
            {accessories.includes('cap') && <div className="absolute top-[10%] w-[70%] h-[15%] bg-red-600 rounded-t-full z-50"><div className="absolute bottom-0 -right-[10%] w-[120%] h-[30%] bg-red-700 rounded-full"></div></div>}
            {accessories.includes('headband') && <div className="absolute top-[22%] w-[62%] h-[8%] bg-orange-500 z-40"></div>}
        </div>
    );
};

const LivingBackground = ({ theme }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {theme === 'plane' && <div className="absolute top-20 -left-20 animate-fly text-white/20"><Plane size={80} /></div>}
        {theme === 'taxi' && <div className="absolute bottom-10 -left-20 animate-drive text-yellow-400/40"><Car size={80} /></div>}
        {theme === 'cafe' && <div className="absolute bottom-32 right-10 animate-floating-item text-orange-200/20"><Coffee size={60} /></div>}
        {theme === 'sun' && <div className="absolute top-10 right-10 text-yellow-300/30 animate-pulse-soft"><Sun size={100} /></div>}
        {theme === 'school' && <div className="absolute bottom-20 left-10 animate-floating-item text-blue-300/20"><BookOpen size={60} /></div>}
        {theme === 'shop' && <div className="absolute top-40 right-20 animate-float text-pink-300/20"><ShoppingBag size={60} /></div>}
        {theme === 'doctor' && <div className="absolute top-20 left-10 animate-pulse-soft text-green-300/20"><Stethoscope size={70} /></div>}
        {theme === 'work' && <div className="absolute bottom-10 right-10 animate-float text-slate-300/20"><Briefcase size={70} /></div>}
        {theme === 'hotel' && <div className="absolute top-10 left-20 animate-float text-purple-300/20"><BedDouble size={70} /></div>}
    </div>
);

// --- APP ---
export default function TalkmindApp() {
  const [view, setView] = useState('lang-select');
  const [activeTab, setActiveTab] = useState('home');
  const [nativeLang, setNativeLang] = useState(null);
  const [targetLang, setTargetLang] = useState(null);
  const [hearts, setHearts] = useState(5);
  const [xp, setXp] = useState(120);
  const [mindcash, setMindcash] = useState(450); 
  const [level, setLevel] = useState(1);
  const [avatarConfig, setAvatarConfig] = useState({ gender: 'female', skin: '#f5d0b0', hair: 'long', outfit: '#ec4899', accessories: [] });
  const [inventory, setInventory] = useState(['s1', 's2', 'h1', 'h2', 'o1']);
  const [shopTab, setShopTab] = useState('gender');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [toast, setToast] = useState(null); 

  const [lessonData, setLessonData] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [storyData, setStoryData] = useState(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [sentenceBuild, setSentenceBuild] = useState([]); 
  const [showTranslation, setShowTranslation] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.1);

  const isPlayingRef = useRef(false);
  useEffect(() => { isPlayingRef.current = isPlayingStory; }, [isPlayingStory]);

  const showToastMessage = (msg, type = 'error') => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3000);
  };

  const speak = (text, speed = 1.2) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = targetLang === 'en' ? 'en-US' : targetLang === 'es' ? 'es-ES' : targetLang === 'fr' ? 'fr-FR' : 'de-DE';
      u.rate = speed;
      window.speechSynthesis.speak(u);
    }
  };

  const startLesson = (l) => {
      if (l.id > level) return;
      const questions = generateLessonContent(l.id, l.topic, targetLang);
      setLessonData({ meta: l, questions });
      setCurrentQIndex(0);
      setFeedback(null);
      setSentenceBuild([]);
      setView('lesson');
  };

  const finishLesson = () => {
      setXp(prev => prev + 50);
      setMindcash(prev => prev + 20);
      if (lessonData.meta.id === level) setLevel(prev => prev + 1);
      setView('result');
  };

  const startStory = (s) => { setStoryData(s); setCurrentLineIndex(-1); setIsPlayingStory(false); setShowTranslation(false); setView('story'); };
  const finishStory = () => { setMindcash(prev => prev + 25); showToastMessage("História Completa! +25 Mindcash!", 'success'); setView('app'); }
  
  const playStoryLine = (index) => {
      if (index >= storyData.dialogue.length) { setIsPlayingStory(false); return; }
      setCurrentLineIndex(index);
      const line = storyData.dialogue[index];
      
      if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(line.text);
          u.lang = targetLang === 'en' ? 'en-US' : 'de-DE'; 
          u.rate = playbackSpeed;
          if (line.gender === 'female') u.pitch = 1.2; else u.pitch = 0.9;

          u.onend = () => {
              if (isPlayingRef.current) {
                  setTimeout(() => playStoryLine(index + 1), 500);
              }
          };
          
          u.onerror = () => {
               if (isPlayingRef.current) setTimeout(() => playStoryLine(index + 1), 2000);
          };

          window.speechSynthesis.speak(u);
      } else {
           setTimeout(() => { if (isPlayingRef.current) playStoryLine(index + 1); }, 2000);
      }
  };

  const toggleStoryPlay = () => {
      const newState = !isPlayingStory;
      setIsPlayingStory(newState);
      if (newState) playStoryLine(currentLineIndex + 1); else window.speechSynthesis.cancel();
  };

  const redeemCode = () => {
      if (promoCode.toLowerCase() === 'guiizhlivia') { setMindcash(999999); showToastMessage('Código secreto ativado!', 'success'); } 
      else { showToastMessage('Código inválido.'); }
      setPromoCode('');
  };

  const handleShopClick = (item, type) => {
      const owned = inventory.includes(item.id) || item.cost === 0;
      if (type === 'gender') { setAvatarConfig(prev => ({ ...prev, gender: item.id })); return; }
      if (owned) {
          if (type === 'accessory') {
              setAvatarConfig(prev => {
                  const current = prev.accessories || [];
                  if (current.includes(item.style)) return { ...prev, accessories: current.filter(a => a !== item.style) };
                  else return current.length < 3 ? { ...prev, accessories: [...current, item.style] } : prev;
              });
          } else {
              setAvatarConfig(prev => ({ ...prev, [type]: item.style || item.color, ...(type === 'outfit' ? { outfitDetail: item.detail || 'none' } : {}) }));
          }
      } else {
          if (mindcash >= item.cost) { setMindcash(prev => prev - item.cost); setInventory(prev => [...prev, item.id]); showToastMessage("Item comprado!", "success"); } 
          else { showToastMessage("Mindcash insuficiente!", "error"); }
      }
  };

  // RENDERIZAÇÃO
  return (
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col max-w-md mx-auto border-x border-slate-800/50 shadow-2xl relative overflow-hidden font-sans">
          <GlobalStyles />
          {toast && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[100] bg-slate-800 border border-slate-600 px-6 py-3 rounded-full shadow-2xl animate-toast flex items-center gap-2">
                  {toast.type === 'error' ? <AlertCircle size={20} className="text-red-500"/> : <Check size={20} className="text-green-500"/>}
                  <span className="font-bold text-sm">{toast.msg}</span>
              </div>
          )}

          {view === 'lang-select' && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0f172a] to-[#0f172a]"></div>
                  <div className="w-full max-w-md space-y-10 animate-float relative z-10">
                      <div className="text-center">
                          <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30 border border-white/10">
                             <Globe size={64} className="text-white" />
                          </div>
                          <h1 className="text-5xl font-black mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Talkmind</h1>
                          <p className="text-slate-400 font-medium">Aprenda idiomas vivendo histórias.</p>
                      </div>
                      {!nativeLang ? (
                          <div className="space-y-3">
                              <p className="text-center font-bold uppercase tracking-widest text-xs text-slate-500">Eu falo</p>
                              {LANGUAGES.map(lang => (
                                  <button key={lang.id} onClick={() => setNativeLang(lang.id)} className="w-full p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-2xl flex items-center gap-4 btn-3d border-b-slate-900">
                                      <span className="text-3xl">{lang.flag}</span><span className="font-bold text-lg">{lang.name}</span>
                                  </button>
                              ))}
                          </div>
                      ) : (
                          <div className="space-y-3 animate-pulse-soft">
                              <p className="text-center font-bold uppercase tracking-widest text-xs text-slate-500">Quero aprender</p>
                              {LANGUAGES.filter(l => l.id !== nativeLang).map(lang => (
                                  <button key={lang.id} onClick={() => { setTargetLang(lang.id); setView('app'); }} className="w-full p-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-lg flex items-center gap-4 btn-3d border-b-indigo-800">
                                      <span className="text-3xl">{lang.flag}</span><span className="font-bold text-lg">{lang.name}</span>
                                  </button>
                              ))}
                              <button onClick={() => setNativeLang(null)} className="w-full text-slate-500 text-sm font-bold py-2 hover:text-white">Voltar</button>
                          </div>
                      )}
                  </div>
              </div>
          )}

          {view === 'app' && (
              <>
                  <div className="glass-panel sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                          <div className="relative">
                              <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-600 hover:border-indigo-400 transition-colors">
                                  <span className="text-xl">{LANGUAGES.find(l => l.id === targetLang)?.flag}</span>
                                  <ChevronDown size={14} className="text-slate-400"/>
                              </button>
                              {showLangMenu && (
                                  <div className="absolute top-full left-0 mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-2 w-48 z-50 animate-popIn">
                                      {LANGUAGES.filter(l => l.id !== nativeLang).map(l => (
                                          <button key={l.id} onClick={() => { setTargetLang(l.id); setShowLangMenu(false); }} className="w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 hover:bg-slate-700 border-b border-slate-700 last:border-0">
                                              <span className="text-2xl">{l.flag}</span> <span className="font-bold text-sm">{l.name}</span>
                                          </button>
                                      ))}
                                  </div>
                              )}
                          </div>
                          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-600 text-red-400 font-bold"><Heart size={16} fill="currentColor" /> {hearts}</div>
                          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-600 text-yellow-400 font-bold"><div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-yellow-300"></div> {mindcash}</div>
                      </div>
                      <AvatarDisplay config={avatarConfig} size="small" />
                  </div>

                  {activeTab === 'home' && (
                      <div className="flex-1 overflow-y-auto p-6 pb-32 relative bg-[#0f172a]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
                          <div className="flex flex-col items-center gap-8 pt-8 relative z-10">
                              {TOPIC_ORDER.map((topic, i) => {
                                  const l = { id: i + 1, title: topic.charAt(0).toUpperCase() + topic.slice(1), topic };
                                  const isLocked = l.id > level;
                                  const isCurrent = l.id === level;
                                  const color = (l.id - 1) % 3 === 0 ? "bg-indigo-500 border-b-indigo-700" : (l.id - 1) % 3 === 1 ? "bg-emerald-500 border-b-emerald-700" : "bg-rose-500 border-b-rose-700";
                                  const pos = (l.id - 1) % 2 === 0 ? 'center' : (l.id - 1) % 4 === 1 ? 'left' : 'right';
                                  return (
                                      <div key={l.id} className={`relative transition-all duration-500 ${pos === 'left' ? '-ml-16' : pos === 'right' ? '-mr-16' : ''}`}>
                                          {isCurrent && <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-white text-indigo-900 text-xs font-black px-4 py-2 rounded-xl animate-float shadow-lg uppercase tracking-wide z-20 whitespace-nowrap border-2 border-indigo-100">COMEÇAR <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r-2 border-b-2 border-indigo-100"></div></div>}
                                          <button onClick={() => startLesson(l)} disabled={isLocked} className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-200 relative border-b-[6px] ${isLocked ? 'bg-slate-800 border-b-slate-950 text-slate-600 grayscale cursor-not-allowed' : `${color} hover:-translate-y-1 active:translate-y-1 active:border-b-0 text-white`}`}>
                                              {isLocked ? <Lock size={32} /> : <Star size={36} fill="currentColor" className="opacity-90" />}
                                              {!isLocked && <div className="absolute inset-0 bg-white/10 rounded-[2rem]"></div>}
                                          </button>
                                          <div className="mt-3 text-center"><span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${isLocked ? 'text-slate-600' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>{l.title} {Math.ceil(l.id / 10)}</span></div>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
                  )}

                  {activeTab === 'stories' && (
                      <div className="flex-1 overflow-y-auto p-6 pb-32 bg-[#0f172a]">
                          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white"><BookOpen className="text-indigo-400" /> Histórias</h2>
                          <div className="grid gap-4">
                              {STORIES_DB.map(story => (
                                  <button key={story.id} onClick={() => startStory(story)} className="relative overflow-hidden bg-slate-800 p-4 rounded-3xl border border-slate-700 flex items-center gap-4 hover:bg-slate-700 transition-all group shadow-lg">
                                      <div className={`absolute inset-0 bg-gradient-to-r ${story.color} opacity-5`}></div>
                                      <div className={`w-20 h-20 bg-gradient-to-br ${story.color} rounded-2xl flex items-center justify-center shadow-lg text-white shrink-0`}>
                                          {story.theme === 'plane' ? <Plane size={32} /> : story.theme === 'taxi' ? <Car size={32} /> : story.theme === 'cafe' ? <Coffee size={32} /> : <MessageCircle size={32} />}
                                      </div>
                                      <div className="flex-1 z-10 text-left">
                                          <h3 className="font-bold text-lg text-white leading-tight">{story.title}</h3>
                                          <p className="text-sm text-slate-400 mt-1">{story.desc}</p>
                                          <div className="flex gap-2 mt-2"><span className="text-[10px] font-bold uppercase tracking-wide bg-black/30 px-2 py-1 rounded text-white/70">{story.level}</span></div>
                                      </div>
                                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-indigo-600 transition-colors shadow-inner"><Play size={18} fill="currentColor" /></div>
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}

                  {activeTab === 'shop' && (
                      <div className="flex-1 overflow-y-auto p-4 pb-32 bg-[#0f172a]">
                           <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] p-8 mb-8 flex flex-col items-center relative overflow-hidden shadow-2xl border border-slate-700">
                              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300"><AvatarDisplay config={avatarConfig} size="large" /></div>
                              <h2 className="mt-6 font-bold text-2xl relative z-10 tracking-tight text-white">Seu Estilo</h2>
                          </div>
                          <div className="flex gap-2 mb-6 overflow-x-auto pb-4 hide-scrollbar">
                              {['gender', 'skin', 'hair', 'outfit', 'accessory', 'bonus'].map(cat => (
                                  <button key={cat} onClick={() => setShopTab(cat)} className={`px-6 py-3 rounded-2xl font-bold text-sm capitalize whitespace-nowrap transition-all shadow-md ${shopTab === cat ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>{cat === 'gender' ? 'Gênero' : cat === 'skin' ? 'Pele' : cat === 'hair' ? 'Cabelo' : cat === 'outfit' ? 'Roupa' : cat === 'accessory' ? 'Acessórios' : 'Bônus'}</button>
                              ))}
                          </div>
                          {shopTab === 'bonus' ? (
                              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 flex flex-col items-center text-center shadow-xl"><Key className="w-12 h-12 text-yellow-400 mb-4" /><h3 className="font-bold text-xl mb-2">Área Secreta</h3><input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="CÓDIGO" className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-2xl mb-4 text-center font-black text-xl text-white uppercase"/><button onClick={redeemCode} className="w-full py-4 bg-green-600 rounded-2xl font-bold text-white btn-3d border-b-green-800">RESGATAR</button></div>
                          ) : shopTab === 'gender' ? (
                              <div className="grid grid-cols-2 gap-4">{[{id: 'male', name: 'Masculino'}, {id: 'female', name: 'Feminino'}].map(item => (<div key={item.id} onClick={() => handleShopClick(item, 'gender')} className={`bg-slate-800 p-6 rounded-3xl border-2 flex flex-col items-center cursor-pointer hover:bg-slate-700 ${avatarConfig.gender === item.id ? 'border-green-500 bg-green-500/10' : 'border-slate-700'}`}><div className="text-4xl mb-2">{item.id === 'male' ? '👦' : '👧'}</div><div className="font-bold text-lg">{item.name}</div></div>))}</div>
                          ) : (
                              <div className="grid grid-cols-2 gap-4 pb-8">
                                  {AVATAR_ITEMS[shopTab]?.map(item => {
                                      const owned = inventory.includes(item.id) || item.cost === 0;
                                      let equipped = false;
                                      if (shopTab === 'accessory') equipped = avatarConfig.accessories?.includes(item.style);
                                      else if (shopTab === 'outfit') equipped = avatarConfig.outfit === item.color;
                                      else equipped = avatarConfig[shopTab] === (item.style || item.color);
                                      return (
                                          <div key={item.id} onClick={() => handleShopClick(item, shopTab)} className={`relative bg-slate-800 p-4 rounded-3xl border-2 flex flex-col items-center cursor-pointer transition-all hover:bg-slate-700 ${equipped ? 'border-green-500 bg-green-500/10' : 'border-slate-700'}`}>
                                              <div className="w-16 h-16 rounded-full mb-3 flex items-center justify-center border-2 border-slate-600 bg-slate-700" style={{backgroundColor: item.color || '#334155'}}>
                                                  {shopTab === 'accessory' && item.style === 'glasses' && <Glasses className="text-slate-900"/>}
                                              </div>
                                              <div className="font-bold text-sm mb-2 text-center text-white">{item.name || 'Item'}</div>
                                              {owned ? (<span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${equipped ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>{equipped ? 'Usando' : 'Usar'}</span>) : (<div className="flex items-center gap-1 text-yellow-400 font-bold text-sm bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700"><div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-yellow-300"></div> {item.cost}</div>)}
                                          </div>
                                      )
                                  })}
                              </div>
                          )}
                      </div>
                  )}

                  {activeTab === 'profile' && (
                      <div className="flex-1 overflow-y-auto p-6 pb-32 bg-[#0f172a]">
                          <div className="flex flex-col items-center mb-8 pt-4">
                              <div className="relative mb-6"><div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div><div className="transform scale-110"><AvatarDisplay config={avatarConfig} size="large" /></div><div className="absolute -bottom-2 -right-2 bg-slate-800 p-2 rounded-2xl border border-slate-700 shadow-xl"><span className="text-3xl">{LANGUAGES.find(l => l.id === nativeLang)?.flag}</span></div></div>
                              <h2 className="text-3xl font-black text-white">Estudante VIP</h2><p className="text-indigo-400 font-medium">Membro desde 2025</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-8">
                              <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-lg flex flex-col gap-2"><div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider"><Zap size={16} className="text-orange-400"/> Ofensiva</div><div className="text-3xl font-black text-white">12 Dias</div></div>
                              <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-lg flex flex-col gap-2"><div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider"><Trophy size={16} className="text-yellow-400"/> Liga</div><div className="text-3xl font-black text-yellow-400">Ouro</div></div>
                          </div>
                      </div>
                  )}

                  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-2 rounded-[2rem] flex gap-2 shadow-2xl z-50">
                      <button onClick={() => setActiveTab('home')} className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'home' ? 'bg-indigo-500 text-white shadow-lg -translate-y-2' : 'text-slate-500 hover:text-white'}`}><Home size={24} /></button>
                      <button onClick={() => setActiveTab('stories')} className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'stories' ? 'bg-indigo-500 text-white shadow-lg -translate-y-2' : 'text-slate-500 hover:text-white'}`}><BookOpen size={24} /></button>
                      <button onClick={() => setActiveTab('shop')} className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'shop' ? 'bg-indigo-500 text-white shadow-lg -translate-y-2' : 'text-slate-500 hover:text-white'}`}><Shirt size={24} /></button>
                      <button onClick={() => setActiveTab('profile')} className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-indigo-500 text-white shadow-lg -translate-y-2' : 'text-slate-500 hover:text-white'}`}><User size={24} /></button>
                  </div>
              </>
          )}

          {view === 'story' && storyData && (
              <div className="min-h-screen bg-[#0f172a] text-white flex flex-col max-w-md mx-auto relative overflow-hidden">
                  <LivingBackground theme={storyData.theme} />
                  <div className="glass sticky top-0 z-20 px-4 py-3 flex items-center justify-between">
                      <button onClick={() => setView('app')} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X /></button>
                      <div className="flex-1"><h2 className="font-bold text-lg truncate">{storyData.title}</h2></div>
                      <div className="flex gap-2">
                          <button onClick={() => setPlaybackSpeed(playbackSpeed === 1.1 ? 2.0 : 1.1)} className={`p-2 rounded-xl text-xs font-bold transition-colors ${playbackSpeed > 1.1 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 border border-slate-600'}`}>2x</button>
                          <button onClick={() => setShowTranslation(!showTranslation)} className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${showTranslation ? 'bg-green-500 text-slate-900' : 'bg-slate-800 text-slate-300 border border-slate-600'}`}><Languages size={16}/> {showTranslation ? 'PT' : 'EN'}</button>
                      </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32 relative z-10">
                      {storyData.dialogue.map((line, index) => (
                          <div key={index} onClick={() => playStoryLine(index)} className={`transition-all duration-500 ${index === currentLineIndex ? 'scale-105 opacity-100' : index < currentLineIndex ? 'opacity-60' : 'opacity-80'} msg-${line.speaker === 'You' ? 'right' : 'left'}`}>
                              <div className={`flex gap-3 ${line.speaker === 'You' ? 'flex-row-reverse' : ''}`}>
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-lg border-2 border-white/10 ${line.speaker==='You' ? 'bg-indigo-600' : 'bg-slate-700'}`}>{line.speaker.slice(0,1)}</div>
                                  <div className={`p-5 rounded-3xl max-w-[80%] text-lg leading-relaxed shadow-md ${index === currentLineIndex ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                                      {showTranslation ? (line.translation || line.text) : line.text}
                                  </div>
                              </div>
                          </div>
                      ))}
                      {currentLineIndex >= storyData.dialogue.length - 1 && (
                          <div className="py-8 flex justify-center"><button onClick={finishStory} className="px-8 py-4 bg-green-500 text-white font-bold rounded-2xl btn-3d border-b-green-700 animate-pop shadow-lg shadow-green-500/20">TERMINAR (+25 🪙)</button></div>
                      )}
                  </div>
                  <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-center z-20"><button onClick={toggleStoryPlay} className="w-16 h-16 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center shadow-xl btn-3d border-b-indigo-800 transition-all active:scale-95">{isPlayingStory ? <Pause fill="currentColor" size={28} /> : <Play fill="currentColor" className="ml-1" size={28} />}</button></div>
              </div>
          )}

          {view === 'lesson' && lessonData && (
              <div className="min-h-screen bg-[#0f172a] text-white flex flex-col max-w-md mx-auto">
                  <div className="p-4 flex items-center gap-4"><button onClick={() => setView('app')}><X className="text-slate-500 hover:text-white"/></button><div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-green-500 transition-all duration-500 ease-out rounded-full" style={{width: `${((currentQIndex) / lessonData.questions.length) * 100}%`}}></div></div></div>
                  <div className="flex-1 p-6 flex flex-col justify-center">
                      <h2 className="text-3xl font-black mb-10 text-center text-white drop-shadow-lg animate-float">{lessonData.questions[currentQIndex].prompt}</h2>
                      {lessonData.questions[currentQIndex].type === 'multiple_choice' && (<div className="space-y-4"><div className="flex justify-center gap-4 mb-8"><button onClick={() => speak(lessonData.questions[currentQIndex].audio)} className="p-6 bg-indigo-600/20 text-indigo-400 rounded-3xl hover:bg-indigo-600/30 transition-all btn-3d border-b-indigo-900"><Volume2 size={48}/></button><button onClick={() => speak(lessonData.questions[currentQIndex].audio, 0.5)} className="p-6 bg-emerald-600/20 text-emerald-400 rounded-3xl hover:bg-emerald-600/30 transition-all btn-3d border-b-emerald-900" title="Modo Lento"><Turtle size={48}/></button></div>{lessonData.questions[currentQIndex].options.map((opt, i) => (<button key={i} onClick={() => { const isCorrect = opt.correct; setFeedback(isCorrect ? 'correct' : 'wrong'); }} disabled={!!feedback} className={`w-full p-5 rounded-2xl border-b-4 text-left font-bold text-lg transition-all active:border-b-0 active:translate-y-1 ${feedback && opt.correct ? 'bg-green-500/20 border-green-500 text-green-400' : feedback && !opt.correct ? 'opacity-50' : 'border-slate-700 bg-slate-800 hover:bg-slate-750'}`}>{opt.text}</button>))}</div>)}
                      {lessonData.questions[currentQIndex].type === 'sentence_builder' && (<div className="space-y-8"><div className="flex justify-center gap-4"><button onClick={() => speak(lessonData.questions[currentQIndex].target)} className="p-5 bg-indigo-600 rounded-2xl shadow-lg hover:bg-indigo-500 btn-3d border-b-indigo-800"><Volume2 size={40} /></button><button onClick={() => speak(lessonData.questions[currentQIndex].target, 0.5)} className="p-5 bg-emerald-600 rounded-2xl shadow-lg hover:bg-emerald-500 btn-3d border-b-emerald-800"><Turtle size={40} /></button></div><div className="min-h-[100px] bg-slate-800/50 border-2 border-slate-700 rounded-3xl p-4 flex flex-wrap gap-2 items-center justify-center">{sentenceBuild.length === 0 && <span className="text-slate-600 italic font-medium">Toque nas palavras...</span>}{sentenceBuild.map((word, idx) => (<button key={idx} onClick={() => !feedback && setSentenceBuild(prev => prev.filter((_, i) => i !== idx))} className="px-4 py-3 bg-slate-700 rounded-xl border-b-4 border-slate-900 font-bold shadow-md animate-popIn text-lg">{word}</button>))}</div><div className="flex flex-wrap justify-center gap-3">{lessonData.questions[currentQIndex].words.map((word, idx) => { const countUsed = sentenceBuild.filter(w => w === word).length; const countAvailable = lessonData.questions[currentQIndex].words.filter(w => w === word).length; if (countUsed >= countAvailable) return null; return (<button key={idx} onClick={() => !feedback && setSentenceBuild([...sentenceBuild, word])} className="px-5 py-3 bg-slate-800 rounded-xl border-b-4 border-slate-950 font-bold text-lg hover:bg-slate-700 active:border-b-0 active:translate-y-1 transition-all text-slate-200">{word}</button>)})}</div></div>)}
                  </div>
                  <div className={`p-6 border-t border-slate-800 transition-colors ${feedback === 'correct' ? 'bg-green-900/30 border-green-800' : feedback === 'wrong' ? 'bg-red-900/30 border-red-800' : 'bg-[#0f172a]'}`}>
                      {feedback ? (<div className="animate-float"><div className="font-black mb-4 text-2xl flex items-center gap-3">{feedback === 'correct' ? <><div className="bg-green-500 rounded-full p-1 text-slate-900"><Check size={24} strokeWidth={4}/></div> <span className="text-green-400">Incrível!</span></> : <><div className="bg-red-500 rounded-full p-1 text-white"><X size={24} strokeWidth={4}/></div> <span className="text-red-400">Errado:</span></>}</div>{feedback === 'wrong' && <div className="mb-4 text-red-300 pl-10 text-lg font-medium">{lessonData.questions[currentQIndex].type === 'sentence_builder' ? lessonData.questions[currentQIndex].target : lessonData.questions[currentQIndex].options.find(o => o.correct).text}</div>}<button onClick={() => { setFeedback(null); setSentenceBuild([]); if (currentQIndex < lessonData.questions.length - 1) setCurrentQIndex(prev => prev + 1); else finishLesson(); }} className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg uppercase tracking-wide btn-3d ${feedback === 'correct' ? 'bg-green-500 hover:bg-green-400 text-slate-900 border-b-green-700' : 'bg-red-500 hover:bg-red-400 text-white border-b-red-700'}`}>CONTINUAR</button></div>) : (<div className="flex gap-4">{lessonData.questions[currentQIndex].type === 'sentence_builder' && (<button onClick={() => setFeedback('wrong')} className="px-6 py-4 bg-slate-800 text-slate-400 font-bold rounded-2xl border-b-4 border-slate-950 hover:bg-slate-700 hover:text-white uppercase tracking-wide transition-colors">Pular</button>)}<button onClick={() => { if (lessonData.questions[currentQIndex].type === 'sentence_builder') { const isCorrect = sentenceBuild.join(" ").replace(/[?.,]/g, '') === lessonData.questions[currentQIndex].targetClean; setFeedback(isCorrect ? 'correct' : 'wrong'); } }} disabled={lessonData.questions[currentQIndex].type === 'sentence_builder' && sentenceBuild.length === 0} className={`flex-1 py-4 rounded-2xl font-black text-lg shadow-lg uppercase tracking-wide transition-all btn-3d ${lessonData.questions[currentQIndex].type === 'sentence_builder' && sentenceBuild.length === 0 ? 'bg-slate-800 text-slate-600 border-b-slate-900 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-400 border-b-green-700'}`}>{lessonData.questions[currentQIndex].type === 'multiple_choice' ? 'Selecione...' : 'VERIFICAR'}</button></div>)}
                  </div>
              </div>
          )}

          {view === 'result' && (
              <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent"></div>
                  <div className="relative z-10 w-full max-w-md">
                      <Trophy className="w-48 h-48 text-yellow-400 mx-auto drop-shadow-[0_0_50px_rgba(250,204,21,0.5)] animate-float"/>
                      <h2 className="text-5xl font-black text-white mb-4 tracking-tight mt-8">Lição Completa!</h2>
                      <div className="flex gap-4 mt-8 w-full">
                          <div className="flex-1 bg-slate-800/80 backdrop-blur p-6 rounded-3xl border border-slate-700 flex flex-col items-center gap-2 shadow-xl"><div className="text-slate-400 text-xs font-bold uppercase tracking-widest">XP Ganho</div><div className="text-4xl text-indigo-400 font-black flex items-center gap-2"><Zap fill="currentColor"/> +50</div></div>
                          <div className="flex-1 bg-slate-800/80 backdrop-blur p-6 rounded-3xl border border-slate-700 flex flex-col items-center gap-2 shadow-xl"><div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Mindcash</div><div className="text-4xl text-yellow-400 font-black flex items-center gap-2"><div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-yellow-300"></div> +20</div></div>
                      </div>
                      <button onClick={() => setView('app')} className="mt-12 w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-white shadow-xl shadow-indigo-900/50 text-xl btn-3d border-b-indigo-800">CONTINUAR</button>
                  </div>
              </div>
          )}
      </div>
  );
}