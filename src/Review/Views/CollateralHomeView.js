import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function CollateralHomeView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div>
      <div>
        {props.collateralhome?.length > 0 && (
          <>
            {props.collateralhome.map((home) => {
              return (
                <ListGroup>
                  <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div> Name </div>
                    <div>{home?.enName}</div>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div> Area </div>
                    <div>{home?.homearea.toLocaleString()}</div>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div> Type </div>
                    <div>{home?.hometype?.enName}</div>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div> Price $ </div>
                    <div>{(home?.hometype?.pricepercaremeter * home?.homearea).toLocaleString()}</div>
                  </ListGroup.Item>

                  <div style={{ paddingBottom: 10 }}></div>
                </ListGroup>
              );
            })}
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {(data.groups[0] === 'ROLE_OFFICER' || data.groups[0] === 'ROLE_APPLICANT') && (
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <a href={`/collaterals/${props.loan?.id}`}>Edit House Collateral</a>
            </ListGroup.Item>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollateralHomeView;
