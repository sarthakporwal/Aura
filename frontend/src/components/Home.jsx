import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);
  const fullText = "We provide an engaging and interactive learning experience that enhances your studies. Enjoy dynamic courses with multimedia resources, personalized learning paths tailored to your needs, and a collaborative community for discussions. Stay motivated with gamified elements like rewards and leaderboards. Join us to explore innovative ways of learning!";

  // Intersection Observer to handle fade in/out effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Fade in when in view
          } else {
            setIsVisible(false); // Fade out when out of view
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const target = document.querySelector('#scroll-target');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div className='w-screen h-screen bg-zinc-800 flex flex-col'>
      <div className='flex-1 flex'>
        <div className='flex-1 pt-1 px-5'>
          <img src="src/components/logo.png" alt="Logo" className="w-[14vw] h-auto rounded-md" /> 
          <div className='textstructure mt-19 px-20'>
            {["We Gamify", "Your", "Studies"].map((item, index) => {
              const isLastLine = index === 2; // Check if the current item is "Studies"
              return (
                <motion.div 
                className='masker flex items-end mb-4' 
                key={index}
                initial={{ opacity: 0, x: -50, color: 'white' }} // Initial state for animation
                animate={{ opacity: isVisible ? 1 : 0, x: 0, color: isVisible ? '#FF2270' : 'white' }} // Animate based on visibility
                transition={{ duration: 1 }} // Transition duration
              >

              
                  <div className='w-fit flex items-end overflow-hidden'>
                    {index === 1 && (
                      <motion.div 
                        className="flex space-x-4 mr-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0}}
                        transition={{ duration: 1 }}
                      >
                        <img src="src/components/controller.png" alt="Image 1" className="w-[8vw] h-auto rounded-md" />
                        <img src="src/components/laptop.png" alt="Image 2" className="w-[8vw] h-auto rounded-md" />
                      </motion.div>
                    )}
                    <motion.h2 
                      className={`pt-[0.5vw] mb-[0.2vw] uppercase text-[6vw] leading-[1.05] font-["Futura_MD_BT"] font-bold relative`}
                      whileHover={{ color: '#ff2770' }} // Change color to red on hover
                    >
                      {item}
                    </motion.h2>
                  </div>
                  {isLastLine && (
                    <style jsx>{`
                      .masker:last-child h2 {
                        margin-left: 150px; /* Shift last line to the right */
                      }
                    `}</style>
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className='mt-10 ml-72'>
            <motion.button 
              className='bg-white text-black w-[10vw] h-[4vw] font-bold rounded-lg'
              transition={{ duration: 0.5 }}
              whileHover={{ background: '#ff2770', scale: 1.05, color: "white" }}
            >
              <Link to="/login">Let's Play</Link>
            </motion.button>
          </div>
        </div>

        {/* Text Card on Right Half */}
        <div className='flex-1 flex items-center justify-center'>
        <motion.div 
              className='p-10 h-auto text-white text-center rounded-lg shadow-lg' 
              style={{ background: 'linear-gradient(to right, #FF2270, #27272A)' }} // Using #4B5563 as a substitute for zinc-800
              initial={{ x: '100%', opacity: 0 }} // Start off-screen to the right
              animate={{ x: '0%', opacity: isVisible ? 1 : 0 }} // Animate to original position
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05, opacity: 0.9 }} // Scale up on hover
            >
              {/* Content goes here */}

            <h3 className='text-xl font-bold mb-4 font-["Geometr415_Blk_BT"] uppercase text-[2.5vw]'>Welcome to Our Platform!</h3>
            <motion.p className='font-["Geometr415_Blk_BT"] text-[1.8vw] text-justify'>
              {fullText}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <Link to='home2'>
        <footer id="scroll-target" className="flex items-center justify-center bg-zinc-800 py-4 font-['Geometr415_Blk_BT'] ">
          <img src="src/components/down-arrow.png" alt="Down Arrow" className="w-[3vw] h-auto mr-2" />
          <span className="text-white text-lg">Click to know more</span>
        </footer>
      </Link>
    </div>
    
  );
}

export default Home;