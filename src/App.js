import { useState } from "react";


const App =() => {
  const [error, setError] = useState("")
  const[value,setValue] = useState("")
  const [chatHistory, setChatHistory] = useState([])
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
    <div className="app">
        <p>What do you want now?
          <button className="suprise" onClick={suprise} disabled={!chatHistory}>Suprise me</button>
        </p>
        <div className="input-container">
          <input
            value ={value}
            placeholder="When is sivarathri?"
            onChange={(e) => setValue(e.target.value)}
          />
          {!error &&<button onClick={getResponse}>Ask me</button>}
          {error &&<button onClick={clear}>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
         {chatHistory.map((chatItem, _index) => <div key={_index} >
            <p className="answer">{chatItem.role}:{chatItem.parts}</p>

          </div>)}
        
        </div>

    
    </div>
  );
}

export default App
