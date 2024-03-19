import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'react-bootstrap';
// import EtCurrency from "../../common/modules/currency";
import ListGroup from 'react-bootstrap/ListGroup';

import EtCurrency from '../../Common/modules/currency';
const numbertoword = require('multi_language_number_to_word');

function CustomerLoanEdit(props) {
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loanOnLps, setLoanOnLps] = useState([]);

  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [prcntLifeInsurance, setPrcntLifeInsurance] = useState(0);
  const [prcntServiceCharge, setPrcntServiceCharge] = useState(0);
  const [approvedPrincipal, setApprovedPrincipal] = useState(0);

  const [schFromLoan, setSchFromLoan] = useState(0);
  const [serviceChargeExtra, setServiceChargeExtra] = useState(0);
  const [isIincluded, setIsIncluded] = useState(0);

  const [totalSaving, setTotalSaving] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const [schExtrapay, setSchExtrapay] = useState(0);

  useEffect(() => {
    getLoan();
    getCustomer();
    console.log('userId start');
  }, []);

  const getLoan = () => {
    axios
      .get(`http://localhost:8000/loan/loans/${loanId}`)
      .then((res) => {
        console.log('Loan res.data');
        console.log(res.data);
        setLoanOnLps(res.data);
        setApprovedPrincipal(res.data?.approvedPrincipal);
        setPrcntLifeInsurance(res.data?.prcntLifeInsurance);
        setPrcntServiceCharge(res.data?.prcntServiceCharge);
        setTotalShares(res.data?.totalShares);
        setTotalSaving(res.data?.totalSaving);

        setMultiplier(res.data?.multiplier);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSchExtrapay(() => {
      if (isIincluded) {
        calculateAfterAddingToCredit();
      } else {
        calculateFromCredit();
      }
    });
  }, [multiplier, prcntServiceCharge, prcntLifeInsurance, isIincluded]);

  const calculateAfterAddingToCredit = () => {
    const prct = (prcntLifeInsurance + prcntServiceCharge) / 100;
    let schpay = multiplier * totalSaving * prct + 5;
    console.log(schpay);

    let addeLoan = 0;

    while (schpay >= 0.1) {
      schpay = schpay * prct;
      addeLoan += schpay;
    }
    // setLoan((multiplier * totalSaving + addeLoan + multiplier * totalSaving * (prcntLifeInsurance + prcntServiceCharge) + 5).toFixed(2));
    setApprovedPrincipal(multiplier * totalSaving);
    setServiceChargeExtra(addeLoan.toFixed(2));
  };

  const calculateFromCredit = () => {
    const prct = (prcntLifeInsurance + prcntServiceCharge) / 100;
    setSchFromLoan(multiplier * totalSaving * prct + 5);
    setApprovedPrincipal(multiplier * totalSaving * (1 - prct) - 5);
    // setLoan((multiplier * totalSaving).toFixed(2));
    // setSchExtrapay(0);
    setServiceChargeExtra(0);
  };

  const getCustomer = () => {
    axios
      .get(`http://localhost:8000/customer/customers/${customerId}`)
      .then((res) => {
        console.log('customer');
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        {Object.keys(customer).length > 0 ? (
          <>
            <ListGroup>
              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <div>Full Name: {' ' + customer.amDisplayName}</div>
                <div>External ID: {' ' + customer.entityExternalId}</div>
                <div>Account Number: {' ' + customer.entityAccountNo}</div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                Saving:
                {' ' + loanOnLps?.totalSaving?.toLocaleString('am-ET', EtCurrency)} &nbsp; &nbsp;
                {numbertoword.AmNumberToWord(loanOnLps?.totalSaving)}
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                Share:
                {' ' + loanOnLps?.totalShares?.toLocaleString('am-ET', EtCurrency)} &nbsp; &nbsp;
                {numbertoword.AmNumberToWord(loanOnLps?.totalShares)}
              </ListGroup.Item>
            </ListGroup>
          </>
        ) : (
          <></>
        )}
      </div>
      {/* */}

      <div style={{ paddingTop: 5 }}></div>

      <div className="row" style={{ paddingTop: 10 }}>
        {Object.keys(loanOnLps).length > 0 ? (
          <>
            <Card>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  columnGap: 5,
                  paddingBottom: 5
                }}
              >
                <div class="input-group">
                  <span class="input-group-text">Multiplier</span>
                  <input
                    class="form-control"
                    // disabled={loan?.todecisionmaker}
                    value={multiplier}
                    onChange={(e) => setMultiplier(Number(e.target.value))}
                    placeholder="Multiplier"
                  />
                </div>
                <div class="input-group">
                  <span class="input-group-text">LIS %</span>
                  <input
                    type="number"
                    value={prcntServiceCharge}
                    onChange={(e) => setPrcntServiceCharge(Number(e.target.value))}
                    class="form-control"
                    placeholder="LIS %"
                  />
                </div>
                <div class="input-group">
                  <span class="input-group-text">SCH</span>
                  <input
                    type="number"
                    value={prcntLifeInsurance}
                    onChange={(e) => setPrcntLifeInsurance(Number(e.target.value))}
                    class="form-control"
                    placeholder="SCH"
                  />
                </div>
              </div>

              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  SCH Pay: {schFromLoan?.toLocaleString('am-ET', EtCurrency)}
                  <span>{numbertoword.AmNumberToWord(schFromLoan)}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  SCH Extra: {Number(serviceChargeExtra)?.toLocaleString('am-ET', EtCurrency)}
                  <span>{numbertoword.AmNumberToWord(Number(serviceChargeExtra))}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  approvedPrincipal: {approvedPrincipal?.toLocaleString('am-ET', EtCurrency)}
                  <span>{numbertoword.AmNumberToWord(approvedPrincipal)}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  <div class="input-group">
                    <input
                      type="checkbox"
                      checked={isIincluded}
                      onChange={(e) => {
                        setIsIncluded(e.target.checked);
                      }}
                    />
                    <span> &nbsp;Include In Debt</span>
                  </div>
                  <span>
                    <Button
                      className="btn-warning btn-sm"
                      // onClick={saveChanges}
                    >
                      SAVE
                    </Button>
                  </span>
                </li>
              </ul>
            </Card>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CustomerLoanEdit;
