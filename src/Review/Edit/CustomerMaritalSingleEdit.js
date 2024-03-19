import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { FaEye, FaPencilAlt } from 'react-icons/fa';

import { Card, CardHeader, CardBody, CardFooter } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function CustomerMaritalSingleEdit() {
  const { customerId } = useParams();
  const [checkListId, setCheckListId] = useState(1);
  const [chklst, setChklst] = useState([]);
  const [chklstUploaded, setChklstUploaded] = useState([]);

  const [allUploadIs, setAllUploadIs] = useState([]);

  const [show, setShow] = useState(false);
  const [viewObj, setViewObj] = useState([]);

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({
    started: false,
    pc: 0
  });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getUploadedFiles();
    getNotMarriedCheckList();
  }, []);

  const getNotMarriedCheckList = () => {
    axios
      .get(`${serverIP}checklist/checklistbyparent/4`)
      .then((res) => {
        console.log(res.data);
        setChklst(res.data);
        setErr(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUploadedFiles = () => {
    axios
      .get(`${serverIP}customer/customers/${customerId}`)
      .then((res) => {
        console.log('setChklstUploaded');
        console.log(res.data);
        setChklstUploaded(res.data?.singlegeneralfiles);
        setAllUploadIs(() => res.data?.singlegeneralfiles?.map(({ checkListId }) => checkListId.id));
      })
      .then((err) => {
        console.log(err);
      });
  };

  function handleUpload() {
    console.log("checkListId => " + checkListId)
    if (!file) {
      setMsg('No File Selected');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('checkListId', checkListId);
    fd.append('parent', customerId);
    fd.append('fileType', file.type);
    fd.append('fileUrl', file);

    setMsg('Uploading .... ');
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post('${serverIP}customer_single/custommersingle/', fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: progressEvent.progress * 100 };
          });
        },
        headers: {
          'Custom-Header': 'value'
        }
      })
      .then((res) => {
        setErr(false);
        setMsg('Upload Successful');
        console.log(res.data);
        getUploadedFiles();
      })
      .catch((err) => {
        setMsg('Upload Failed');
        console.log(err);
        setErr(true);
      });
  }

  const handleEdit = () => {
    console.log('Edit called');
  };

  const handleClose = () => setShow(false);

  return (
    <div className='container'>
      {/* Modal Start  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`http://localhost:8000` + viewObj.fileUrl} style={{ width: '100%', height: '100%' }} />
        </Modal.Body>
      </Modal>
      {/* Modal End  */}
      <Card>
        <CardHeader> File Upload Form</CardHeader>
        <CardBody>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setCheckListId(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option> Select Check List</option>
            {/* allUploadIs setChklstFiltered(() => chklst.filter((chk)=> !allUploadIs.includes(chk.id))); */}
            {chklst?.length > 0 &&
              chklst.map((chk) => {
                return !allUploadIs?.includes(chk.id) && <option key={chk.id} value={chk.id}> {chk.enName} </option>;
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
        <CardFooter>
          <div>
            {progress.started && (
              // <progress className="form-control" max="100" value={progress.pc}></progress>
              <ProgressBar variant={err ? 'danger' : 'primary'} now={progress.pc} />
            )}
          </div>
          <div>{msg && <span> {msg} </span>}</div>
        </CardFooter>
      </Card>

      <Table striped bordered hover style={{ margin: 1 }}>
        <thead>
          <tr>
            <th> File Name </th>
            <th> Status </th>
            <th> View </th>
          </tr>
        </thead>
        <tbody>
          {chklstUploaded?.length > 0 &&
            chklstUploaded.map((upload) => {
              return (
                <tr>
                  <td> {upload.checkListId?.enName} </td>
                  <td> </td>
                  <td>
                    <FaEye
                      onClick={() => {
                        setViewObj(upload);
                        setShow(true);
                      }}
                    />
                    &nbsp;&nbsp;
                    <FaPencilAlt onClick={() => handleEdit()} style={{ color: 'orange' }} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomerMaritalSingleEdit;
