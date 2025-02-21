import React, {useEffect, useState} from 'react';
import './App.css';
import { InputText } from './Components/Inputs/InputText';
import OutputText from './Components/Outputs/OutputText';
import { TranslatedText } from './Components/TranslatedText/TranslatedText';

function App() {
  const [inputText, setInputText] = useState("")
  const [textToBeTranslated, setTextToBeTranslated] = useState("")
  const [languageDetectorModel, setLanguageDetectorModel] = useState(null)

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

  useEffect(async()=>{
    try {
      if ('ai' in window && 'languageDetector' in window.ai){ 
        // The Language Detector API is available.
        const languageDetectorCapabilities = await window.ai.languageDetector.capabilities();
        const canDetect = languageDetectorCapabilities.capabilities;
        if (canDetect === 'no') {
          // The language detector isn't usable.
          throw new Error("Language Detector not supported")
        }else if(canDetect === 'readily'){
          // The language detector can immediately be used.
          setLanguageDetectorModel(await window.ai.languageDetector.create())
        } else {
          // The language detector can be used after model download.
          setLanguageDetectorModel(await window.ai.languageDetector.create({
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          }))
          await languageDetectorModel.ready;
        }
  
      }else{
        throw new Error("Language Detector not supported")
      }
    } catch (error) {
      console.log(error);
    }
    

  }, [])

  // const check = async () =>{
  //   if ('ai' in window && 'summarizer' in window.ai) {
  //     // The Summarizer API is supported.
  //     console.log("Summarizer api is supported")
  //     const value = await window.ai.summarizer.capabilities()
  //     console.log(value);
  //   }else{
  //     console.log("Summarizer not supported");
      
  //   }
  // }
  // check()

  const updateText = (e)=>{
    setInputText(e)
  }

  
  
  return (
    <div className="App">
      <h2>Welcome to Text Processing App</h2>
      <OutputText text={inputText} languageDetectorModel={languageDetectorModel}></OutputText>
      <TranslatedText textToBeTranslated={textToBeTranslated} inputLanguage ="" outputLanguage =""/>
      <InputText updateText={updateText}></InputText>
      
    </div>
  );
}

export default App;
