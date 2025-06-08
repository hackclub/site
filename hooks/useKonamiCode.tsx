
import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft', 
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export function useKonamiCode() {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const konamiCodePoem = `In the days of old, when gaming was young
A mysterious code was found among
A sequence of buttons, pressed in a row
It unlocked something special, we all know

Up, up, down, down, left, right, left, right
B, A, Start, we all have heard it's plight
In the 8-bit days, it was all the rage
And it still lives on, with time, it will never age

Konami Code, it's a legend of days gone by
It's a reminder of the classics we still try
No matter the game, no matter the system
The code will live on, and still be with them`;

    // Store the poem in console for discovery
    console.log(konamiCodePoem);
    
    const keydownHandler = (event: KeyboardEvent) => {
      // Get the key from the event
      const key = event.key;
      
      // Add the key to the sequence
      const newSequence = [...sequence, key];
      
      // If the sequence is longer than the Konami code, remove the first element
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }
      
      // Update the sequence
      setSequence(newSequence);
      
      // Check if the sequence matches the Konami code (case-insensitive comparison)
      const isKonamiCode = newSequence.length === KONAMI_CODE.length && 
                          newSequence.every((k, i) => k.toLowerCase() === KONAMI_CODE[i].toLowerCase());
      
      // If the Konami code is triggered, set the state
      if (isKonamiCode && !konamiActivated) {
        console.log('🎮 Konami Code Activated! 🎮');
        setKonamiActivated(true);
      }
    };

    // Add the event listener
    window.addEventListener('keydown', keydownHandler);
    
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [sequence, konamiActivated]);
  
  return konamiActivated;
}
