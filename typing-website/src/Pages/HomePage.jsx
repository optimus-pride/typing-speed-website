import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Footer from "../Components/Footer";
import TypingBox from "../Components/TypingBox";
import { useTheme } from "../Context/ThemeContext";
import { GlobalStyles } from "../Styles/global";
import Header from "../Components/Header";

import { generate as randomWords } from 'random-words';

const HomePage = () => {
  
    const words = randomWords(100);

  return (
   
      <div className="canvas">
        <Header/>
        <TypingBox words={words}/>
        <Footer/>
      </div>
  );
}

export default HomePage