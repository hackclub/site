import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ModeToggle } from '../components/ModeToggle';
import { TerminalMode } from '../components/terminal/TerminalMode';
import { ClassicMode } from '../components/classic/ClassicMode';
import { useKonamiCode } from '../hooks/useKonamiCode';
import { OGHackClubUI } from '../components/easter-eggs/OGHackClubUI';
import { useToast } from '../components/ui/use-toast';

// This component uses the theme context
const HomePage = () => {
  const { mode } = useTheme();
  const { toast } = useToast();
  const konamiActivated = useKonamiCode();
  const [showOGUI, setShowOGUI] = useState(false);
  
  useEffect(() => {
    if (konamiActivated) {
      setShowOGUI(true);
      
      // Show a toast notification when Konami code is activated
      toast({
        title: "Konami Code Activated!",
        description: "Welcome back, OG Hack Club legend!",
      });
      
      // Auto-hide the OG UI after 10 seconds
      const timer = setTimeout(() => {
        setShowOGUI(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [konamiActivated, toast]);
  
  return (
    <>
      {showOGUI ? (
        <OGHackClubUI onClose={() => setShowOGUI(false)} />
      ) : (
        <>
          <ModeToggle />
          {mode === 'terminal' ? <TerminalMode /> : <ClassicMode />}
        </>
      )}
    </>
  );
};

export default HomePage;