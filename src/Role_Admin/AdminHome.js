import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

function AdminHome() {
  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);
  const [allCheckListTypes, setAllCheckListTypes] = useState([]);
  const [carManufactures, setCarManufactures] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [homeTypes, setHomeTypes] = useState([]);

  useEffect(() => {
    allChecklistTypes();
    carManufactureYear();
    carModel();
    homeType();
  }, []);

  const carManufactureYear = () => {
    axios
      .get(`${serverIP}car_manufacturer/carmanufacture`)
      .then((res) => {
        console.log(res.data);
        setCarManufactures(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const carModel = () => {
    axios
      .get(`${serverIP}car_model/cars`)
      .then((res) => {
        console.log(res.data);
        setCarModels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const homeType = () => {
    axios
      .get(`${serverIP}home_type/hometypes`)
      .then((res) => {
        console.log(res.data);
        setHomeTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const allChecklistTypes = () => {
    axios
      .get(`${serverIP}checklist_type/checklisttypes`)
      .then((res) => {
        console.log(res.data);
        setAllCheckListTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="container">
      <div className="row">
        {/* <div style={{ width:"100%", height:"100%", backgroundColor: "black" }}></div> */}

        <div className="col-sm-6">
          <div
            style={{
              padding: 10,
              textTransform: "uppercase",
              textAlign: "center",
              color: "orange",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            Check Lists
          </div>

          <ListGroup as="ol" numbered>
            {allCheckListTypes.length > 0 &&
              allCheckListTypes.map((chktype) => {
                return (
                  <ListGroup.Item
                    action
                    href={`/checklist/${chktype.id}`}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{chktype.enName}</div>
                      {chktype.amName}
                    </div>
                    <Badge bg="primary" pill>
                      {chktype.checklists.length}
                    </Badge>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </div>
        <div className="col-sm-6">
          <div
            style={{
              padding: 10,
              textTransform: "uppercase",
              textAlign: "center",
              color: "orange",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            Lookups
          </div>
          <ListGroup as="ol" numbered>
            <ListGroup.Item
              action
              href="/carmodel"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Car Model</div>
                የመኪና ሞዴል
              </div>
              <Badge bg="primary" pill>
                {carModels.length}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="/carmanufactureyear"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold"> CarManufactureYear </div>
                የመኪና ምርት ዘመን
              </div>
              <Badge bg="primary" pill>
                {carManufactures.length}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="/hometype"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Home Type</div>
                የቤት አይነት
              </div>
              <Badge bg="primary" pill>
                {homeTypes.length}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
