
import React, { useEffect, useRef } from 'react';
import rough from 'roughjs/bundled/rough.esm.js';

const Ladder = ({ width = 300, height = 400 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, width, height);

// ladder sides
rc.line(150, 20, 100, 380,{
    stroke:'grey'
}); // left
rc.line(250, 20, 200, 380, {stroke:'grey'}); // right

// ladder joints
const steps = 10;
for (let i = 0; i <= steps; i++) {
  const t = i / steps;
  const y = 50 + t * (350 - 50);

  const x1 = 150 + t * (100 - 150);
  const x2 = 250 + t * (200 - 250);

  rc.line(x1, y, x2, y, {stroke:'grey'});
}


    // person thingy
        // head
        rc.circle(150, 170, 20, {fill: 'rgb(255, 255, 255)',stroke:'white'});
        // body
        rc.line(150, 170, 150, 210, {stroke:'white'});
        // hands
        rc.line(150, 190, 130, 200, {stroke:'white'}); // left arm
        rc.line(150, 190, 170, 200, {stroke:'white'}); // right arm
        // legs
        rc.line(150, 210, 140, 230, {stroke:'white'}); // left leg
        rc.line(150, 210, 160, 230, {stroke:'white'}); // right leg

    }, [width, height]);

  return (
    <div className="flex justify-center items-center">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default Ladder;
