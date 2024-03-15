import React from 'react';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

function Profile() {
  const { data } = useSelector((store) => store.customer);

  return (
    <div className="container">
      <div
        className="row"
        style={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <ListGroup as="ul" >
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">User Name</div>
              <div>{data.username}</div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">First Name</div>
              <div>{data.first_name}</div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">Last Name</div>
              <div>{data.last_name}</div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">Email</div>
              <div>{data.email}</div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">Role</div>
              <div>{data.groups[0]}</div>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
}

export default Profile;
