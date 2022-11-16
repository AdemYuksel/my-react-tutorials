import { useState, useEffect } from 'react'
import './App.css'
import Table from './components/Table/Table'

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://jsonplaceholder.typicode.com/users"
        )
      ).json();
      setState(data);
    };
    dataFetch();
  }, []);



  return (
    <div className="App">
      <Table
        headColumn={["3", "4", "1"]}
        head={["User Information", "Address", "Map"]}
        subhead={["Name", "Username", "E-mail", "Street", "Suite", "City", "Zip Code", "Location"]}
        body={
          state.map((val) => (
            [
              val.name,
              val.username,
              val.email,
              val.address.street,
              val.address.suite,
              val.address.city,
              val.address.zipcode,
              val.address.geo.lat + ", " + val.address.geo.lng,
            ]
          ))
        }
      />
    </div>
  )
}

export default App
