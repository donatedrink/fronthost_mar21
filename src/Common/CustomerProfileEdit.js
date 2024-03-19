import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Table } from "react-bootstrap";
// import ApplicationSubmitSchemaFile from "../../Schema/ApplicationSubmitSchema";
import ApplicationSubmitSchemaFile from "../Schema/ApplicationSubmitSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

function CustomerProfileEdit() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [amFirstname, setamFirstname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [amMiddlename, setamMiddlename] = useState("");
  const [lastname, setlastname] = useState("");
  const [amLastname, setamLastname] = useState("");

  const [subcity, setsubcity] = useState("");
  const [amSubcity, setamSubcity] = useState("");
  const [woreda, setworeda] = useState("");
  const [amWoreda, setamWoreda] = useState("");
  const [houseNum, sethouseNum] = useState("");

  const [isMarried, setisMarried] = useState();

  useEffect(() => {
    getCustomer();
    console.log("userId start");
  }, []);

  const updateCustomerRecord = () => {
    console.log("updateCustomerRecord");
    axios
      .patch(`http://localhost:8000/customer/customers/${customerId}/`, {
        // entityAccountNo: "",
        // entityExternalId: "",
        // activationDate: "",
        // active: "",
        // displayName: "",
        // amDisplayName: "",
        firstname: firstname,
        amFirstname: amFirstname,
        middlename: middlename,
        amMiddlename: amMiddlename,
        lastname: lastname,
        amLastname: amLastname,
        // gender: "",
        // mobileNo: "",
        // address: "",
        // amAddress: "",
        subcity: subcity,
        amSubcity: amSubcity,
        woreda: woreda,
        amWoreda: amWoreda,
        houseNum: houseNum,
        // dateOfBirth: "",
        isMarried: isMarried,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("successfully updated")
      })
      .catch((err) => {
        console.log(err);
        toast.error("update unsuccessful")

      });
  };

  const getCustomer = () => {
    axios
      .get(`http://localhost:8000/customer/customers/${customerId}/`)
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
        setamFirstname(res.data.amFirstname);
        setamMiddlename(res.data.amMiddlename);
        setamLastname(res.data.amLastname);

        setamSubcity(res.data.amSubcity);
        setamWoreda(res.data.amWoreda);

        setFirstname(res.data.firstname);
        setmiddlename(res.data.middlename);
        setlastname(res.data.lastname);

        setsubcity(res.data.subcity);
        setworeda(res.data.woreda);
        sethouseNum(res.data.houseNum);

        setisMarried(res.data.isMarried);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <ToastContainer/>
      <Card>
        <CardHeader>LPS</CardHeader>
        <CardBody>
          <div className="row">
            <div className="col-sm-6">
              <label for="basic-url" class="form-label">
                ስም
              </label>
              <input
                type="text"
                class="form-control"
                value={amFirstname}
                onChange={(e) => setamFirstname(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                የአባት ስም
              </label>
              <input
                type="text"
                class="form-control"
                value={amMiddlename}
                onChange={(e) => setamMiddlename(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                የአያት ስም
              </label>
              <input
                type="text"
                class="form-control"
                value={amLastname}
                onChange={(e) => setamLastname(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                ክፍለ ከተማ
              </label>
              <input
                type="text"
                class="form-control"
                value={amSubcity}
                onChange={(e) => setamSubcity(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                ወረዳ
              </label>
              <input
                type="text"
                class="form-control"
                value={amWoreda}
                onChange={(e) => setamWoreda(e.target.value)}
              />

              <label for="basic-url" class="form-label">
                የቤት ቁጥር
              </label>
              <input
                type="text"
                class="form-control"
                value={houseNum}
                onChange={(e) => sethouseNum(e.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label for="basic-url" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                Father Name
              </label>
              <input
                type="text"
                class="form-control"
                value={middlename}
                onChange={(e) => setmiddlename(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                Last Name
              </label>
              <input
                type="text"
                class="form-control"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                Sub city
              </label>
              <input
                type="text"
                class="form-control"
                value={subcity}
                onChange={(e) => setsubcity(e.target.value)}
              />
              <label for="basic-url" class="form-label">
                Woreda
              </label>
              <input
                type="text"
                class="form-control"
                value={woreda}
                onChange={(e) => setworeda(e.target.value)}
              />
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Is Married
                </label>
              </div>
              <Button onClick={updateCustomerRecord}>SAVE</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CustomerProfileEdit;
