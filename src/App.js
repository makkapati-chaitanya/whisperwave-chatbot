import { useState } from "react";


const App =() => {
  const [error, setError] = useState("")
  return (
    <div className="app">
      <section className="search-section">
        <p>What do you want now?
          <button className="suprise">Suprise me</button>
        </p>
        <div className="input-container">
          <input
            value ={""}
            placeholder="When is sivarathri?"
            onChange={""}
          />
          {!error &&<button>Ask me</button>}
          {error &&<button>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
          <div key={""} >
            <p className="answer"></p>

          </div>
        
        </div>

      </section>
    
    </div>
  );
}

export default App
