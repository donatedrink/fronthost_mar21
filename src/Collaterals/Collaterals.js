import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import { useSelector } from "react-redux";
import CarCollateral from './CarCollateral';
import HomeCollateral from './HomeCollateral';

import { useParams } from 'react-router-dom';
import { FaCarAlt, FaHome, FaTrashAlt, FaUserAlt } from 'react-icons/fa';

function Collaterals() {
  const { loanId } = useParams();

  return (
    <div className="container">
      <Tabs defaultActiveKey="car" id="uncontrolled-tab-example" className="mb-3">
        <Tab
          eventKey="car"
          title={
            <span>
              <FaCarAlt /> CAR
            </span>
          }
        >
          <CarCollateral loanId={loanId} />
        </Tab>
        <Tab
          eventKey="home"
          title={
            <span>
              <FaHome /> Home
            </span>
          }
        >
          <HomeCollateral loanId={loanId} />
        </Tab>
        <Tab eventKey="salary" title="salary">
          Tab content for salary
        </Tab>
        <Tab eventKey="member" title="member">
          Tab content for member
        </Tab>
        <Tab eventKey="stock" title="stock">
          Tab content for stock
        </Tab>

        <Tab
          eventKey="delegationn"
          title={
            <span>
              <FaUserAlt /> Delegation
            </span>
          }
        >
          Tab content for delegation
        </Tab>

        <Tab
          eventKey="guarantee"
          title={
            <span>
              <FaUserAlt /> Guarantee
            </span>
          }
        >
          Tab content for guarantee
        </Tab>
      </Tabs>
    </div>
  );
}

export default Collaterals;
