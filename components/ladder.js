import React, { useEffect, useRef } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

const LadderScene = ({ width = 500, height = 300 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, width, height);

    // building
    const cols = 3;
    const rows = 5;
    const blockSize = 35;
    const offsetX = 270;
    const offsetY = 40; 

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if ((row == 0 && col == 0) || (col == 2 && row == 2)) continue;
        const x = offsetX + col * blockSize;
        const y = offsetY + row * blockSize;
        rc.rectangle(x, y, blockSize, blockSize, { stroke: 'grey' });
      }
    }

    // ladder 
    const ladderTopX = 250
    const ladderTopY = 80 
    const ladderBottomX = 170
    const ladderBottomY = 220 

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
    rc.circle(personX, personY, 15, { fill: 'white', stroke: 'white' }); // head
    rc.line(personX, personY + 7.5, personX, personY + 40, { stroke: 'white' }); // body
    rc.line(personX, personY + 20, personX - 10, personY + 25, { stroke: 'white' }); // left arm
    rc.line(personX, personY + 20, personX + 10, personY + 25, { stroke: 'white' }); // right arm
    rc.line(personX, personY + 40, personX - 10, personY + 55, { stroke: 'white' }); // left leg
    rc.line(personX, personY + 40, personX + 10, personY + 55, { stroke: 'white' }); // right leg

    // person on ground 
    const giverX = 290;
    const giverY = 160; 
    rc.circle(giverX, giverY, 15, { fill: 'white', stroke: 'white' }); // head
    rc.line(giverX, giverY + 7.5, giverX, giverY + 40, { stroke: 'white' }); // body
    rc.rectangle(giverX - 45, giverY, blockSize, blockSize, { stroke: 'white' }); // block
    rc.line(giverX, giverY + 20, giverX - 15, giverY + 15, { stroke: 'white' }); // arm
    rc.line(giverX, giverY + 40, giverX - 10, giverY + 55, { stroke: 'white' });
    rc.line(giverX, giverY + 40, giverX + 10, giverY + 55, { stroke: 'white' });
  }, [width, height]);

  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default LadderScene;