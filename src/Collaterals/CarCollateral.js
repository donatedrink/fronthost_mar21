import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CarCollateralSchema from "../Schema/CarCollateralSchema";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaCarAlt, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Badge } from "react-bootstrap";

function CarCollateral(props) {
  const [loan, setLoan] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [carModels, setCarModels] = useState([]);
  const [carManufactureYear, setCarManufactureYear] = useState([]);
  const [targetCar, setTargetCar] = useState([]);

  const toastSaved = () => toast.success("Car Sussfully Saved!");
  const toastNotSaved = () => toast.error("Error Saving Car details!");

  useEffect(() => {
    getCarModels();
    getCarCollaterals();
    getCarManufactureYears();
  }, []);

  const getCarCollaterals = () => {
    axios
      .get(`http://localhost:8000/loan/loans/${props.loanId}`)
      .then((res) => {
        console.log("the");
        console.log(res.data);
        setLoan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCarModels = () => {
    axios
      .get(`http://localhost:8000/car_model/cars`)
      .then((res) => {
        console.log(res.data);
        setCarModels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCarManufactureYears = () => {
    axios
      .get(`http://localhost:8000/car_manufacturer/carmanufacture`)
      .then((res) => {
        console.log(res.data);
        setCarManufactureYear(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCarCollateral = (values, actions) => {
    console.log(values);
    axios
      .post(`http://localhost:8000/collateral_car/collateralcar/`, {
        manufacturedYear: values.manufacturedYear,
        chassisNumber: values.chassisNumber,
        engineNumber: values.engineNumber,
        carPlate: values.carPlate,
        insuranceValue: values.insuranceValue,
        carCC: values.carCC,
        loan: props.loanId,
        model: values.model,
      })
      .then((res) => {
        console.log("car collateral");
        console.log(res.data);
        toastSaved();
        setShowAddModal(false);
        getCarCollaterals();
      })
      .catch((err) => {
        console.log(err);
        toastNotSaved();
      });
  };

  const editCar = () => {
    console.log("Edit Car");
    setShowEditModal(false);
    console.log(targetCar);
  };

  const deleteCar = () => {
    axios
      .delete(
        `http://localhost:8000/collateral_car/collateralcar/${targetCar.id}`
      )
      .then((res) => {
        console.log(res.data);
        setShowDeleteModal(false);
        getCarCollaterals();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setShowAddModal(true)}
          className="btn btn-sm btn-primary"
        >
          Add <FaCarAlt />
        </Button>
      </div>

      {/* add modal Start  */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Car</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            model: "",
            loan: props.loanId,
            manufacturedYear: "",
            chassisNumber: "",
            engineNumber: "",
            carPlate: "",
            insuranceValue: 0,
            carCC: 0,
          }}
          validationSchema={CarCollateralSchema}
          onSubmit={saveCarCollateral}
        >
          {(lpsprops) => (
            <>
              <Form>
                <Modal.Body>
                  <label>model</label>
                  <Field
                    as="select"
                    name="model"
                    className="form-control"
                    style={{
                      border: lpsprops.errors.model ? "1px solid red" : "",
                    }}
                  >
                    <option value="0">Select Car Model</option>
                    {carModels.map((model) => {
                      return (
                        <option key={model.id} value={model.id}>
                          {model.enName}
                        </option>
                      );
                    })}
                  </Field>

                  <ErrorMessage
                    style={{ color: "red" }}
                    name="model"
                    component="div"
                  />
                  <label>manufacturedYear</label>
                  <Field
                    as="select"
                    name="manufacturedYear"
                    className="form-control"
                    style={{
                      border: lpsprops.errors.manufacturedYear
                        ? "1px solid red"
                        : "",
                    }}
                  >
                    <option value="0">Select Manufactured Year Range</option>
                    {carManufactureYear.map((manufactureYear) => {
                      return (
                        <option
                          key={manufactureYear.id}
                          value={manufactureYear.id}
                        >
                          {manufactureYear.yearRange}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="manufacturedYear"
                    component="div"
                  />
                  <label>chassisNumber</label>
                  <Field
                    className="form-control"
                    placeholder="chassisNumber"
                    type="text"
                    name="chassisNumber"
                    style={{
                      border: lpsprops.errors.chassisNumber
                        ? "1px solid red"
                        : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="chassisNumber"
                    component="div"
                  />

                  <label>engineNumber</label>
                  <Field
                    className="form-control"
                    placeholder="engineNumber"
                    type="text"
                    name="engineNumber"
                    style={{
                      border: lpsprops.errors.engineNumber
                        ? "1px solid red"
                        : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="engineNumber"
                    component="div"
                  />

                  <label>carPlate</label>
                  <Field
                    className="form-control"
                    placeholder="carPlate"
                    type="text"
                    name="carPlate"
                    style={{
                      border: lpsprops.errors.carPlate ? "1px solid red" : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="carPlate"
                    component="div"
                  />

                  <label>insuranceValue</label>
                  <Field
                    className="form-control"
                    placeholder="insuranceValue"
                    type="number"
                    name="insuranceValue"
                    style={{
                      border: lpsprops.errors.insuranceValue
                        ? "1px solid red"
                        : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="insuranceValue"
                    component="div"
                  />

                  <label>carCC</label>
                  <Field
                    className="form-control"
                    placeholder="carCC"
                    type="number"
                    name="carCC"
                    style={{
                      border: lpsprops.errors.carCC ? "1px solid red" : "",
                    }}
                  />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="carCC"
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
      {/* add modal End  */}

      {/* edit modal Start  */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>!</Modal.Body>
        <Modal.Footer>
          <Button variant="warning btn-sm" onClick={() => editCar()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit modal End  */}

      {/* delete modal Start  */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger btn-sm" onClick={() => deleteCar()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* delete modal End  */}

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
          {/* {JSON.stringify(loan.collateralcar)} */}
          {Object.keys(loan)?.length > 0 &&
            loan.collateralcar.map((car) => {
              return (
                <tr>
                  <td> {car.carPlate} </td>
                  <td> {car.chassisNumber} </td>
                  <td> {car.engineNumber} </td>
                  <td> {car.insuranceValue} </td>
                  <td> {car.model?.enName} </td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <FaTrashAlt
                      onClick={() => {
                        setShowDeleteModal(true);
                        setTargetCar(car);
                      }}
                      color="red"
                    />
                    &nbsp;
                    <FaPencilAlt
                      onClick={() => {
                        setShowEditModal(true);
                        setTargetCar(car);
                      }}
                      color="orange"
                    />
                  </td>
                  <td>
                    <span style={{ color: "orange" }}>
                      <a href={`/carcollateralfiles/${car.id}`}>
                        <Badge> {car.carfiles?.length} </Badge> detail
                      </a>
                    </span>
                  </td>
                  <td>{car.isApproved ? "Approved" : "Waiting"}</td>
                </tr>
              );
            })}
          {/*  */}
        </tbody>
      </Table>
    </div>
  );
}

export default CarCollateral;
