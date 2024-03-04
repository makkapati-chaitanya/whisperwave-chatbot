import ReactHtmlParser from 'react-html-parser';
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ChatApp.css';


const ChatApp =() => {
    const [error, setError] = useState("")
    const[value,setValue] = useState("")
    const [chatHistory, setChatHistory] = useState([])
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const supriseOptions = [
      'what is height of statue of liberty ?',
      'who is president of INDIA?',
      'who is srk?'
    ]
    const suprise = () =>{
      const randomValue = supriseOptions[Math.floor(Math.random() *supriseOptions.length)]
      setValue(randomValue)
      
    }
  
    const getResponse = async () => {
      if(!value) {
       setError("Error! Please ask a question")
       return 
      }
      try{
  
        const options = {
          method : 'POST',
          body: JSON.stringify({
            history: chatHistory,
            message: value
          }),
          headers:{
            'content-Type' : 'application/json'
  
          }
        }
  
        const response = await fetch('http://localhost:3000/gemini',options)
        const data = await response.text()
        console.log(data)
        setChatHistory(oldChatHistory => [...oldChatHistory, {
          role:"user",
          parts: value
        },
        {
          role:"model",
          parts: data
        }])
        setValue("")
  
      }
      catch(error){
        console.error(error)
        setError("something went wrong! please try again later.")
      }
    }
  
    const clear =() => {
      setValue("")
      setError("")
      setChatHistory([])
    }
  
    return (
        <div className="chat-container">
          <div className="chat-history">
            {chatHistory.map((chatItem, index) => (
              <div key={index} className={`chat-message ${chatItem.role}`}>
                <p>{chatItem.role}: {chatItem.parts}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input">
            <input
              value={value}
              placeholder="Ask me anything..."
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={getResponse}>Send</button>
          </div>
          {error && <div className="chat-error">{error}</div>}
      </div>
      
    )
  }

  export default ChatApp;