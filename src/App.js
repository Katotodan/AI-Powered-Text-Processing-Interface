import React, {useEffect} from 'react';
import './App.css';
import { InputText } from './Components/Inputs/InputText';
import OutputText from './Components/Outputs/OutputText';

function App() {
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

  const check = async () =>{
    if ('ai' in window && 'summarizer' in window.ai) {
      // The Summarizer API is supported.
      console.log("Summarizer api is supported")
      const value = await window.ai.summarizer.capabilities()
      console.log(value);
    }else{
      console.log("Summarizer not supported");
      
    }
  }
  check()

  
  
  return (
    <div className="App">
      <h2>Welcome to Text Processing App</h2>
      <OutputText text="Here is some text to translate Here is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translate Here is some text to translate Here is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translate Here is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translateHere is some text to translate"></OutputText>
      <InputText></InputText>
      
    </div>
  );
}

export default App;
