import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";

import CustomerLoanView from "../Review/Views/CustomerLoanView";
import CustomerProfileView from "../Review/Views/CustomerProfileView";
import CollateralHomeView from "../Review/Views/CollateralHomeView";
import CollateralCarView from "../Review/Views/CollateralCarView";

import CustomerSingleView from "../Review/Views/CustomerSingleView";
import CustomerMarriedView from "../Review/Views/CustomerMarriedView";

import { ToastContainer, toast } from "react-toastify";
import { FaTelegram } from "react-icons/fa";

function LoanOnApplicant() {
  const { data } = useSelector((store) => store.customer);
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [modalToOfficer, setModalToOfficer] = useState(false);

  useEffect(() => {
    getCustomer();
    getLoan();
    console.log("userId start");
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

  const sendToOfficer = () => {
    axios
      .patch(`http://localhost:8000/loan/loans/${loanId}/`, {
        // toho: true,
        to_o: true,
      })
      .then((res) => {
        console.log(res.data);
        setModalToOfficer(false);
        toast.success("Sucessfully Approved");
        getLoan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {/* Modal Edit Start  */}
      <Modal show={modalToOfficer} onHide={() => setModalToOfficer(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "orange" }}>Send To Officer</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => sendToOfficer()}>
            <FaTelegram /> Send To Officer
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Edit End  */}

      <ToastContainer />
      <div className="row">
        <div className="col-sm-12">
          <Alert
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <b>{customer.amDisplayName}</b>
            </div>
            <div>
              {/* <a href={`/review/${loanId}`}>REVIEW</a> &nbsp;*/}
              {loan.to_o ? (
                <>APPROVED</>
              ) : (
                <Button
                  onClick={() => setModalToOfficer(true)}
                  className="btn btn-sm"
                >
                  <FaTelegram /> To Officer
                </Button>
              )}
            </div>
          </Alert>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8">
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="1">
              <Accordion.Header>የተበዳሪ ሙሉ መረጃ

              <a href={`/customerprofileedit/${customerId}`}>Edit</a>

              </Accordion.Header>
              <Accordion.Body>
                <CustomerProfileView customer={customer} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              {loan.isMarried ? (
                <>
                  <Accordion.Header>
                    የተበዳሪ (የትዳር ሁኔታ) ያገባ ዶክመንቶች
                    <a href={`/marriedcustomeredit/${customerId}`}>
                      Edit
                    </a>
                  </Accordion.Header>
                  <Accordion.Body>
                    <CustomerMarriedView
                      customer={customer}
                      marriedgeneralfiles={customer.marriedgeneralfiles}
                    />
                  </Accordion.Body>
                </>
              ) : (
                <>
                  <Accordion.Header>
                    የተበዳሪ (የትዳር ሁኔታ) ያላገባ ዶክመንቶች
                    <a href={`/singlecustomeredit/${customerId}`}>
                      Edit
                    </a>
                  </Accordion.Header>
                  <Accordion.Body>
                    <CustomerSingleView
                      customer={customer}
                      singlegeneralfiles={customer.singlegeneralfiles}
                    />
                  </Accordion.Body>
                </>
              )}
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>የብድር መረጃ</div>

                <a href={`/customerloanedit/${customerId}/${loanId}`}>Edit</a>
              </Accordion.Header>
              <Accordion.Body>
                <CustomerLoanView loan={loan} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  alignItems: "space-between",
                }}
              >
                <div>መያዣ</div>
                {!loan.to_o && (
                  <div>
                    <a href={`/collaterals/${loanId}`}>Edit</a>
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body>
                <CollateralCarView collateralcar={loan.collateralcar} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="col-sm-4">
          {loan.loancomment?.length > 0 && (
            <ListGroup style={{ height: 300, overflowY: "auto" }}>
              {loan.loancomment.map((lcmnt) => {
                return (
                  <ListGroup.Item key={lcmnt.id} as="li">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{lcmnt.comment}</div>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {lcmnt.commentedBy?.first_name}
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanOnApplicant;
