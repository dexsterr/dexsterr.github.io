
import { useState, useEffect } from 'react';

const TypingAnimation = () => {
  const texts = ["Cybersecurity Junior", "Student", "Aspiring Hacker"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {

      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 100);
      } else {
    
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    } else {
 
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50);
      } else {
   
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentTextIndex, texts]);

  return (
    <span className="text-green-400 glow-text">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingAnimation;
