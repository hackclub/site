import React, { useEffect, useRef, useState} from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

const LadderScene = ({ width = 550, height = 320 }) => {
  const canvasRef = useRef(null);
    const wordPairs = [
    ['grow', 'grow'],
    ['lead', 'rise'],
    ['ping', 'pong'],
    ['hack', 'hack'],
    ['code', 'code'],
    ['slay', 'slay'],
    ['push', 'pull'],
    ['fork', 'yay!'],
    ['beep', 'boop'],
    ['play', 'win'],
    ['drop', 'kick'],
    ['zoom', 'zap!'],
    ['test', 'pass'],
    ['vibe', 'sync']
  ];
  const [currentPair, setCurrentPair] = useState(wordPairs[0]);
  const [fade, setFade] = useState(true);



  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const next = wordPairs[Math.floor(Math.random() * wordPairs.length)];
        setCurrentPair(next);
        setFade(true);
      }, 400); //
    }, 25000); // 25 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    // building
    const cols = 4;
    const rows = 5;
    const blockSize = 50;
    const offsetX = 270;
    const offsetY = 40;

    const you = 'YOU'.split('');
    const left = currentPair[0].toUpperCase().split('');
    const we = 'WE'.split('');
    const right = currentPair[1].toUpperCase().split('');

    const words = [you, left, we, right];

    let wordIndex = 0;
    let letterIndex = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((row === 2 && (col === 2 || col === 3)) || (col === 0 && row === 0)) continue;

        const x = offsetX + col * blockSize;
        const y = offsetY + row * blockSize;

        rc.rectangle(x, y, blockSize, blockSize, { stroke: 'grey' });

        if (wordIndex < words.length && letterIndex < words[wordIndex].length) {
          const letter = words[wordIndex][letterIndex];
          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(letter, x + blockSize / 2, y + blockSize / 2);
          letterIndex++;
        } else if (wordIndex < words.length) {
          wordIndex++;
          letterIndex = 0;
          if (wordIndex < words.length && letterIndex < words[wordIndex].length) {
            const letter = words[wordIndex][letterIndex];
            ctx.font = 'blod 20px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(letter, x + blockSize / 2, y + blockSize / 2);
            letterIndex++;
          }
        }
      }
    }

    // ladder
    const ladderTopX = 250;
    const ladderTopY = 80;
    const ladderBottomX = 170;
    const ladderBottomY = 220;

    rc.line(ladderTopX, ladderTopY, ladderBottomX, ladderBottomY, { stroke: 'grey' });
    rc.line(ladderTopX + 20, ladderTopY, ladderBottomX + 20, ladderBottomY, { stroke: 'grey' });

    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x1 = ladderTopX + t * (ladderBottomX - ladderTopX);
      const y1 = ladderTopY + t * (ladderBottomY - ladderTopY);
      const x2 = x1 + 20;
      const y2 = y1;
      rc.line(x1, y1, x2, y2, { stroke: 'grey' });
    }

    // person on ladder
    const personX = 240;
    const personY = 60;
    rc.circle(personX, personY, 15, { fill: 'white', stroke: 'white' });
    rc.line(personX, personY + 7.5, personX, personY + 40, { stroke: 'white' });
    rc.line(personX, personY + 20, personX - 10, personY + 25, { stroke: 'white' });
    rc.line(personX, personY + 20, personX + 10, personY + 25, { stroke: 'white' });
    rc.line(personX, personY + 40, personX - 10, personY + 55, { stroke: 'white' });
    rc.line(personX, personY + 40, personX + 10, personY + 55, { stroke: 'white' });

    // person on ground
    const giverX = 150;
    const giverY = 190;
    rc.circle(giverX, giverY, 15, { fill: 'white', stroke: 'white' });
    rc.line(giverX, giverY + 7.5, giverX, giverY + 40, { stroke: 'white' });
    rc.rectangle(giverX + 10, giverY - 10, blockSize, blockSize, { stroke: 'white' });
    rc.line(giverX, giverY + 20, giverX + 15, giverY + 15, { stroke: 'white' });
    rc.line(giverX, giverY + 40, giverX - 10, giverY + 55, { stroke: 'white' });
    rc.line(giverX, giverY + 40, giverX + 10, giverY + 55, { stroke: 'white' });
  }, [currentPair, width, height]);

  return (
    <div className="relative w-full flex justify-center items-center">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default LadderScene;