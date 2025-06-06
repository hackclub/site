import { useEffect, useState } from 'react';

const Webring = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Load the webring script
    const script = document.createElement('script');
    script.src = 'https://webring.hackclub.com/embed.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Add glitch effect on hover
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to trigger glitch
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 2000);

    return () => {
      document.body.removeChild(script);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div 
      id="webring-wrapper" 
      className={`
        flex items-center justify-center gap-2 py-4
        ${isGlitching ? 'animate-glitch' : ''}
        transition-all duration-300
      `}
    >
      <a
        href="https://webring.hackclub.com/"
        id="previousBtn"
        className="webring-anchor text-2xl text-hack-blue hover:text-hack-red transition-colors"
        title="Previous"
      >
        ‹
      </a>
      <a
        href="https://webring.hackclub.com/"
        className={`
          webring-logo transition-all duration-300
          ${isGlitching ? 'animate-pulse' : ''}
        `}
        title="Hack Club Webring"
      >
      </a>
      <a
        href="https://webring.hackclub.com/"
        id="nextBtn"
        className="webring-anchor text-2xl text-hack-blue hover:text-hack-red transition-colors"
        title="Next"
      >
        ›
      </a>
    </div>
  );
};

export default Webring; 