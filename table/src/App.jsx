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
        searchable={true}
        // headColumn={["3", "4", "1"]}
        head={[
          { name: 'User Information', colSpan: "3" },
          { name: 'Address', colSpan: "4" },
          { name: 'Map', colSpan: "1" },
        ]}
        subhead={[
          { name: 'Name', sortable: true },
          { name: 'Username', sortable: true },
          { name: 'E-mail', sortable: true },
          { name: 'Street', sortable: true },
          { name: 'Suite', sortable: true },
          { name: 'City', sortable: true },
          { name: 'Zip Code', sortable: true },
          { name: 'Location', sortable: true }
          // "Name", "Username", "E-mail", "Street", "Suite", "City", "Zip Code", "Location"
        ]}
        body={
          state.map((val) => (
            [
              val.name,
              val.username,
              val.email.toLocaleLowerCase('TR'),
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
