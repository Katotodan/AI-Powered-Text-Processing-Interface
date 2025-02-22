import React, {useEffect, useState} from 'react';
import './App.css';
import { InputText } from './Components/Inputs/InputText';
import OutputText from './Components/Outputs/OutputText';
import { TranslatedText } from './Components/TranslatedText/TranslatedText';

function App() {
  const [inputText, setInputText] = useState("")
  const [textToBeTranslated, setTextToBeTranslated] = useState("")
  let detector;
  const [languageDetected, setLanguageDetected] = useState("")

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

  const initializedLanguageDetector = async()=>{
    try {
      if ('ai' in window && 'languageDetector' in window.ai){ 
        // The Language Detector API is available.
        const languageDetectorCapabilities = await window.ai.languageDetector.capabilities();
        const canDetect = languageDetectorCapabilities.capabilities;
        if (canDetect === 'no') {
          // The language detector isn't usable.
          throw new Error("Language Detector not supported")
        }else if(canDetect === 'readily'){
          //The language detector can immediately be used.
          detector = await window.ai.languageDetector.create()
        } else {
          //The language detector can be used after model download.
          detector = await window.ai.languageDetector.create({
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          })
          await detector.ready;
        }

      }else{
        throw new Error("Language Detector not supported")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getDetectedLanguage = async (text)=>{
    const results = await detector.detect(text);
    let highProbability = {
        "lang": "",
        "prob": 0
    }
    const languageMap = {
        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        it: "Italian",
        zh: "Chinese",
        ja: "Japanese",
        ar: "Arabic",
        ru: "Russian",
        hi: "Hindi",
        pt: "Portuguese",
        tr: "Turkish"
      };
      for (const result of results) {
          if(result.confidence > highProbability.prob){
              highProbability.lang = result.detectedLanguage
              highProbability.prob = result.confidence
          }
      }
      console.log(highProbability.lang, "Language");
      
      return(languageMap[highProbability.lang])
  
  }

  

  const updateText =async (e)=>{
    setInputText(e)
    await initializedLanguageDetector()
    setLanguageDetected(await getDetectedLanguage(e))
  }

  
  
  return (
    <div className="App">
      <h2>Welcome to Text Processing App</h2>
      <OutputText text={inputText} detectedLanguage={languageDetected}></OutputText>
      <TranslatedText textToBeTranslated={textToBeTranslated} inputLanguage ="" outputLanguage =""/>
      <InputText updateText={updateText}></InputText>
      
    </div>
  );
}

export default App;
