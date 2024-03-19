import React from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';

function CustomerLoanView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div>
      {Object.keys(props.loan).length > 0 && (
        <ListGroup>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>loanId:{props.loan?.loanId}</div>
            <div>{props.loan?.loanId}</div>
            <div>{props.loan?.loanId}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>Total Saving: {' ' + props.loan?.totalSaving}</div>
            <div>Total Shares: {' ' + props.loan?.totalShares}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>Approved Principal</div>
            <div>{props.loan?.approvedPrincipal}</div>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> Annual Interest Rate</div>
            <div>{props.loan?.annualInterestRate + '%'}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> Number Of Repayments </div>
            <div>{props.loan?.numberOfRepayments + ' Months'}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div>Total Due For Period </div>
            <div>{props.loan?.totalDueForPeriod}</div>
          </ListGroup.Item>



          {/* {props.loan?.auditorApproved === false && data.groups[0] === 'ROLE_APPLICANT' && ( */}
             {(data.groups[0] === 'ROLE_OFFICER' || data.groups[0] === 'ROLE_APPLICANT') && (
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <a href={`/customerloanedit/${props.loan?.customer}/${props.loan?.id}`}>Edit</a>
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
}

export default CustomerLoanView;
