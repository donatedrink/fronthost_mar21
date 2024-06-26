import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Table, Modal } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector } from "react-redux";

function Checklist() {
  const { serverIP } = useSelector((store) => store.allsettings);
  const { chktypeid } = useParams();
  const [chklist, setChklist] = useState([]);
  const [chklistType, setChklistType] = useState([]);
  const [name, setName] = useState("");
  const [amName, setAmName] = useState("");

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [targetObj, setTargetObj] = useState({});

  useEffect(() => {
    getChecklist();
    getChecklistType();
  }, []);

  const getChecklist = () => {
    axios
      .get(`${serverIP}checklist/checklists`)
      .then(function (response) {
        console.log(response);
        setChklist(response.data.filter((x) => x.parent == chktypeid));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getChecklistType = () => {
    axios
      .get(`${serverIP}checklist_type/checklisttypes/${chktypeid}`)
      .then(function (response) {
        console.log(response);
        setChklistType(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveCheckList = () => {
    axios
      .post(`${serverIP}checklist/checklists/`, {
        enName: name,
        amName: amName,
        isMandatory: true,
        parent: chktypeid,
      })
      .then((res) => {
        console.log(res.data);
        getChecklist();
        setModalAdd(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editCheckList = () => {
    axios
      .patch(`${serverIP}checklist/checklists/${targetObj.id}/`, {
        enName: name,
        amName: amName,
      })
      .then((res) => {
        console.log(res.data);
        getChecklist();
        setModalEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteCheckList = () => {
    axios
      .delete(`${serverIP}checklist/checklists/${targetObj.id}`)
      .then((res) => {
        console.log(res.data);
        getChecklist();
        setModalDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {/* Modals Start  */}
      {/* Modal ADD Start  */}
      <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <div style={{ fontSize: "bold" }}>ምድብ</div>
              <div>{chklistType.amName}</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">ስም </InputGroup.Text>
            <Form.Control
              placeholder="ስም"
              aria-describedby="basic-addon1"
              onChange={(e) => setAmName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name </InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveCheckList()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Add End  */}

      {/* Modal Edit Start  */}
      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "orange" }}> Edit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">ስም </InputGroup.Text>
            <Form.Control
              placeholder="ስም"
              aria-describedby="basic-addon1"
              value={amName}
              onChange={(e) => setAmName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name </InputGroup.Text>
            <Form.Control
              placeholder="name"
              aria-describedby="basic-addon1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => editCheckList()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Edit End  */}

      {/* Modal Delete Start  */}
      <Modal show={modalDelete} onHide={() => setModalDelete(false)}>
        <Modal.Header style={{ color: "red" }} closeButton>
          <Modal.Title color="red"> Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wnt to delete <strong> {targetObj.enName} </strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteCheckList()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Delete End  */}

      {/* Modals End  */}

      <Alert variant="info">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 0,
            margin: 0,
          }}
        >
          <div>{chklistType.amName}</div>
          <div>
            <Button
              variant="primary"
              className="btn-sm"
              onClick={() => setModalAdd(true)}
            >
              Add
            </Button>
          </div>
        </div>
      </Alert>
      {chklist.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> ስም </th>
              <th> Name </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chklist.map((chk) => {
              return (
                <tr>
                  <td>{chk.id}</td>
                  <td>{chk.amName}</td>
                  <td>{chk.enName}</td>
                  <td>
                    <ButtonGroup size="sm">
                      <FaTrashAlt
                        color="red"
                        onClick={() => {
                          setModalDelete(true);
                          setTargetObj(chk);
                        }}
                      />{" "}
                      &nbsp;
                      <FaPencilAlt
                        color="orange"
                        onClick={() => {
                          setModalEdit(true);
                          setTargetObj(chk);
                          setName(chk.enName);
                          setAmName(chk.amName);
                        }}
                      />
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

export default Checklist;
