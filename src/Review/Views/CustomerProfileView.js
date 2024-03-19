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
            <div> ሙሉ ስም </div>
            <div>{props.customer?.amDisplayName }</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> አድራሻ </div>
            <div>{props.customer?.amAddress + ", ክ/ከተማ፡ " + props.customer?.amSubcity + ", ወረዳ፡ " + props.customer?.amWoreda + ",  የቤት ቁጥር፡ " + props.customer?.houseNum }</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> ስለክ ቁጥር </div>
            <div>{props.customer?.mobileNo}</div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div> የትዳር ሁኔታ </div>
            <div>{props.customer?.isMarried ? 'ያገባ' : ' ያላገባ'}</div>
          </ListGroup.Item>
        </ListGroup>
      )}
     
    </div>
  );
}

export default CustomerProfileView;
