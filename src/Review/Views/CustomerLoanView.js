import React from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

function CustomerLoanView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div>
      {Object.keys(props.loan).length > 0 && (
        <ListGroup>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>የብድር መ.ቁጥር:{props.loan?.loanId}</div>
            <div> <FaUserAlt/> {props.loan?.customer?.entityExternalId + " - " + props.loan?.customer?.entityAccountNo}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>ጠቅላላ ቁጠባ: {" " + props.loan?.totalSaving}</div>
            <div>ጠቅላላ ሼር: {" " + props.loan?.totalShares}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>የተፈቀደው የብድር መጠን </div>
            <div>{props.loan?.approvedPrincipal}</div>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> ኣመታዊ ወለድ </div>
            <div>{props.loan?.annualInterestRate + "%"}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> ብድሩ ተከፍሎ የሚያልቅበት </div>
            <div>{props.loan?.numberOfRepayments + " ወራት"}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> በየወሩ የሚከፈል </div>
            <div>{props.loan?.totalDueForPeriod}</div>
          </ListGroup.Item>

          {/* {props.loan?.auditorApproved === false && data.groups[0] === 'ROLE_APPLICANT' && ( */}
        </ListGroup>
      )}
    </div>
  );
}

export default CustomerLoanView;
