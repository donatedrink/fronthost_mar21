import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button, ButtonGroup, Table } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function CarManufactureYear() {
  const [myear, setMyear] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [targetRecord, setTargetRecord] = useState([]);
  const [range, setRange] = useState("");
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    getManufactureYear();
  }, []);

  const getManufactureYear = () => {
    axios
      .get(`http://localhost:8000/car_manufacturer/carmanufacture`)
      .then(function (response) {
        console.log(response);
        setMyear(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveManufactureYear = () => {
    console.log("save");
    setModalAdd(false);
    axios
      .post(`http://localhost:8000/car_manufacturer/carmanufacture`, {
        yearRange: range,
        multiplierRatio: percent,
      })
      .then(function (response) {
        console.log(response);
        getManufactureYear();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editManufactureYear = () => {
    console.log("edit");
    setModalEdit(false);
  };

  const deleteManufactureYear = () => {
    axios
      .delete(
        `http://localhost:8000/car_manufacturer/carmanufacture/${targetRecord.id}`
      )
      .then((res) => {
        console.log(res.data);
        setModalDelete(false);
        getManufactureYear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {/* Modals Start  */}
      <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Range</InputGroup.Text>
            <Form.Control
              placeholder="range"
              aria-describedby="basic-addon1"
              onChange={(e) => setRange(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            <Form.Control
              placeholder="percent"
              aria-describedby="basic-addon1"
              onChange={(e) => setPercent(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveManufactureYear()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>Edit</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => editManufactureYear()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalDelete} onHide={() => setModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <strong>{targetRecord.yearRange}</strong> with percent
          <strong>{targetRecord.multiplierRatio}</strong>!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteManufactureYear()}>
            <FaTrashAlt />
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modals End  */}

      <Alert variant="info">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Manufacture Year</div>
          <Button
            variant="primary"
            style={{ margin: 0 }}
            className="btn btn-sm"
            onClick={() => setModalAdd(true)}
          >
            ADD
          </Button>
        </div>
      </Alert>
      {myear.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Range</th>
              <th> Percent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myear.map((chk) => {
              return (
                <tr>
                  <td>{chk.id}</td>
                  <td>{chk.yearRange}</td>
                  <td>{chk.multiplierRatio * 100 + " %"}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="danger"
                        onClick={() => {
                          setModalDelete(true);
                          setTargetRecord(chk);
                        }}
                      >
                        <FaTrashAlt />
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => setModalEdit(true)}
                      >
                        <FaPencilAlt />
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

export default CarManufactureYear;
