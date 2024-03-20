import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function ApplicantHome() {
  const { serverIP } = useSelector((store) => store.allsettings);

  const [externalId, setExternalId] = useState(0);
  const [activeLoanPlan, setActiveLoanPlan] = useState({});
  const [djangoUser, setDjangoUser] = useState([]);
  const [amisisClient, setAmisisClient] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [amisisUser, setAmisisUser] = useState([]);
  const [amisisUserDetails, setAmisisUserDetails] = useState([]);

  const [savingAccountTotal, setSavingAccountTotal] = useState(0);
  const [shareAccountTotal, setShareAccountTotal] = useState(0);

  const [amisiLoanPlan, setAmisiLoanPlan] = useState([]);

  const [objServiceCharge, setObjServiceCharge] = useState([]);
  const [objLifeInsurance, setObjLifeInsurance] = useState({});
  const [objTembir, setObjTembir] = useState({});

  const toastLoanFound = () => toast.success("Loan Plan Exist!");

  useEffect(() => {
    Object.keys(activeLoanPlan).length > 0 &&
      getLoanPlanFromAmisisAndUpdateLpsLoanPlan(activeLoanPlan.id);
  }, [activeLoanPlan]);

  function formatDateForDjango(year, month, day) {
    // JavaScript months are 0-indexed (January = 0, December = 11),
    // so we need to add 1 to align with the common 1-12 month range.
    const adjustedMonth = month < 10 ? `0${month}` : month.toString();
    const adjustedDay = day < 10 ? `0${day}` : day.toString();

    // Return the formatted string in 'YYYY-MM-DD' format
    return `${year}-${adjustedMonth}-${adjustedDay}`;
  }

  const getClientByExternalId = () => {
    axios
      .get(
        `${serverIP}fineract/clientbyexternalid?entityExternalId=${Number(
          externalId
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setAmisisClient(res.data);
        getamisisUser(res.data[0]?.entityAccountNo);
        checkLoanPlan(res.data[0]?.entityAccountNo);
        getamisisUserDetail(res.data[0]?.entityAccountNo);
        searchUserOn_Django();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getamisisUserDetail = (entityAccountNo) => {
    // http://localhost:8000/fineract/userdetail?entityAccountNo=000002330
    axios
      .get(`${serverIP}fineract/userdetail?entityAccountNo=${entityAccountNo}`)
      .then((res) => {
        console.log("getamisisUserDetail");
        console.log(res.data);
        setAmisisUserDetails(res.data);
      })
      .catch((err) => {
        console.log("error calling fineract");
        console.log(err);
      });
  };

  const getamisisUser = (entityAccountNo) => {
    axios
      .get(`${serverIP}fineract/clientbyid?entityAccountNo=${entityAccountNo}`)
      .then((res) => {
        console.log("getamisisUser");
        console.log(res.data);
        setAmisisUser(res.data);
      })
      .catch((err) => {
        console.log("error calling fineract");
        console.log(err);
      });
  };

  const checkLoanPlan = (entityAccountNo) => {
    axios
      .get(`${serverIP}fineract/allsaving?entityAccountNo=${entityAccountNo}`)
      .then((res) => {
        console.log("loan plan exisit");
        console.log(res.data);

        setSearchDone(true);

        const sum_savings = res.data.savingsAccounts?.reduce((accum, obj) => {
          return accum + (obj.accountBalance ? obj.accountBalance : 0);
        }, 0);

        const sum_shares = res.data.shareAccounts?.reduce((accum, obj) => {
          return accum + obj.totalApprovedShares;
        }, 0);

        // setDjangoLoanAccount("loanAccounts" in res.data);
        setShareAccountTotal(sum_shares);
        setSavingAccountTotal(sum_savings);
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

  const InitializeLoanPlan = () => {
    axios
      .post(`${serverIP}loan/loans/`, {
        loanId: activeLoanPlan.id,
        totalSaving: savingAccountTotal,
        totalShares: shareAccountTotal,
        customer: djangoUser[0]?.id,
        approvedPrincipal: amisiLoanPlan.approvedPrincipal,
        approvedPrincipalDisbursed: amisiLoanPlan.netDisbursalAmount,
        schFromLoan:
          amisiLoanPlan.netDisbursalAmount !== amisiLoanPlan.approvedPrincipal
            ? false
            : true,

        annualInterestRate: amisiLoanPlan.annualInterestRate,
        numberOfRepayments: amisiLoanPlan.numberOfRepayments,
        totalDueForPeriod:
          amisiLoanPlan.repaymentSchedule.periods[2].totalDueForPeriod,

        // prcntServiceCharge: objServiceCharge[0]?.percentage,
        // prcntLifeInsurance: objLifeInsurance[0]?.percentage,
        // multiplier: 2,
        // flatServiceCharge: objServiceCharge[0]?.amount,
        // flatLifeInsurance: objLifeInsurance[0]?.amount,
        // tembr: objTembir[0]?.amount,

        totalInterestPayment: amisisUserDetails.repaymentSchedule?.totalInterestCharged,

      })
      .then((res) => {
        console.log(res.data);
        searchUserOn_Django();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoanPlanFromAmisisAndUpdateLpsLoanPlan = (activeLoanPlanId) => {
    axios
      .get(
        `${serverIP}fineract/clientloanplan?entityExternalId=${activeLoanPlanId}`
      )
      .then(function (response) {
        console.log("loan plan response.data");
        console.log(response.data);
        setObjServiceCharge(
          response.data.charges?.filter((x) =>
            x.name.toString().includes("CHA")
          )
        );
        setObjLifeInsurance(
          response.data.charges?.filter((x) =>
            x.name.toString().includes("INSU")
          )
        );
        setObjTembir(
          response.data.charges?.filter((x) =>
            x.name.toString().includes("TEMB")
          )
        );
        setAmisiLoanPlan(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const copyFineractUserToLocalDatabase = () => {
    axios
      .post(`${serverIP}customer/customers/`, {
        entityAccountNo: amisisUserDetails.accountNo,
        entityExternalId: amisisUser.externalId,
        // expectedDisbursementDate: formatDateForDjango(
        //   amisisUserDetails?.timeline?.expectedDisbursementDate[0],
        //   amisisUserDetails?.timeline?.expectedDisbursementDate[1],
        //   amisisUserDetails?.timeline?.expectedDisbursementDate[2]
        // ),

        activationDate: formatDateForDjango(
          amisisUserDetails?.activationDate[0],
          amisisUserDetails?.activationDate[1],
          amisisUserDetails?.activationDate[2]
        ),
        active: amisisUser.active,
        displayName: amisisUser.displayName,
        amDisplayName: amisisUser.displayName,
        firstname: amisisUser.firstname,
        amFirstname: amisisUser.firstname,
        middlename: amisisUser.middlename,
        amMiddlename: amisisUser.middlename,
        lastname: amisisUser.lastname,
        amLastname: amisisUser.lastname,
        gender: amisisUser.gender?.name,
        mobileNo: amisisUser.mobileNo,
        address: "Addis Ababa",
        amAddress: "Addis Ababa",
        dateOfBirth: formatDateForDjango(
          amisisUserDetails?.dateOfBirth[0],
          amisisUserDetails?.dateOfBirth[1],
          amisisUserDetails?.dateOfBirth[2]
        ),
        isMarried: false,

        subcity: "",
        amSubcity: "",
        woreda: "",
        amWoreda: "",
        houseNum: "",
      })
      .then((res) => {
        searchUserOn_Django();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(" catch");
        console.log(err);
      });
  };

  return (
    <div className="container">
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

      {searchDone && (
        <>
          {activeLoanPlan !== undefined &&
          Object.keys(activeLoanPlan).length > 0 ? (
            <>
              <div className="row">
                <div className="col-sm-6">
                  {activeLoanPlan !== undefined &&
                    Object.keys(activeLoanPlan).length > 0 &&
                    !djangoUser.length > 0 && (
                      <Card>
                        <Card.Header> User Detail </Card.Header>
                        <ListGroup>
                          <ListGroup.Item>
                            Full Name: {amisisUser.displayName}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            ሙሉ ስም : {amisisUser.displayName}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            entityAccountNo: {amisisUser.accountNo}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Account: {amisisUser.active ? "Active" : "Closed"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Gender: {amisisUser.gender?.name}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            mobileNo: {amisisUser.mobileNo}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Marital Status:
                            {amisisUser.isMarried ? " Married" : " Single"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            activationDate: {amisisUser.activationDate}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            dateOfBirth:
                            {amisisUserDetails?.dateOfBirth[0] +
                              "/" +
                              amisisUserDetails?.dateOfBirth[1] +
                              "/" +
                              amisisUserDetails?.dateOfBirth[2]}
                          </ListGroup.Item>
                        </ListGroup>
                        <Card.Footer>
                          {djangoUser.length > 0 ? (
                            <a href={`/editcustomerinlps/${djangoUser[0]?.id}`}>
                              Edit User
                            </a>
                          ) : (
                            <Button onClick={copyFineractUserToLocalDatabase}>
                              Copy User
                            </Button>
                          )}
                        </Card.Footer>
                      </Card>
                    )}

                  {activeLoanPlan !== undefined &&
                    Object.keys(activeLoanPlan).length > 0 &&
                    djangoUser.length > 0 && (
                      <>
                        <Card>
                          <Card.Header> User Detail </Card.Header>
                          <ListGroup>
                            <ListGroup.Item>
                              Full Name: {djangoUser[0]?.amDisplayName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Phone: {djangoUser[0]?.mobileNo}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Status:
                              {djangoUser[0]?.isMarried ? "Married" : "Single"}
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Footer>
                            <a
                              href={`/customerprofileedit/${djangoUser[0].id}`}
                            >
                              Edit User Detail
                            </a>
                          </Card.Footer>
                        </Card>
                      </>
                    )}
                </div>
                <div className="col-sm-6">
                  <Card>
                    <Card.Header> Loan Plan </Card.Header>
                    <ListGroup>
                      <ListGroup.Item>
                        Saving: {savingAccountTotal?.toLocaleString()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Share: {shareAccountTotal?.toLocaleString()}
                      </ListGroup.Item>

                      {Object.keys(amisiLoanPlan).length > 0 ? (
                        <>
                          <ListGroup.Item>
                            Approved Principal:
                            {" " +
                              amisiLoanPlan.approvedPrincipal?.toLocaleString()}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Interest: {amisiLoanPlan.annualInterestRate + " %"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Monthly Pay:
                            {" " +
                              amisiLoanPlan.repaymentSchedule?.periods[2]?.totalDueForPeriod?.toLocaleString()}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Nmber of repayments:
                            {" " + amisiLoanPlan.numberOfRepayments + " Months"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Tembir: {objTembir[0]?.amount}{" "}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {" "}
                            Service Charge:{" "}
                            {objServiceCharge[0]?.percentage +
                              "% => " +
                              objServiceCharge[0]?.amount}{" "}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {" "}
                            Life Insurance:{" "}
                            {objLifeInsurance[0]?.percentage +
                              "% => " +
                              objLifeInsurance[0]?.amount}{" "}
                          </ListGroup.Item>
                        </>
                      ) : (
                        "No Plan"
                      )}
                    </ListGroup>
                    <Card.Footer>
                      {activeLoanPlan !== undefined &&
                      Object.keys(activeLoanPlan).length > 0 &&
                      !djangoUser.length > 0 ? (
                        <Alert variant="danger"> Copy User Detail First </Alert>
                      ) : (
                        <>
                          {djangoUser[0]?.loans.length === 0 ? (
                            <Button onClick={InitializeLoanPlan}>
                              Initialize Loan Plan
                            </Button>
                          ) : (
                            <a
                              href={`/loanonapplicant/${djangoUser[0]?.id}/${
                                djangoUser[0]?.loans[
                                  djangoUser[0].loans.length - 1
                                ]?.id
                              }`}
                            >
                              Customer Loans
                            </a>
                          )}
                        </>
                      )}
                    </Card.Footer>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <Alert variant="danger">
              Loan Plan Not Exist for <b>{amisisClient[0]?.entityName}</b>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}

export default ApplicantHome;
