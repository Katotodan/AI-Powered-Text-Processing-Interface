import React, { useEffect, useRef, useState } from 'react'
import "./outputText.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OutputText = ({text, languageDetectorModel}) => {
    const [allTextArray, setAllTextArray] = useState([text])
    const [textArrayIndex, setTextArrayIndex] = useState(0)
    const [hideSummarizeBtn, setHideSummarizeBtn]  = useState(false)  
    const previousBtnRef = useRef(null) 
    const summarizeBtnRef = useRef(null)
    const [detectedLanguage, setDetectedLanguage] = useState("")

    const getDetectedLanguage = async (text)=>{
        const results = await languageDetectorModel.detect(text);
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
        return(languageMap[highProbability.lang])

    }
    useEffect(async()=>{
        setHideSummarizeBtn(false)
        setAllTextArray([text])
        setTextArrayIndex(0)
        if(text){
            setDetectedLanguage(getDetectedLanguage(text))
        }
    }, [text])
    const summarize = () =>{
        setAllTextArray([...allTextArray, text])
        setHideSummarizeBtn(true)
        setTextArrayIndex(1)
    }
    const showSummarizedText = ()=>{
        setTextArrayIndex(1)
        summarizeBtnRef.current.disabled = true;
        previousBtnRef.current.disabled = false;
    }
    const showPreviousText = ()=>{
        setTextArrayIndex(0)
        summarizeBtnRef.current.disabled = false;
        previousBtnRef.current.disabled = true;
    }
    // Working on the slide
    
  return (
    <div>
      {text ? (
        <div className='text-container'>
            <div className="arrow-container">
                {hideSummarizeBtn && (<>
                    <button 
                        title="Previous text" 
                        onClick={showPreviousText}
                        ref={previousBtnRef}
                    ><ArrowBackIosNewIcon /></button>
                    <button 
                        title="Summarized text"
                        onClick={showSummarizedText}
                        ref={summarizeBtnRef}
                    ><ArrowForwardIosIcon /></button>
                </>)}
                
            </div>
            <div className='inputText-container'>
                {allTextArray[textArrayIndex]}
            </div>
            <div className='language-container'>
                <p>Detected language: <strong>Francais</strong></p>
                {!hideSummarizeBtn && (<>
                {text.length > 150 && <button className='Summarizer' onClick={summarize}>Summarizer</button>}
                </>)}
            </div>
            <form action="">
            <label htmlFor="select">Select a language to translate into</label>
            <select name="" id="select" required>
                <option value=""></option>
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="fr">French</option>
            </select>
            <button className='translate'>Translate</button>

            </form>
        </div>
        ) : (
            <div>
                <p className='initial-p'>
                    Enter some text to start text processing!!!
                </p>
                <p className='initial-p'>📝📢📝</p>
            </div>
        
        )}
    </div>
  )
}

export default OutputText
