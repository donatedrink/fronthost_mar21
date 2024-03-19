import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from 'react-redux';

function CarMarketValue(props) {
  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);

  const [marketValue, setMarketValue] = useState(0);

  const [show, setShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [chklstUploaded, setChklstUploaded] = useState([]);
  const [targetMarketValue, setTargetMarketValue] = useState({});

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({
    started: false,
    pc: 0,
  });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getAllFiles();
  }, []);

  const getAllFiles = () => {
    axios
      .get(
        `${serverIP}collateral_car/collateralcar/${props.collateralId}`
      )
      .then((res) => {
        console.log(res.data);
        setChklstUploaded(res.data);
        setErr(false);
      })
      .then((err) => {
        console.log(err);
      });
  };

  function handleUpload() {
    if (!file) {
      setMsg("No File Selected");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("marketValue", marketValue);
    fd.append("collateralcar", props.collateralId);
    fd.append("fileType", file.type);
    fd.append("fileUrl", file);

    setMsg("Uploading .... ");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post(`${serverIP}car_marketvalue/carmarketvalues/`, fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: progressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload Successful");
        console.log(res.data);
        setErr(false);
        getAllFiles();
      })
      .catch((err) => {
        setMsg("Upload Failed");
        console.log(err);
        setErr(true);
      });
  }

  const handleEdit = () => {
    if (!file) {
      setMsg("No File Selected");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    fd.append("marketValue", marketValue);
    fd.append("collateralcar", props.collateralId);
    fd.append("fileType", file.type);
    fd.append("fileUrl", file);

    setMsg("Uploading .... ");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .patch(`${serverIP}car_marketvalue/carmarketvalues/${targetMarketValue.id}/`, fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: progressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload Successful");
        console.log(res.data);
        setEditModal(false)
        setErr(false);
        getAllFiles();
      })
      .catch((err) => {
        setMsg("Upload Failed");
        console.log(err);
        setErr(true);
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `${serverIP}car_marketvalue/carmarketvalues/${targetMarketValue.id}`
      )
      .then((res) => {
        console.log(res.data);
        setDeleteModal(false);
        getAllFiles();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {/* Modal View Start  */}
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete {targetMarketValue.marketValue}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger btn-sm"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal View End  */}

      {/* Modal Delete Start  */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:8000` + targetMarketValue.fileUrl}
            style={{ width: "100%", height: "100%" }}
          />
        </Modal.Body>
      </Modal>
      {/* Modal Delete End  */}

      {/* Modal Edit Start  */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title variant="warning"> Edit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              Market Value
            </span>
            <input
              type="text"
              class="form-control"
              value={marketValue}
              onChange={(e) => setMarketValue(e.target.value)}
            />
          </div>
          <InputGroup style={{ paddingTop: 5 }}>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
              type="file"
              className="form-control"
            />
          </InputGroup>
          <Modal.Footer>
            <Button
              variant="warning btn-sm"
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      {/* Modal Edit End  */}

      <Card>
        <CardBody>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              Market Value
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Market Value"
              aria-label="Market Value"
              aria-describedby="basic-addon1"
              onChange={(e) => setMarketValue(e.target.value)}
            />
          </div>
          <InputGroup style={{ paddingTop: 5 }}>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
              type="file"
              className="form-control"
            />
            <Button variant="outline-primary" onClick={handleUpload}>
              Upload
            </Button>
          </InputGroup>
        </CardBody>
        <CardFooter>
          <div>
            {progress.started && (
              <ProgressBar
                variant={err ? "danger" : "primary"}
                now={progress.pc}
              />
            )}
          </div>
          <div>{msg && <span> {msg} </span>}</div>
        </CardFooter>
      </Card>

      <div style={{ paddingTop: 10 }}>
        <Table striped bordered hover style={{ margin: 1 }}>
          <thead>
            <tr>
              <th> File Name </th>
              <th> Status </th>
              <th style={{ display: "flex", justifyContent: "space-around" }}>
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(chklstUploaded).length > 0 &&
              chklstUploaded.marketvalue.length > 0 &&
              chklstUploaded.marketvalue.map((upload) => {
                return (
                  <tr>
                    <td>{upload.marketValue}</td>
                    <td> </td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <FaEye
                        onClick={() => {
                          setTargetMarketValue(upload);
                          setShow(true);
                        }}
                      />
                      <FaPencilAlt
                        onClick={() => {
                          setTargetMarketValue(upload);
                          setEditModal(true);
                          setMarketValue(upload.marketValue);
                        }}
                        style={{ color: "orange" }}
                      />
                      <FaTrashAlt
                        onClick={() => {
                          setTargetMarketValue(upload);
                          setDeleteModal(true);
                        }}
                        style={{ color: "red" }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CarMarketValue;
