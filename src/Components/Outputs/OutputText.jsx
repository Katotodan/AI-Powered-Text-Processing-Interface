import React from 'react'
import "./outputText.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const OutputText = ({text}) => {
  return (
    <div>
      {text ? (
        <div className='text-container'>
            <div className="arrow-container">
                <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </div>
            <div className='inputText-container'>
                {text}
            </div>
            <div className='language-container'>
                <p>Detected language: <strong>Francais</strong></p>
                {text.length > 150 && <button className='Summarizer'>Summarizer</button>}
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
            
            <div className='translatedText-container'>
                {text}
            </div>
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
