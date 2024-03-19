import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import Accordion from "react-bootstrap/Accordion";

// import CustomerLoanView from '../Officer/Views/CustomerLoanView';
// import CustomerProfileView from '../Officer/Views/CustomerProfileView';
// import CollateralHomeView from '../Officer/Views/CollateralHomeView';
// import CollateralCarView from '../Officer/Views/CollateralCarView';

// import CustomerSingleView from '../Officer/Views/CustomerSingleView';
// import CustomerMarriedView from '../Officer/Views/CustomerMarriedView';

import CustomerLoanView from "../Review/Views/CustomerLoanView";
import CustomerProfileView from "../Review/Views/CustomerProfileView";
import CollateralHomeView from "../Review/Views/CollateralHomeView";
import CollateralCarView from "../Review/Views/CollateralCarView";

import CustomerSingleView from "../Review/Views/CustomerSingleView";
import CustomerMarriedView from "../Review/Views/CustomerMarriedView";

import { ToastContainer, toast } from "react-toastify";

function LoanOnAuditor() {
  const { data } = useSelector((store) => store.customer);
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [modalApprove, setModalApprove] = useState(false);

  useEffect(() => {
    getCustomer();
    getLoan();
    console.log("userId start");
  }, []);

  const getCustomer = () => {
    axios
      .get(`http://localhost:8000/customer/customer/${customerId}`)
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

  const rejectWithComment = () => {
    console.log("rejectWithComment");
    axios
      .post(`http://localhost:8000/loan_comment/loancomments/`, {
        comment: commentText,
        loan: loanId,
        commentedBy: data.id,
      })
      .then((res) => {
        console.log(res.data);
        getLoan();
        toast.success("Sucessfully Rejected!");
        setCommentText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approveLoan = () => {
    axios
      .patch(`http://localhost:8000/loan/loans/${loanId}/`, {
        // decisionmakerApproved: true,
        auditorApproved: true,
      })
      .then((res) => {
        console.log(res.data);
        setModalApprove(false);
        toast.success("Sucessfully Approved");
        getLoan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const availableCss = { backgroundColor: "red", color: "white" };
  const nullCss = { backgroundColor: "red", color: "white" };

  return (
    <div className="container">
      {/* Modal Edit Start  */}
      <Modal show={modalApprove} onHide={() => setModalApprove(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "orange" }}> Approve Loan </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to approve{" "}
          <strong> {loan.approvedPrincipal?.toLocaleString()} </strong> Loan
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => approveLoan()}>
            Approve
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
              <a href={`/review/${loanId}`}>REVIEW</a> &nbsp;
              {loan.auditorApproved ? (
                <>APPROVED</>
              ) : (
                <Button
                  onClick={() => setModalApprove(true)}
                  className="btn btn-sm"
                >
                  Approve
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
              <Accordion.Header>የተበዳሪ ሙሉ መረጃ</Accordion.Header>
              <Accordion.Body>
                <CustomerProfileView customer={customer} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                የተበዳሪ (የትዳር ሁኔታ) {" " + loan.isMarried ? "ያገባ" : "ያላገባ" + " "}{" "}
                ዶክመንቶች
              </Accordion.Header>
              <Accordion.Body>
                {loan.isMarried ? (
                  <>
                    <Accordion.Header>
                      የተበዳሪ (የትዳር ሁኔታ) ያገባ ዶክመንቶች
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
                    </Accordion.Header>
                    <Accordion.Body>
                      <CustomerSingleView
                        customer={customer}
                        singlegeneralfiles={customer.singlegeneralfiles}
                      />
                    </Accordion.Body>
                  </>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>የብድር መረጃ</Accordion.Header>
              <Accordion.Body>
                <CustomerLoanView loan={loan} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header
                style={loan.collateralcar?.length > 0 ? availableCss : nullCss}
              >
                የመኪና መያዣ
              </Accordion.Header>
              <Accordion.Body>
                <CollateralCarView collateralcar={loan.collateralcar} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>የቤት መያዣ</Accordion.Header>
              <Accordion.Body>
                <CollateralHomeView collateralhome={loan.collateralhome} />
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
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label> Comment </Form.Label>
              <Form.Control
                as="textarea"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Enter comment"
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button className="btn btn-sm" onClick={rejectWithComment}>
                Reject With Comment
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoanOnAuditor;
