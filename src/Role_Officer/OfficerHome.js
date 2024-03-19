import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoanStatus from "../Common/LoanStatus";

function OfficerHome() {
  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);

  const { data } = useSelector((store) => store.customer);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    setAllLoans();
  }, []);

  const setAllLoans = () => {
    axios
      .get(`${serverIP}loan/loans`)
      .then(function (response) {
        console.log(response.data);
        setLoans(response.data);
        // setLoans(response.data?.filter((lo) => lo.assignedTo?.id  == data.id));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <Alert>
        Loans assigned to <strong> {data.first_name} </strong>
        {JSON.stringify(data)}
      </Alert>

      <div className="row">
        <div className="col-sm-12">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ExternalID</th>
                <th>Full Name</th>
                <th>Approved Principal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => {
                // {
                //   if ((loan.customer?.entityExternalId%1000)%100%10 === data.id) {
                    return (
                      <tr>
                        <td> {loan.customer?.entityExternalId} </td>
                        <td> {loan.customer?.amDisplayName} </td>
                        <td>
                          <a
                            href={`/loanonofficer/${loan.customer?.id}/${loan.id}`}
                          >
                            {loan.approvedPrincipal?.toLocaleString()}
                          </a>
                        </td>
                        <td>
                        <LoanStatus loan={loan} /> 
                        </td>
                      </tr>
                    );
                  // } else {
                  //   return <></>;
                  // }
                // }
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default OfficerHome;
