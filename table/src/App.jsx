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


  const dataFetch2 = async () => {

      await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Adem2'
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        
        .then(setState(json))
  };


  return (
    <div className="App">
      <Table
        searchable={true}
        head={[
          { name: 'User Information', colSpan: "3" },
          { name: 'Address', colSpan: "4" },
          { name: 'Map', colSpan: "1" },
          { name: 'Edit', colSpan: "1", rowSpan: "2" },
        ]}
        subhead={[
          { name: 'Name', sortable: true },
          { name: 'Username', sortable: true },
          { name: 'E-mail', sortable: true },
          { name: 'Street', sortable: true },
          { name: 'Suite', sortable: true },
          { name: 'City', sortable: true },
          { name: 'Zip Code', sortable: true },
          { name: 'Location', sortable: false },
        ]}
        body={state && state.map((val, key) => (
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
              }} />,
            [
              <button className="" onClick={dataFetch2}>Edit</button>,
              <button onClick={() => {
                const tmpUsers = [...state]
                tmpUsers.splice(key, 1)
                setState(tmpUsers)
              }} className="">Delete</button>
            ]
          ]))}
      />
    </div>
  )
}

export default App
