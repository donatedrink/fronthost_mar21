import React from "react";
import { useParams } from "react-router-dom";
import AgreementDoc from "./AgreementDoc";
import { Alert, ListGroup, Accordion } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CoverDoc from "./CoverDoc";
import RequestFormDoc from "./RequestFormDoc";
import GuaranteeDoc from "./GuaranteeDoc";

function Reports() {
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    getCustomer();
    getLoan();
  }, []);

  const getCustomer = () => {
    axios
      .get(`http://localhost:8000/customer/customers/${customerId}`)
      .then((res) => {
        console.log("customer");
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoan = () => {
    axios
      .get(`http://localhost:8000/loan/loans/${loanId}`)
      .then((res) => {
        console.log(res.data);
        setLoan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <Alert style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <b>{customer.amDisplayName}</b>
              {" - " + customer.mobileNo}
            </div>
            <div>
              <b>{customer.gender}</b>
              <b>{customer.isMarried ? " - Married - " : " - Single - "}</b>
              <b> {customer.entityExternalId} </b>
            </div>
          </Alert>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Cover</Accordion.Header>
              <Accordion.Body>
                <CoverDoc />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header> Agreement </Accordion.Header>
              <Accordion.Body>
                <AgreementDoc />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header> Request Form </Accordion.Header>
              <Accordion.Body>
                <RequestFormDoc />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header> Guarantee </Accordion.Header>
              <Accordion.Body>
                <GuaranteeDoc />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Reports;
