import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";

function Home2() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleClose = () => {
    setSelectedCard(null);
  };

  return (
    <div className={`flex flex-col items-center w-screen h-screen bg-zinc-800 transition-all duration-300 ${selectedCard ? 'backdrop-blur-md' : ''}`}>
      {/* Header Section */}
      <div className='flex items-center justify-center w-full absolute top-0 mt-4'>
        <img src="src/components/down-arrow.png" alt="Down Arrow" className="w-[3vw] h-auto mr-2 rotate-180" />
        <span className="text-white text-lg"><Link to="/">Go back</Link></span>
      </div>

      {/* Tilt Cards Section */}
      <div className="flex justify-center items-center flex-grow mt-16 space-x-10">
        <TiltCard 
          imageSrc="src/components/progress.png" 
          text="Track" 
          text2="Daily"
          text3="Goals"
          onClick={() => handleCardClick('track')}
        />
        <TiltCard 
          imageSrc="src/components/badge.png" 
          text="Earn" 
          text2="Aura Points &"
          text3="Badges" 
          onClick={() => handleCardClick('earn')}
        />
        <TiltCard 
          imageSrc="src/components/tt.png" 
          text="Manage" 
          text2="Your"
          text3="Studies"
          onClick={() => handleCardClick('manage')}
        />
      </div>

      {/* Text Boxes Section */}
      {selectedCard && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">{selectedCard === 'track' ? 'Track Your Goals' : selectedCard === 'earn' ? 'Earn Points & Badges' : 'Manage Your Studies'}</h2>
            <p>{selectedCard === 'track' ? 'Here you can track your daily goals and monitor your progress.' : selectedCard === 'earn' ? 'Earn Aura Points and unlock badges for your achievements.' : 'Manage your studies effectively with our tools.'}</p>
            <button onClick={handleClose} style={{ backgroundColor: '#FF2270' }} className="mt-4 px-4 py-2 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ imageSrc, text, text2, text3, onClick }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick} // Add click handler
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-96 w-80 rounded-xl cursor-pointer"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF2270] to-[#FF6F91] opacity-80" />
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-zinc-800 shadow-lg"
      >
        <img src={imageSrc} alt={text} className="mx-auto w-[150px] h-auto mb-2" />
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="mt-4 text-justify text-2xl font-bold text-white font-['Geometr415_Blk_BT'] uppercase"
        >
          {text}
        </p>
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="text-justify text-2xl font-bold text-white font-['Geometr415_Blk_BT'] uppercase"
        >
          {text2}
        </p>
        <p
          style={{
            transform: "translateZ(50px)",
          }}
          className="text-justify text-2xl font-bold text-white font-['Geometr415_Blk_BT'] uppercase"
        >
          {text3}
        </p>
        
      </div>
    </motion.div>
  );
};

export default Home2;