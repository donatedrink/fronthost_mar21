import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function Estrahel() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/customer/customer`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      {user.map((uu) => {
        return <p> {uu.id} </p>;
      })}

      {/* {JSON.stringify(user)} */}
    </div>
  );
}

export default Estrahel;
