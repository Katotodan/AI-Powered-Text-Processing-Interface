import React, { useEffect, useRef, useState } from 'react'
import "./outputText.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetectedLanguage } from '../DetectedLanguage/DetectedLanguage';

const OutputText = ({text}) => {
    const [allTextArray, setAllTextArray] = useState([text])
    const [textArrayIndex, setTextArrayIndex] = useState(0)
    const [hideSummarizeBtn, setHideSummarizeBtn]  = useState(false)  
    const previousBtnRef = useRef(null) 
    const summarizeBtnRef = useRef(null)
    let summarizeModel;

    
    useEffect(()=>{
        setHideSummarizeBtn(false)
        setAllTextArray([text])
        setTextArrayIndex(0)
        
    }, [text])

    const initializeSummarizedModel = async() =>{
        try {
            if ('ai' in window && 'summarizer' in window.ai) {
                // The Summarizer API is supported.
                const available = (await window.ai.summarizer.capabilities()).available;
                console.log(available);
                
                if (available === 'no') {
                    // The Summarizer API isn't usable.
                    throw new Error("Text summarizer not supported")
                  }
                  if (available === 'readily') {
                    // The Summarizer API can be used immediately .
                    summarizeModel = await window.ai.summarizer.create();
                  } else {
                    // The Summarizer API can be used after the model is downloaded.
                    summarizeModel = await window.ai.summarizer.create();
                    summarizeModel.addEventListener('downloadprogress', (e) => {
                      console.log(e.loaded, e.total);
                    });
                    await summarizeModel.ready;
                  }
                  console.log("Initialization done");
                  const summary = await summarizeModel.summarize(text)
                  return summary
                  
            }else{
                throw new Error("Text summarizer not supported")
            }
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
    const summarize = async () =>{
        const summary = await initializeSummarizedModel()
        
        setAllTextArray([...allTextArray, summary])
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
                <DetectedLanguage text={text}/>
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
