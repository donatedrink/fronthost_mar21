import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HomeCollateralSchema from "../Schema/HomeCollateralSchema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaHome, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function HomeCollateral(props) {
  const [loan, setLoan] = useState([]);
  const [homeTypes, setHomeTypes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [homeArea, setHomeArea] = useState(0);
  const [homeType, setHomeType] = useState(0);
  const [enName, setEnName] = useState("");
  const [amName, setAmName] = useState("");

  const toastSaved = () => toast.success("Car Sussfully Saved!");
  const toastNotSaved = () => toast.error("Error Saving Car details!");

  useEffect(() => {
    getHomeCollaterals();
    getHomeTypes();
  }, []);

  const getHomeCollaterals = () => {
    axios
      .get(`http://localhost:8000/loan/loans/${props.loanId}`)
      .then((res) => {
        console.log("Loan");
        console.log(res.data);
        setLoan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHomeTypes = () => {
    axios
      .get(`http://localhost:8000/home_type/hometypes`)
      .then((res) => {
        console.log("Home Types");
        console.log(res.data);
        setHomeTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCollateralHome = (values) => {
    console.log(values);
    axios
      .post(`http://localhost:8000/collateral_home/collateralhomes/`, {
        enName: values.enName,
        amName: values.amName,
        homearea: values.homeArea,
        hometype: values.homeType,
        loan: props.loanId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">{JSON.stringify(props)}</div>
      {/* add clientDetail modal start  */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Home</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            enName: "",
            amName: "",
            homeArea: 0,
            homeType: 0,
          }}
          validationSchema={HomeCollateralSchema}
          onSubmit={saveCollateralHome}
        >
          {(lpsprops) => (
            <>
              <Form>
                <Modal.Body>
                  <label>Home Type</label>
                  <Field
                    as="select"
                    name="homeType"
                    className="form-control"
                    style={{
                      border: lpsprops.errors.homeType ? "1px solid red" : "",
                    }}
                  >
                    <option value="0">Select Home Type </option>
                    {homeTypes.map((htype) => {
                      return (
                        <option key={htype.id} value={htype.id}>
                          {htype.enName}
                        </option>
                      );
                    })}
                  </Field>

                  <ErrorMessage
                    style={{ color: "red" }}
                    name="homeType"
                    component="div"
                  />

                  <label>Am Name</label>
                  <Field
                    className="form-control"
                    placeholder="amName"
                    type="text"
                    name="amName"
                    style={{
                      border: lpsprops.errors.amName ? "1px solid red" : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="amName"
                    component="div"
                  />

                  <label>En Name</label>
                  <Field
                    className="form-control"
                    placeholder="enName"
                    type="text"
                    name="enName"
                    style={{
                      border: lpsprops.errors.enName ? "1px solid red" : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="enName"
                    component="div"
                  />

                  <label> Home Area </label>
                  <Field
                    className="form-control"
                    placeholder="homeArea"
                    type="text"
                    name="homeArea"
                    style={{
                      border: lpsprops.errors.homeArea ? "1px solid red" : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="homeArea"
                    component="div"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit" variant="primary btn-sm">
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </>
          )}
        </Formik>
      </Modal>
      {/* edit clientDetail modal start  */}
      {/* add clientDetail modal start  */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary btn-sm"
            onClick={() => setShowEditModal(false)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit clientDetail modal start  */}
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setShowAddModal(true)}
          className="btn btn-sm btn-primary"
        >
          Add <FaHome />
        </Button>
      </div>
      <div className="row">
        <div className="col-sm-12">

          <Table striped bordered hover style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>Plate</th>
                <th>Chasis</th>
                <th>Engine</th>
                <th>Insurance</th>
                <th>Model</th>
                <th>Action</th>
                <th>Files</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                    {/* {loan.} */}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default HomeCollateral;
