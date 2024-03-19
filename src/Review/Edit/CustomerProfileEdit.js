import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Table } from 'react-bootstrap';
// import ApplicationSubmitSchemaFile from "../../../Schema/ApplicationSubmitSchema";
import ApplicationSubmitSchemaFile from '../../Schema/ApplicationSubmitSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function CustomerProfileEdit() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getCustomer();
    console.log('userId start');
  }, []);

  const updateLpsUser = (values) => {
    console.log(values);
  };

  const getCustomer = () => {
    axios
      .get(`http://localhost:8000/customer/customer/${customerId}`)
      .then((res) => {
        console.log('customer');
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div style={{ paddingTop: 5 }}></div>
          <Card>
            <CardHeader>LPS</CardHeader>
            <CardBody>
              <Formik
                initialValues={{
                  amFirstname: '',
                  amMiddlename: '',
                  amLastname: '',
                  address: '',
                  amAddress: '',
                  isMarried: false
                }}
                validationSchema={ApplicationSubmitSchemaFile}
                onSubmit={updateLpsUser}
              >
                {(lpsprops) => (
                  <>
                    <Form>
                      <label>ስም</label>
                      <Field
                        className="form-control"
                        placeholder="ስም"
                        type="text"
                        name="amFirstname"
                        value={customer.amFirstname}
                        style={{
                          border: lpsprops.errors.amFirstname ? '1px solid red' : ''
                        }}
                      />
                      <ErrorMessage style={{ color: 'red' }} name="amFirstname" component="div" />
                      <label>የአባት ስም</label>
                      <Field
                        className="form-control"
                        placeholder="የአባት ስም"
                        type="text"
                        name="amMiddlename"
                        value={customer.amMiddlename}
                        style={{
                          border: lpsprops.errors.amMiddlename ? '1px solid red' : ''
                        }}
                      />
                      <ErrorMessage style={{ color: 'red' }} name="amMiddlename" component="div" />
                      <label>የአያት ስም</label>
                      <Field
                        className="form-control"
                        placeholder="የአያት ስም"
                        type="text"
                        name="amLastname"
                        value={customer.amLastname}
                        style={{
                          border: lpsprops.errors.amLastname ? '1px solid red' : ''
                        }}
                      />
                      <ErrorMessage style={{ color: 'red' }} name="amLastname" component="div" />
                      <label>Address</label>
                      <Field
                        className="form-control"
                        placeholder="address"
                        type="text"
                        name="address"
                        value={customer.address}
                        style={{
                          border: lpsprops.errors.address ? '1px solid red' : ''
                        }}
                      />
                      <ErrorMessage style={{ color: 'red' }} name="address" component="div" />
                      <label>አድራሻ</label>
                      <Field
                        className="form-control"
                        placeholder="አድራሻ"
                        type="text"
                        name="amAddress"
                        value={customer.amAddress}
                        style={{
                          border: lpsprops.errors.amAddress ? '1px solid red' : ''
                        }}
                      />
                      <ErrorMessage style={{ color: 'red' }} name="amAddress" component="div" />
                      <Field name="isMarried" className="mr-2 leading-tight" type="checkbox" />
                      Is Married
                      <div style={{ paddingTop: 5 }}>
                        <Button type="submit" variant="primary btn-sm">
                          Submit Application
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfileEdit;
