import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([
    {
      key: '',
      value: ''
    }
  ])

  useEffect(() => {
    if (items.length === 0) {
      setItems([
        { key: '', value: '' }
      ])
    }
  }, [items])

  const pasteHandle = (e, index) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    if (pastedData) {
      const arr = pastedData.split('\n').map(text => {
        if (/([\w]+)=(.+?)/.test(text)) {
          let [key, value] = text.split('=')
          let find = items.find(i => i.key === key)
          if (!find || find?.key === items[index].key) {
            return { key, value }
          } if (find) {
            return alert("Please paste different key value." + "\n" + find.key + "=" + find.value)
          }
        }
      }).filter(Boolean)
      if (arr.length > 0) {
        setItems(items => [...items.slice(0, index), ...arr, ...items.slice(index + 1)])
      }
    }
  }

  return (
    <div>
      <div className="labels">
        <label>Key</label>
        <label>Value</label>
      </div>
      {
        items.map((item, index) => (

          <div className="text-inputs">
            <input
              className="text-input"
              onPaste={e => pasteHandle(e, index)}
              onChange={e => {
                setItems(items => items.map((item, i) => {
                  if (i === index) {
                    item.key = e.target.value
                  }
                  return item
                }))
              }} placeholder="e.g. CLIENT_KEY" type="text" value={item.key} />

            <input
              className="text-input"
              onChange={e => {
                setItems(items => items.map((item, i) => {
                  if (i === index) {
                    item.value = e.target.value
                  }
                  return item
                }))

              }} type="text" value={item.value} />

            <button
              className="del-button"
              onClick={() => setItems(items => items.filter((_, key) => key !== index))}
            >x</button>
          </div>
        ))}

      <button
        className="add-item"
        onClick={() => setItems(items => [...items, {
          key: '',
          value: ''
        }])}
      >
        Add Item
      </button>

      <pre>{JSON.stringify(items, null, 2)}</pre>

      <div className="sample-data">
        <div className="title">
          Sample Data
          <button>Copy</button>
        </div>
        <div className="content">
          # This is a sample .env file for use in local development.<br />
          # Duplicate this file as .env in the root of the project<br />
          # and update the environment variables to match your<br />
          # desired config<br />
          #<br />
          # See the README for full descriptions of each of the<br />
          # available configurations.<br />

          # A PostgreSQL connection string<br />
          DATABASE_URL=postgres://localhost:5432/sample-data<br />

          # The lowest level of logs to output<br />
          LOG_LEVEL=debug<br />

          # The environment to run the application in<br />
          NODE_ENV=development<br />

          # The HTTP port to run the application on<br />
          PORT=8080<br />

          # The secret to encrypt session IDs with<br />
          SESSION_SECRET=development<br />
        </div>
      </div>
    </div>
  )
}

export default App
