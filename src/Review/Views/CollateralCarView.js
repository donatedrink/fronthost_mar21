import React from "react";
import { Alert, Button, Table } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";

function CollateralCarView(props) {
  const { data } = useSelector((store) => store.customer);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {props.collateralcar?.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>Model</td>
                  <td>Year</td>
                  <td>Insurance</td>
                  <td>Current</td>
                  <td>Garage $</td>
                  <td>Market $</td>
                </tr>
              </thead>

              <tbody>
                {props.collateralcar.map((car) => {
                  return (
                    <tr>
                      <td> {car?.model?.enName} </td>
                      <td> {car?.manufacturedYear?.yearRange} </td>
                      <td> {car?.insuranceValue?.toLocaleString()} </td>
                      <td>
                        {(car?.insuranceValue *
                          car?.manufacturedYear?.multiplierRatio)?.toLocaleString()}
                      </td>
                      <td>
                      {car.garageReport.length > 0 &&
                          car.garageReport[0]?.garageValue?.toLocaleString()}
                      </td>
                      <td>
                        {car.marketvalue.length > 0 &&
                          car.marketvalue[0]?.marketValue?.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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
