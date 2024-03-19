import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button, ButtonGroup, Table } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector } from "react-redux";

function HomeType() {
  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);
  const [homeType, setHomeType] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [targetObj, setTargetObj] = useState({});

  const [enName, setEnName] = useState("");
  const [amName, setAmName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getHomeTypes();
  }, []);

  const getHomeTypes = () => {
    axios
      .get(`${serverIP}home_type/hometypes`)
      .then(function (response) {
        setHomeType(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveHomeType = () => {
    axios
      .post(`${serverIP}home_type/hometypes/`, {
        enName: enName,
        amName: amName,
        pricepercaremeter: price,
      })
      .then(function (response) {
        setModalAdd(false);
        getHomeTypes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateHomeType = () => {
    axios
      .patch(`${serverIP}home_type/hometypes/${targetObj.id}`, {
        enName: enName,
        amName: amName,
        pricepercaremeter: price,
      })
      .then(function (response) {
        setModalEdit(false);
        getHomeTypes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteHomeType = () => {
    axios
      .delete(`${serverIP}home_type/hometypes/${targetObj.id}`)
      .then(function (response) {
        setModalDelete(false);
        getHomeTypes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      {/* Modal Delete Start  */}
      <Modal show={modalDelete} onHide={() => setModalDelete(false)}>
        <Modal.Header style={{ color: "red" }} closeButton>
          <Modal.Title color="red"> Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wnt to delete <strong> {targetObj.enName} </strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteHomeType()}>
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
            <InputGroup.Text id="basic-addon1">ስም</InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              onChange={(e) => setAmName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              onChange={(e) => setEnName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
            <Form.Control
              placeholder="Price"
              aria-describedby="basic-addon1"
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveHomeType()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">ስም</InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              value={amName}
              onChange={(e) => setAmName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
            <Form.Control
              placeholder="Price"
              aria-describedby="basic-addon1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => updateHomeType()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modals End  */}

      <Alert variant="info">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div> Home Types </div>
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
                        <FaTrashAlt
                          onClick={() => {
                            setModalDelete(true);
                            setTargetObj(htype);
                          }}
                        />
                      </Button>
                      <Button variant="warning">
                        <FaPencilAlt
                          onClick={() => {
                            setModalEdit(true);
                            setTargetObj(htype);
                            setAmName(htype.amName);
                            setEnName(htype.enName);
                            setPrice(htype.pricepercaremeter);
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

export default HomeType;
