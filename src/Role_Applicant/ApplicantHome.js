import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button"

function ApplicantHome() {
  const [externalId, setExternalId] = useState(0);

  const getClientByExternalId = () => {}

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col-sm-12">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Client External ID"
              aria-label="Client External ID"
              aria-describedby="basic-addon2"
              onChange={(ev) => {
                setExternalId(ev.target.value);
              }}
            />
            <Button
              onClick={getClientByExternalId}
              variant="outline-secondary"
              id="button-addon2"
            >
              Search
            </Button>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

export default ApplicantHome;
