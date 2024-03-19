import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';


function ApplicantHome() {
  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);

  const [externalId, setExternalId] = useState(0);
  const [activeLoanPlan, setActiveLoanPlan] = useState({});
  const [djangoUser, setDjangoUser] = useState([]);
  const [amisisClient, setAmisisClient] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [amisisUser, setAmisisUser] = useState([]);

  const [savingAccountTotal, setSavingAccountTotal] = useState(0);
  const [shareAccountTotal, setShareAccountTotal] = useState(0);

  const [amisiLoanPlan, setAmisiLoanPlan] = useState([]);

  const toastLoanFound = () => toast.success("Loan Plan Exist!");

  useEffect(() => {
    Object.keys(activeLoanPlan).length > 0 &&
      getLoanPlanFromAmisisAndUpdateLpsLoanPlan(activeLoanPlan.id);
  }, [activeLoanPlan]);

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
        amisisUserDetail(res.data[0]?.entityAccountNo);
        checkLoanPlan(res.data[0]?.entityAccountNo);
        searchUserOn_Django();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const amisisUserDetail = (entityAccountNo) => {
    axios
      .get(
        `${serverIP}fineract/clientbyid?entityAccountNo=${entityAccountNo}`
      )
      .then((res) => {
        setAmisisUser(res.data);
      })
      .catch((err) => {
        console.log("error calling fineract");
        console.log(err);
      });
  };

  const checkLoanPlan = (entityAccountNo) => {
    axios
      .get(
        `${serverIP}fineract/allsaving?entityAccountNo=${entityAccountNo}`
      )
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
        setAmisiLoanPlan(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const copyFineractUserToLocalDatabase = () => {
    axios
      .post(`${serverIP}customer/customers/`, {
        entityAccountNo: amisisUser.accountNo,
        entityExternalId: amisisUser.externalId,
        activationDate: "2024-01-17",
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
        dateOfBirth: "2024-01-17",
        isMarried: false,

        address: "",
        amAddress: "",

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
        console.log(err)
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
                            Account : {amisisUser.active ? "Active" : "Closed"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Gender : {amisisUser.gender?.name}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            mobileNo : {amisisUser.mobileNo}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Marital Status :
                            {amisisUser.isMarried ? "Married" : "Single"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            activationDate : {amisisUser.activationDate}
                          </ListGroup.Item>
                          <ListGroup.Item> dateOfBirth : </ListGroup.Item>
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
                        Saving: {savingAccountTotal}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Share: {shareAccountTotal}
                      </ListGroup.Item>

                      {Object.keys(amisiLoanPlan).length > 0 ? (
                        <>
                          <ListGroup.Item>
                            Approved Principal:
                            {amisiLoanPlan.approvedPrincipal}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Interest: {amisiLoanPlan.annualInterestRate + " %"}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Monthly Pay:
                            {
                              amisiLoanPlan.repaymentSchedule.periods[2]
                                ?.totalDueForPeriod
                            }
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Nmber of repayments:
                            {amisiLoanPlan.numberOfRepayments + " Months"}
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
