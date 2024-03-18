import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Table, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import LoanStatus from "../Common/LoanStatus";

function LoanListApplicant() {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [officers, setOfficers] = useState([]);

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [loanId, setLoanId] = useState(0);
  const [officerId, setOfficerId] = useState(0);

  useEffect(() => {
    getlpscustomers();
    setAllOfficers();
  }, []);

  const setAllOfficers = () => {
    axios
      .get(`http://localhost:8000/lpsauth/officers`)
      .then(function (response) {
        console.log(response.data);
        setOfficers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getlpscustomers = () => {
    axios
      .get(`http://localhost:8000/loan/loans`)
      .then(function (response) {
        console.log(response.data);
        setLoans(response.data);
        setFilteredLoans(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveAssignedUser = () => {
    console.log("loanId =  " + loanId);
    console.log("officerId =  " + officerId);
    axios
      .patch(`http://localhost:8000/loan/loans/${loanId}`, {
        assignedTo: officerId,
      })
      .then(function (response) {
        getlpscustomers();
        setAllOfficers();
        setModalAdd(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const editAssignedUser = () => {};

  return (
    <div className="container">
      {/* Modals Start  */}
      {/* Modal ADD Start  */}
      <Modal show={modalAdd} onHide={() => setModalAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Officer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select onChange={(e) => setOfficerId(e.target.value)}>
            <option> Select Check List</option>
            {officers?.length > 0 &&
              officers.map((off) => {
                return (
                  <option key={off.id} value={off.id}>
                    {off.first_name}
                  </option>
                );
              })}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveAssignedUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Add End  */}

      {/* Modal Edit Start  */}
      <Modal show={modalEdit} onHide={() => setModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "orange" }}> Edit </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name </InputGroup.Text>
            <Form.Control placeholder="name" aria-describedby="basic-addon1" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => editAssignedUser()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal Edit End  */}

      {/* Modals End  */}
      <div className="row">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="external ID"
            aria-describedby="basic-addon2"
            onChange={(e) =>
              setFilteredLoans(
                loans.filter((x) =>
                  x.customer.entityExternalId
                    .toString()
                    .includes(e.target.value)
                )
              )
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ExternalID</th>
                <th>Full Name</th>
                <th>Assigned To</th>
                <th>Assign</th>
                <th>Status</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => {
                return (
                  <tr>
                    <td> {loan.customer.entityExternalId} </td>
                    <td> {loan.customer.amDisplayName} </td>
                    <td> {loan.assignedTo?.first_name} </td>
                    <td style={{ textAlign: "center" }}>
                      <a
                        href={`/loanonapplicant/${loan.customer.id}/${loan.id}`}
                      >
                        {loan.approvedPrincipal}
                      </a>
                    </td>
                    <td>
                      <LoanStatus loan={loan} />
                    </td>
                    <td>
                      <a href={`/review/${loan.customer?.id}/${loan.id}`}>
                        Review
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default LoanListApplicant;
