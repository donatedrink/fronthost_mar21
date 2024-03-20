import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { FaEye, FaPencilAlt } from "react-icons/fa";

import { Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useSelector } from "react-redux";

function CarFiles(props) {
  const { serverIP } = useSelector((store) => store.allsettings);
  const [checkListId, setCheckListId] = useState(1);
  const [chklst, setChklst] = useState([]);
  const [chklstUploaded, setChklstUploaded] = useState([]);
  const [allUploadIs, setAllUploadIs] = useState([]);

  const [show, setShow] = useState(false);
  const [viewObj, setViewObj] = useState([]);
  const [collateralDetail, setCollateralDetail] = useState([]);
  const handleClose = () => setShow(false);

  const handleShow = (obj) => {
    setViewObj(obj);
    setShow(true);
  };

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({
    started: false,
    pc: 0,
  });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getAllFiles();
    getCarCollateralCheckList();
    getCollateralDetail();
  }, []);

  const getCollateralDetail = () => {
    axios
      .get(`${serverIP}collateral_car/collateralcar/${props.collateralId}`)
      .then((res) => {
        console.log(res.data);
        setCollateralDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCarCollateralCheckList = () => {
    axios
      .get(`${serverIP}checklist/checklistbyparent/6`)
      .then((res) => {
        console.log(res.data);
        setChklst(res.data);
        setErr(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllFiles = () => {
    axios
      .get(`${serverIP}collateral_car/collateralcar/${props.collateralId}`)
      .then((res) => {
        console.log(res.data);
        setChklstUploaded(res.data);
        setErr(false);
        setAllUploadIs(() =>
          res.data.carfiles.map(({ checkListId }) => checkListId)
        );
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
    fd.append("checkListId", checkListId);
    fd.append("collateralcar", props.collateralId);
    fd.append("fileType", file.type);
    fd.append("fileUrl", file);

    setMsg("Uploading .... ");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post("${serverIP}car_commonfiles/carfiles", fd, {
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
    console.log("Edit called");
  };

  return (
    <div className="container">
      {/* Modal Start  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>  </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:8000` + viewObj.fileUrl}
            style={{ width: "100%", height: "100%" }}
          />
        </Modal.Body>
      </Modal>
      {/* Modal End  */}
      <Card>
        <CardBody>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setCheckListId(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option> Select Check List</option>

            {chklst.length > 0 &&
              chklst.map((chk) => {
                return (
                  !allUploadIs.includes(chk.id) && (
                    <option value={chk.id}> {chk.enName} </option>
                  )
                );
              })}
          </Form.Select>

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

        {progress.started && (
          <CardFooter>
            <div>
              <ProgressBar
                variant={err ? "danger" : "primary"}
                now={progress.pc}
              />
            </div>
            <div>{msg && <span> {msg} </span>}</div>
          </CardFooter>
        )}
      </Card>

      <div style={{ paddingTop: 10 }}>
        <Table striped bordered hover style={{ margin: 1 }}>
          <thead>
            <tr>
              <th> File Name </th>
              <th> Status </th>
              <th> View </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(chklstUploaded).length > 0 &&
              chklstUploaded.carfiles.length > 0 &&
              chklstUploaded.carfiles.map((upload) => {
                return (
                  <tr>
                    <td>
                      {chklst.find((x) => x.id == upload.checkListId)?.enName}
                    </td>
                    <td> </td>
                    <td>
                      <FaEye onClick={() => handleShow(upload)} />
                      <FaPencilAlt
                        onClick={() => handleEdit()}
                        style={{ color: "orange" }}
                      />
                    </td>
                  </tr>
                );
              })}
            {/* {Object.keys(chklstUploaded).length > 0 && "File"} */}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CarFiles;
