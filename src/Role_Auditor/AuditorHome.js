import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Table, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import LoanStatus from '../Common/LoanStatus';
import { useSelector } from "react-redux";

function AuditorHome() {
  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);

  useEffect(() => {
    getlpscustomers();
  }, []);

  const getlpscustomers = () => {
    axios
      .get(`${serverIP}loan/loans/`)
      .then(function (response) {
        console.log(response.data);
        setLoans(response.data);
        setFilteredLoans(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="external ID"
            aria-describedby="basic-addon2"
            onChange={(e) =>
              setFilteredLoans(loans.filter((x) => x.customer.entityExternalId.toString().includes(e.target.value)))
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
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => {
                return (
                  <tr>
                    <td> {loan.customer.entityExternalId} </td>
                    <td> {loan.customer.amDisplayName} </td>
                    <td> {loan.assignedTo?.first_name} </td>
                    <td style={{ textAlign: 'center' }}>
                      <a href={`/loanonauditor/${loan.customer?.id}/${loan.id}`}>{loan.approvedPrincipal?.toLocaleString()}</a>
                    </td>
                    <td> <LoanStatus loan={loan} /> </td>
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


export default AuditorHome