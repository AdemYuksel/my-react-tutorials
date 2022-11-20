import { useState, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
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
              <FaMapMarkerAlt type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://maps.google.com?q=' + val.address.geo.lat + "," + val.address.geo.lng, '_blank');
                }} />
            ]
          ))
        }
      />
    </div>
  )
}

export default App
