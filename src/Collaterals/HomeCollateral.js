import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HomeCollateralSchema from "../Schema/HomeCollateralSchema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaHome, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

function HomeCollateral(props) {
  const { langName, serverIP, loadingFinished } = useSelector((store) => store.allsettings);
  const [loan, setLoan] = useState([]);
  const [homeTypes, setHomeTypes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetHome, setTargetHome] = useState({});

  const toastSaved = () => toast.success("Car Sussfully Saved!");
  const toastNotSaved = () => toast.error("Error Saving Car details!");

  useEffect(() => {
    getCurrentLoan();
    getHomeTypes();
  }, []);

  const getCurrentLoan = () => {
    axios
      .get(`${serverIP}loan/loans/${props.loanId}`)
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
      .get(`${serverIP}home_type/hometypes`)
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
      .post(`${serverIP}collateral_home/collateralhomes/`, {
        enName: values.enName,
        amName: values.amName,
        homearea: values.homeArea,
        hometype: values.homeType,
        loan: props.loanId,
      })
      .then((res) => {
        console.log(res.data);
        getCurrentLoan();
        setShowAddModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHome = (values) => {
    console.log(values);

    // axios.delete(`${serverIP}collateral_home/collateralhomes/${targetHome.id}`).then((res)=>{
    //   console.log(res.data)
    //   setShowEditModal(false);
    // }).catch((err)=>{
    //   console.log(err)
    // })
  };
  const deleteHome = () => {
    axios
      .delete(
        `${serverIP}collateral_home/collateralhomes/${targetHome.id}`
      )
      .then((res) => {
        console.log(res.data);
        setShowDeleteModal(false);
        getCurrentLoan();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Home</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div> {targetHome.amName} </div>
          <div> {targetHome.homearea} </div>
          <div> {targetHome.hometype?.amName} </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger btn-sm"
            onClick={() => {
              setShowDeleteModal(false);
              deleteHome();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Home</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            enName: "",
            amName: "",
            homeArea: 0,
            homeType: 0,
          }}
          validationSchema={HomeCollateralSchema}
          onSubmit={editHome}
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
                    value={targetHome.hometype?.id}
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
                    value={targetHome.amName}
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
                  <Button
                    variant="warning btn-sm"
                    onClick={() => {
                      setShowEditModal(false);
                      editHome();
                    }}
                  >
                    Edit
                  </Button>
                </Modal.Footer>
              </Form>
            </>
          )}
        </Formik>
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
                <th>Name</th>
                <th>Area</th>
                <th>Home Type</th>
                <th> ~ Price </th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(loan)?.length > 0 &&
                loan.collateralhome.map((home) => {
                  return (
                    <tr>
                      <td> {home.amName} </td>
                      <td> {home.homearea} </td>
                      <td> {home.hometype?.amName} </td>
                      <td>
                        {home.homearea +
                          " * " +
                          home.hometype?.pricepercaremeter +
                          " = " +
                          (
                            home.homearea * home.hometype?.pricepercaremeter
                          ).toLocaleString()}
                      </td>
                      <td style={{ display:"flex", justifyContent:"space-evenly" }}>
                        <FaTrashAlt
                          onClick={() => {
                            setShowDeleteModal(true);
                            setTargetHome(home);
                          }}
                          color="red"
                        />
                        &nbsp;
                        <FaPencilAlt
                          onClick={() => {
                            setShowEditModal(true);
                            setTargetHome(home);
                          }}
                          color="orange"
                        />
                      </td>
                      <td>{home.isApproved ? "Approved" : "Waiting"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default HomeCollateral;
