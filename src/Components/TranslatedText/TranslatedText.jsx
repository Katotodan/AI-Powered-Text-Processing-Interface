import React, {useEffect, useState} from 'react'
import eventBus from '../../eventBus'
import "./translatedText.css"

export const TranslatedText = ({newText}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState("")
  const [errorExist, setErrorExist] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(()=>{
    const onLoaderEvent = () =>{
      setIsLoading(true)
      setTranslatedText("")
      setErrorExist(false)
    }
    const onErrorEvent = (err) =>{
      setIsLoading(false)
      setErrorExist(true)
      setErrorMsg(err.message)
    }
    const onTranscriptEvent = (text) =>{
      setIsLoading(false)
      setTranslatedText(text.message)
    }
    eventBus.on("loader", onLoaderEvent)
    eventBus.on("error", onErrorEvent)
    eventBus.on("transcript", onTranscriptEvent)
    return ()=>{
      eventBus.off("loader", onLoaderEvent)
      eventBus.off("error", onErrorEvent)
      eventBus.off("transcript", onTranscriptEvent)
    }
  }, [])

  useEffect(()=>{
    setIsLoading(false)
    setTranslatedText("")
    setErrorExist(false)
    setErrorMsg("")
  }, [newText])
  

  return (
    <div className='translatedText'>
      {isLoading ? <p 
      className='loading-msg' aria-label='Translation has started'>
        Translating ...</p>: <p aria-label={translatedText}>{translatedText}</p> }
      {errorExist && <p className='error-msg' aria-label={errorMsg}>{errorMsg}</p>}
    </div>
  )
}