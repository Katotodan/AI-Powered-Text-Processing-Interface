import React, {useEffect, useState} from 'react';
import './App.css';
import { InputText } from './Components/Inputs/InputText';
import OutputText from './Components/Outputs/OutputText';
import { TranslatedText } from './Components/TranslatedText/TranslatedText';

function App() {
  const [inputText, setInputText] = useState("")
  const [textToBeTranslated, setTextToBeTranslated] = useState("")
  

  useEffect(()=>{
    const otMeta = document.createElement('meta');
    otMeta.httpEquiv = 'origin-trial';
    otMeta.content = process.env.REACT_APP_SAMARIZER_TOKKEN;
    document.head.append(otMeta);
    // Adding the translator origin trial tokken
    const otMeta2 = document.createElement('meta');
    otMeta2.httpEquiv = 'origin-trial';
    otMeta2.content = process.env.REACT_APP_TRANSLATOR_TOKEN ;
    document.head.append(otMeta2);
  }, [])

  const updateText =async (e)=>{
    setInputText(e)
  }
  
  return (
    <div className="App">
      <h2>Welcome to Text Processing App</h2>
      <OutputText text={inputText}></OutputText>
      <TranslatedText textToBeTranslated={textToBeTranslated} inputLanguage ="" outputLanguage =""/>
      <InputText updateText={updateText}></InputText>
      
    </div>
  );
}

export default App;
