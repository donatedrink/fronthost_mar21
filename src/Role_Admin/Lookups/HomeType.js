import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button, ButtonGroup, Table } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function HomeType() {
  const [homeType, setHomeType] = useState([]);

  useEffect(() => {
    getCarModel();
  }, []);

  const getCarModel = () => {
    axios
      .get(`http://localhost:8000/home_type/hometypes`)
      .then(function (response) {
        console.log(response);
        setHomeType(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Alert variant="info"> Home Types </Alert>
      {homeType.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th> Price / Care</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {homeType.map((htype) => {
              return (
                <tr>
                  <td>{htype.id}</td>
                  <td>{htype.amName}</td>
                  <td> {htype.pricepercaremeter} </td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button variant="danger">
                        {" "}
                        <FaTrashAlt />{" "}
                      </Button>
                      <Button variant="warning">
                        {" "}
                        <FaPencilAlt />{" "}
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default HomeType;
