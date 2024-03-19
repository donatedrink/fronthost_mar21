import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, ListGroup } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector } from 'react-redux';


function CollateralCarMarketValueEdit() {
  const { data } = useSelector((store) => store.customer);
  const { carId } = useParams();
  const [file, setFile] = useState(null);
  const [marketValue, setMarketValue] = useState(0);
  const [progress, setProgress] = useState({
    started: false,
    pc: 0
  });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(false);

  const [marketValues, setMarketValues] = useState([]);

  const getCarMarketValues = () => {
    axios
      .get(`${serverIP}car_marketvalue/carmarketvalues/`)
      .then((res) => {
        console.log(res.data);
        setMarketValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarMarketValues();
  }, []);

  function handleUpload() {
    if (!file) {
      setMsg('No File Selected');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
    fd.append('marketValue', marketValue);
    fd.append('collateralcar', carId);
    fd.append('fileType', file.type);
    fd.append('fileUrl', file);
    fd.append('user', data.id);

    setMsg('Uploading ... ');
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post('${serverIP}car_marketvalue/carmarketvalues/', fd, {
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
        getCarMarketValues();
        // getUploadedFiles();
      })
      .catch((err) => {
        setMsg('Upload Failed');
        console.log(err);
        setErr(true);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {marketValues?.length === 0 && (
            <Card>
              <CardHeader> File Upload Form</CardHeader>
              <CardBody>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Market Value</InputGroup.Text>
                  <Form.Control
                    placeholder="Market Value"
                    onChange={(e) => setMarketValue(e.target.value)}
                    type="number"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
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
                <div>{progress.started && <ProgressBar variant={err ? 'danger' : 'primary'} now={progress.pc} />}</div>
                <div>{msg && <span> {msg} </span>}</div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <div className="row">
        {marketValues?.length > 0 && (
          <>
            {marketValues.map((mvalue) => {
              return (
                <>
                  <div className="col-sm-9">
                    <img src={`http://localhost:8000` + mvalue.fileUrl} style={{ width: '100%', height: '80%' }} />
                  </div>
                  <div className="col-sm-3">
                  <ListGroup>
                  <ListGroup.Item className="d-flex justify-content-between align-items-start">
                      <div> Value </div>
                      <div>{mvalue.marketValue}</div>
                    </ListGroup.Item>
                  </ListGroup>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default CollateralCarMarketValueEdit;
