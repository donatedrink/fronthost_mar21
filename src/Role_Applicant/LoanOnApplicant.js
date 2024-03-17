import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';

import CustomerLoanView from '../Officer/Views/CustomerLoanView';
import CustomerProfileView from '../Officer/Views/CustomerProfileView';
import CollateralHomeView from '../Officer/Views/CollateralHomeView';
import CollateralCarView from '../Officer/Views/CollateralCarView';

import CustomerMarriedView from '../Officer/Views/CustomerMarriedView';
import CustomerSingleView from '../Officer/Views/CustomerSingleView';

function LoanOnApplicant() {
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

  const availableCss = { backgroundColor: 'red', color: 'white' };
  const nullCss = { backgroundColor: 'red', color: 'white' };

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <Alert>
           <b>{customer.amDisplayName}</b>
        </Alert>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-8">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>የተበዳሪ ሙሉ መረጃ</Accordion.Header>
            <Accordion.Body>
              <CustomerProfileView customer={customer} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            {loan.isMarried ? (
              <>
                <Accordion.Header>የተበዳሪ (የትዳር ሁኔታ) ያገባ ዶክመንቶች</Accordion.Header>
                <Accordion.Body>
                  <CustomerMarriedView customer={customer} marriedgeneralfiles={customer.marriedgeneralfiles} />
                </Accordion.Body>
              </>
            ) : (
              <>
                <Accordion.Header>የተበዳሪ (የትዳር ሁኔታ) ያላገባ ዶክመንቶች</Accordion.Header>
                <Accordion.Body>
                  <CustomerSingleView customer={customer} singlegeneralfiles={customer.singlegeneralfiles} />
                </Accordion.Body>
              </>
            )}
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>የብድር መረጃ</Accordion.Header>
            <Accordion.Body>
              <CustomerLoanView loan={loan} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header style={loan.collateralcar?.length > 0 ? availableCss : nullCss}>
              የመኪና መያዣ
            </Accordion.Header>
            <Accordion.Body>
              <CollateralCarView collateralcar={loan.collateralcar} loan={loan} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>የቤት መያዣ</Accordion.Header>
            <Accordion.Body>
              <CollateralHomeView collateralhome={loan.collateralhome} loan={loan} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="col-sm-4">
        {loan.loancomment?.length > 0 && (
          <ListGroup style={{ height: 300, overflowY: 'auto' }}>
            {loan.loancomment.map((lcmnt) => {
              return (
                <ListGroup.Item as="li">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{lcmnt.comment}</div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{lcmnt.commentedBy?.username}</div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>
    </div>
  </div>
  )
}

export default LoanOnApplicant