import React, {useRef, useEffect, useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import "./inputText.css"

export const InputText = ({updateText}) => {
    const textareaRef = useRef(null)
    const [textareaValue, setTextareaValue] = useState("")

    const calculateLineHeight = (element) => {
        // Create a single-line div to measure
        const measureDiv = document.createElement('div');
        measureDiv.style.cssText = window.getComputedStyle(element).cssText;
        measureDiv.style.height = 'auto';
        measureDiv.style.position = 'absolute';
        measureDiv.style.visibility = 'hidden';
        measureDiv.style.whiteSpace = 'nowrap';
        measureDiv.textContent = 'A'; // Single line of text
        
        // Add to DOM, measure, then remove
        document.body.appendChild(measureDiv);
        const height = measureDiv.offsetHeight;
        document.body.removeChild(measureDiv);
        
        return height;
      };
    const adjustHeight = () =>{
        const textarea = textareaRef.current;
        if(!textarea) return;

        setTextareaValue(textarea.value)
        // Reset height to auto to get the correct scroll height
        textarea.style.height = 'auto'
        // Calculate line height from computed styles
        const lineHeight = calculateLineHeight(textarea)
        const maxHeight = lineHeight * 5; // 5 rows
    
        // Set new height based on scrollHeight, but cap at maxHeight
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = `${newHeight}px`;
        
    }
    useEffect(() => {
      // Set initial height
      adjustHeight()
    }, []);
    const handleSubmit = () =>{
      updateText(textareaValue)
      setTextareaValue("")
      textareaRef.current.value = ""
      adjustHeight()
    }

  return (
    <div className="textarea-container">
        <textarea 
            ref={textareaRef}
            value={textareaValue}
            onChange={adjustHeight}
            aria-label='Enter text to process here'
          />
        <button onClick={handleSubmit} role='button' aria-label='Send text'>
            <SendIcon></SendIcon>
        </button>
        
      
    </div>
  )
}
