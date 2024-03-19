import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

import CustomerEdit from "./CustomerEdit"
import CustomerCreate from "./CustomerCreate";

function ApplicantHome() {
  const [externalId, setExternalId] = useState(0);
  const [activeLoanPlan, setActiveLoanPlan] = useState({});
  const [djangoUser, setDjangoUser] = useState([]);

  const toastLoanFound = () => toast.success("Loan Plan Exist!");

  const getClientByExternalId = () => {
    axios
      .get(
        `${serverIP}fineract/clientbyexternalid?entityExternalId=${Number(
          externalId
        )}`
      )
      .then((res) => {
        console.log(res.data);
        checkLoanPlan(res.data[0]?.entityAccountNo);
        searchUserOn_Django();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkLoanPlan = (entityAccountNo) => {
    axios
      .get(
        `${serverIP}fineract/allsaving?entityAccountNo=${entityAccountNo}`
      )
      .then((res) => {
        console.log("loan plan exisit");
        console.log(res.data);

        res.data.loanAccounts !== undefined && toastLoanFound();

        // Find if active loan plan is available
        setActiveLoanPlan(
          res.data.loanAccounts !== undefined
            ? res.data.loanAccounts?.find((ln) => !ln.status.closed)
            : new Object()
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchUserOn_Django = () => {
    axios
      .get(`${serverIP}customer/clientbyexternalid/${externalId}`)
      .then((res) => {
        console.log("customer in django");
        console.log(res.data);
        setDjangoUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

      <div className="row">
        <div className="col-sm-12">
          {djangoUser.length > 0 ? <CustomerEdit customer={djangoUser} /> : <CustomerCreate activeloanplan={activeLoanPlan} /> }
        </div>
      </div>
    </div>
  );
}

export default ApplicantHome;
