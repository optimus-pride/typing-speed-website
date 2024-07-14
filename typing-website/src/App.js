//import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
//import Footer from "./Components/Footer";
//import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Context/ThemeContext.jsx";
import { GlobalStyles } from "./Styles/global.js";
//import { auth } from "./backendConfig";
//import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import UserPage from "./Pages/UserPage.jsx";
import Alert from "./Components/Alert.jsx";
import ComparePage from "./Pages/ComparePage.jsx";

function App() {

  const {theme} = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Alert/>
      <Routes>
        <Route path='/' element={<HomePage/>}   />
        <Route path='/user' element={<UserPage/>} />
        <Route path='/compare/:username' element={<ComparePage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;