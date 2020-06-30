import React, { useState, useEffect } from "react";
import axios from 'axios';

function App(){
  const [person, setPerson] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3010/')
    .then(({data}) => {
      setPerson(data[1])
    })
    .catch(err => {
      console.error(err);
    })
  }, [person._id])

  const { first, last, _id } = person;
  return (
    <h1>
      Hello {first} {last}! Your ID is {_id}
    </h1>
  )
}

export default App;
