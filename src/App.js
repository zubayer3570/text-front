import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  const [texts, setTexts] = useState([])
  const [reload, setReload] = useState({})
  const handleSend = (e) => {
    e.preventDefault()
    const input = e.target.text.value
    const text = { text: `---${input}` }
    fetch('https://secret-springs-73355.herokuapp.com/text', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(text)
    })
      .then(res => res.json())
      .then(data => {
        setReload(data)
      })
  }
  useEffect(() => {
    fetch('https://secret-springs-73355.herokuapp.com/text')
      .then(res => res.json())
      .then(data => setTexts(data))
  }, [reload])
  return (
    <div className='app'>
      <h1>Text</h1>
      <div className="text-screen">
        {
          texts?.map(text => <h2 key={text._id}>{text.text}</h2>)
        }
      </div>
      <form onSubmit={handleSend}>
        <input type="text" name="text" className='input' />
        <input type="submit" value="send" />
      </form>

    </div>
  );
}

export default App;
