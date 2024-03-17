import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';

function CollateralCarView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {props.collateralcar?.length > 0 && (
            <>
              {props.collateralcar.map((car) => {
                return (
                  <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                      <div> Model </div>
                      <div>{car?.model?.enName}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                      <div> Year </div>
                      <div>{car?.manufacturedYear?.yearRange}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                      <div> Insurance $ </div>
                      <div>{car?.insuranceValue}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                      <div> Current $ </div>
                      <div>{car?.insuranceValue * car?.manufacturedYear?.multiplierRatio}</div>
                    </ListGroup.Item>

                    <ListGroup.Item >
                      {car.marketvalue.length > 0 ? (
                        <div className="d-flex justify-content-between align-items-start">
                          <a href={`/collateralcarmarketvalue/${car?.id}`}> Edit Market Value </a>
                          <div> {car.marketvalue[0]?.marketValue} </div>
                        </div>
                      ) : (
                        <a href={`/collateralcarmarketvalue/${car?.id}`}> Add Market Value </a>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                      <div>
                        {car.garageReport.length > 0 ? (
                          <a href={`/collaterals/${props.loan?.id}`}> Edit Garage Report </a>
                        ) : (
                          <a href={`/collaterals/${props.loan?.id}`}> Add Garage Report </a>
                        )}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                );
              })}
            </>
          )}

          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
            {(data.groups[0] === 'ROLE_APPLICANT' || data.groups[0] === 'ROLE_OFFICER') && (
              <ListGroup.Item className="d-flex justify-content-between align-items-start">
                <a href={`/collaterals/${props.loan?.id}`}>Edit Car Collateral</a>
              </ListGroup.Item>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CollateralCarView;
