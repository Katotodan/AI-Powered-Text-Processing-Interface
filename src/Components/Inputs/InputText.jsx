import React, {useRef, useEffect} from 'react'
import SendIcon from '@mui/icons-material/Send';
import "./inputText.css"

export const InputText = () => {
    const textareaRef = useRef(null)

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
        adjustHeight();
      }, []);

  return (
    <div className="textarea-container">
        <textarea 
            ref={textareaRef}
            onChange={adjustHeight}>

        </textarea>
        <button>
            <SendIcon></SendIcon>
        </button>
        
      
    </div>
  )
}
