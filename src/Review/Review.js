import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert, Card } from "react-bootstrap";
import { FaCarAlt, FaHome, FaTrashAlt, FaUserAlt } from 'react-icons/fa';

function Review() {
  const {  serverIP, loadingFinished } = useSelector((store) => store.allsettings);
  const { data } = useSelector((store) => store.customer);
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    getCustomer();
    getLoan();
  }, []);

  const getCustomer = () => {
    axios
      .get(`${serverIP}customer/customers/${customerId}`)
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
      .get(`${serverIP}loan/loans/${loanId}`)
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
        <div className="col-sm-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th colspan="2">Loan Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Saving</td>
                <td>{loan.totalSaving?.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Shares</td>
                <td>{loan.totalShares?.toLocaleString()}</td>
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
                <td>{loan.approvedPrincipal?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th colspan="3">Collaterals</th>
              </tr>
            </thead>
            <tbody>
              {loan.collateralcar?.length > 0 ? (
                <>
                  {loan.collateralcar?.map((car) => {
                    return (
                      <tr>
                        <td> <FaCarAlt /> </td>
                        <td>{car.model.enName}</td>
                        <td>
                          {((car.insuranceValue *
                            car.manufacturedYear.multiplierRatio +
                            car.marketvalue[0]?.marketValue +
                            car.garageReport[0]?.garageValue) /
                            3)?.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <></>
              )}

             
            </tbody>
          </table>

          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>Recommendations</Card.Title>
              <Card.Text>
                <Alert>GOOD</Alert>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Review;
