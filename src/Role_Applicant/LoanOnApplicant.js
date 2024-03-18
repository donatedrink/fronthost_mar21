import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  const availableCss = { backgroundColor: "red", color: "white" };
  const nullCss = { backgroundColor: "red", color: "white" };

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
        <div className="col-sm-6">
          {customer.isMarried ? (
            <>
              {customer.marriedgeneralfiles?.length > 0 ? (
                <> </>
              ) : (
                <Alert variant="danger"> Married - No Files </Alert>
              )}
            </>
          ) : (
            <>
              {customer.singlegeneralfiles?.length > 0 ? (
                <> </>
              ) : (
                <Alert variant="danger"> Single - No Files </Alert>
              )}
            </>
          )}
          <table class="table table-bordered">
            <thead>
              <tr>
                <th colspan="2">Loan Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Saving</td>
                <td>{loan.totalSaving}</td>
              </tr>
              <tr>
                <td>Total Shares</td>
                <td>{loan.totalShares}</td>
              </tr>
              <tr>
                <td>Tember </td>
                <td>{loan.tembr}</td>
              </tr>
              <tr>
                <td>Service Charge</td>
                <td>{loan.prcntServiceCharge + "%"}</td>
              </tr>
              <tr>
                <td>Life Insurance </td>
                <td>{loan.prcntLifeInsurance + "%"}</td>
              </tr>
              <tr>
                <td>Multiplier </td>
                <td>{loan.multiplier}</td>
              </tr>


              <tr>
                <td>Repayments </td>
                <td>{loan.numberOfRepayments + " Months"}</td>
              </tr>
              <tr>
                <td>Annual Interest Rate </td>
                <td>{loan.annualInterestRate}</td>
              </tr>
              <tr>
                <td>Principal </td>
                <td>{loan.approvedPrincipal}</td>
              </tr>
              
            </tbody>
          </table>
        </div>

        <div className="col-sm-6">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LoanOnApplicant;
