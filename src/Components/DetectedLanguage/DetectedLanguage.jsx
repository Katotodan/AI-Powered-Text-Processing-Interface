import React, {useEffect, useState} from 'react'

export const DetectedLanguage = ({text}) => {
    const [languageDetected, setLanguageDetected] = useState("")
    let detector;

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

    const getDetectedLanguage = async (inputtext)=>{
        const results = await detector.detect(inputtext);
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

    useEffect(()=>{
        const updateLanguage = async() =>{
            await initializedLanguageDetector()
            setLanguageDetected(await getDetectedLanguage(text))
        }
        updateLanguage()
        
    }, [text])
      
  return (
      <p>Detected language: <strong>{languageDetected}</strong></p>
  )
}
