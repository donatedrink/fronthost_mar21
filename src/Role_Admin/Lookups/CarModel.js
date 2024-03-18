import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, ButtonGroup, Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function CarModel() {
  const [carModel, setCarModel] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [targetObj, setTargetObj] = useState({});

  const [enName, setEnName] = useState('');

  useEffect(() => {
    getCarModel();
  }, []);

  const getCarModel = () => {
    axios
      .get(`http://localhost:8000/car_model/cars`)
      .then(function (response) {
        console.log(response.data);
        setCarModel(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveCarModel = () => {
    console.log('save');
    setModalAdd(false);
    axios
      .post(`http://localhost:8000/car_model/cars`, {
        enName: enName
      })
      .then(function (response) {
        console.log(response);
        getCarModel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editCarModel = () => {
    axios
      .patch(`http://localhost:8000/car_model/cars/${targetObj.id}`, {
        enName: enName
      })
      .then(function (response) {
        console.log(response);
        getCarModel();
        setModalEdit(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteCarModel = () => {
    axios
      .delete(`http://localhost:8000/car_model/cars/${targetObj.id}`)
      .then((res) => {
        console.log(res.data);
        setModalDelete(false);
        getCarModel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {/* Modal Delete Start  */}
      <Modal show={modalDelete} onHide={() => setModalDelete(false)}>
        <Modal.Header style={{ color: 'red' }} closeButton>
          <Modal.Title color="red"> Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wnt to delete <strong> {targetObj.enName} </strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteCarModel()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Delete End  */}
      {/* Modals Start  */}
      <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              onChange={(e) => setEnName(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveCarModel()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ paddingLeft: 10, color: 'red' }}> {targetObj.enName} </p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              onChange={(e) => setEnName(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => editCarModel()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modals End  */}

      <Alert variant="info">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div> Car Model </div>
          <Button variant="primary" style={{ margin: 0 }} className="btn btn-sm" onClick={() => setModalAdd(true)}>
            ADD
          </Button>
        </div>
      </Alert>
      {carModel.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carModel.map((cmodel) => {
              return (
                <tr>
                  <td>{cmodel.id}</td>
                  <td>{cmodel.enName}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button variant="danger">
                        <FaTrashAlt
                          onClick={() => {
                            setModalDelete(true);
                            setTargetObj(cmodel);
                          }}
                        />
                      </Button>
                      <Button variant="warning">
                        <FaPencilAlt
                          onClick={() => {
                            setModalEdit(true);
                            setTargetObj(cmodel);
                          }}
                        />
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

export default CarModel;
