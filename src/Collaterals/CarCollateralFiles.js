import React, { useState, useEffect } from "react";
import { Accordion, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import CarFiles from "./Car/CarFiles";
import CarMarketValue from "./Car/CarMarketValue";
import CarGarageReport from "./Car/CarGarageReport";
import { useSelector } from "react-redux";

function CarCollateralFiles() {
  const { serverIP } = useSelector((store) => store.allsettings);
  const { collateralId } = useParams();
  const [collateralDetail, setCollateralDetail] = useState([]);

  useEffect(() => {
    getCollateralDetail();
  }, []);

  const getCollateralDetail = () => {
    axios
      .get(`${serverIP}collateral_car/collateralcar/${collateralId}`)
      .then((res) => {
        console.log(res.data);
        setCollateralDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Alert>
        {"Car model " + collateralDetail.model?.enName + " "}-
        {collateralDetail.manufacturedYear?.yearRange} -
        {" Insurance " + collateralDetail.insuranceValue}
      </Alert>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="1">
          <Accordion.Header>የመኪናው ሙሉ መረጃ</Accordion.Header>
          <Accordion.Body>
            <CarFiles collateralId={collateralId} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header> የገበያ ዋጋ ጥናት </Accordion.Header>
          <Accordion.Body>
            <CarMarketValue collateralId={collateralId} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header> የጋራጅ ሪፖርት </Accordion.Header>
          <Accordion.Body>
            <CarGarageReport collateralId={collateralId} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CarCollateralFiles;
