import React, {useEffect, useState} from 'react';
import './App.css';
import { InputText } from './Components/Inputs/InputText';
import OutputText from './Components/Outputs/OutputText';
import { TranslatedText } from './Components/TranslatedText/TranslatedText';
import eventBus from './eventBus';

function App() {
  const [inputText, setInputText] = useState("")
  const [languageNotFound, setLanguageNotFound] = useState(false)
  

  useEffect(()=>{
    const otMeta = document.createElement('meta');
    otMeta.httpEquiv = 'origin-trial';
    otMeta.content = process.env.REACT_APP_SAMARIZER_TOKEN;
    document.head.append(otMeta);
    // Adding the translator origin trial tokken
    const otMeta2 = document.createElement('meta');
    otMeta2.httpEquiv = 'origin-trial';
    otMeta2.content = process.env.REACT_APP_TRANSLATOR_TOKEN ;
    document.head.append(otMeta2);
  }, [])

  useEffect(()=>{
    const onDectetingLanguageFailure = (err) =>{
      setLanguageNotFound(true)
    }
    eventBus.on("langugeDetectorError", onDectetingLanguageFailure)

    return ()=>{
      eventBus.off("langugeDetectorError", onDectetingLanguageFailure)
    }
  }, [])



  const updateText =async (e)=>{
    setInputText(e)
    setLanguageNotFound(false)
  }
  
  return (
    <div className="App">
      <h2 aria-label="Welcome to Text Processing App">Welcome to Text Processing App</h2>
      <OutputText text={inputText}></OutputText>
      <TranslatedText newText={inputText}/>
      {languageNotFound && <p aria-label="Input language not detected">Input language not detected</p>}
      <InputText updateText={updateText}></InputText>
      
    </div>
  );
}

export default App;
