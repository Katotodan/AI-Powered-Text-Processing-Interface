import React, {useState} from 'react'
import eventBus from '../../eventBus'

export const TranslateSelect = ({text, currentLanguage}) => {
    const [selectedOption, setSelectedOption] = useState("")
    let translator
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const translate = async(e) =>{
        e.preventDefault()
        try {
            if ('ai' in window && 'translator' in window.ai) {
                // The Translator API is supported.
                const translatorCapabilities = await window.ai.translator.capabilities()
                
                translatorCapabilities.languagePairAvailable(currentLanguage, selectedOption)
                
                eventBus.emit("loader");
                if(translatorCapabilities.available === "no"){
                    throw new Error("Translator not supported from here")
                }else if(translatorCapabilities.available === "readily"){    
                    translator = await window.ai.translator.create({
                        sourceLanguage: currentLanguage,
                        targetLanguage: selectedOption,
                    })
                }else{
                    translator = await window.ai.translator.create({
                        sourceLanguage: currentLanguage,
                        targetLanguage: selectedOption,
                        monitor(m) {
                          m.addEventListener('downloadprogress', (e) => {
                            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                          });
                        },
                    });
                }
                const result = await translator.translate(text)
                eventBus.emit("transcript", { message: result });
            }
        } catch (error) {
            console.log(error);
            eventBus.emit("error", { message: error.message });
            
        }
        
    }
  return (
    <form onSubmit={translate}>
        <label htmlFor="select" aria-label='Select a language to translate into'>Select a language to translate into</label>
        <select name="" id="select" required value={selectedOption} onChange={handleChange} role='Select'>
            <option value="" ></option>
            <option value="en" aria-label='English'>English</option>
            <option value="pt" aria-label='Portuguese'>Portuguese</option>
            <option value="es" aria-label='Spanish'>Spanish</option>
            <option value="ru" aria-label='Russian'>Russian</option>
            <option value="tr" aria-label='Turkish'>Turkish</option>
            <option value="fr" aria-label='French'>French</option>
        </select>
        <button className='translate' role='button' aria-label='Translate'>Translate</button>
        {/* Start working on transmiting the trans and error handling */}

    </form>
  )
}
