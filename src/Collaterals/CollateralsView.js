import React from "react";
import { Table } from "react-bootstrap";

function CollateralsView(props) {
  return (
    <div>
        {/* {JSON.stringify(props)} */}
      {/* Colateral car start  */}
      <div className="row">
        <div className="col-sm-12">
          {props.collateralcar?.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ሞዴል</td>
                  <td>የምርት ዘመን </td>
                  <td>ኢንሹራንስ </td>
                  <td>ኢ.ግምት</td>
                  <td>ጋራጅ ግምት </td>
                  <td>የገበያ ግምት</td>
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
                        {(
                          car?.insuranceValue *
                          car?.manufacturedYear?.multiplierRatio
                        )?.toLocaleString()}
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
        </div>
      </div>
      {/* Colateral car End  */}
      {/* Colateral Home start  */}
      <div className="row">
        <div className="col-sm-12">
          {props.collateralhome?.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>የቤት አይነት </td>
                  <td> የቤት ስፋት በካሬ </td>
                  <td>የ አንድ ካሬ ዋጋ </td>
                </tr>
              </thead>

              <tbody>
                {props.collateralhome.map((home) => {
                  return (
                    <tr>
                      <td> {home?.hometype?.amName} </td>
                      <td> {home?.homearea} </td>
                      <td>
                        {home?.hometype?.pricepercaremeter?.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      {/* Colateral Home End  */}
    </div>
  );
}

export default CollateralsView