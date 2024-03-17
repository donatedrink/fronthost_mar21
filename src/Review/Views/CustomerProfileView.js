import React from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';

function CustomerProfileView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div>
      {Object.keys(props.customer).length > 0 && (
        <ListGroup>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> Full Name </div>
            <div>{props.customer?.amDisplayName}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> Address </div>
            <div>{props.customer?.amAddress}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> Phone Number </div>
            <div>{props.customer?.mobileNo}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> Marital Status </div>
            <div>{props.customer?.isMarried ? 'Married' : 'Not Married'}</div>
          </ListGroup.Item>
        </ListGroup>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* {props.loan?.decisionmakerApproved === false &&  */}
        {(data.groups[0] === 'ROLE_OFFICER' || data.groups[0] === 'ROLE_APPLICANT') && (
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <a href={`/customerprofileedit/${props.customer?.id}`}>Edit</a>
          </ListGroup.Item>
        )}
      </div>
    </div>
  );
}

export default CustomerProfileView;
