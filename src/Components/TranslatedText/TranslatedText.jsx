import React from 'react'

export const TranslatedText = ({textToBeTranslated,inputLanguage, outputLanguage}) => {
  return (
    <div className='translatedText-container'>
        {textToBeTranslated}
    </div>
  )
}