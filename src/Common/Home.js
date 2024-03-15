import React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// Roles Home
import AdminHome from '../Role_Admin/AdminHome';

import ApplicantHome from '../Role_Applicant/ApplicantHome';

import { setSideBar } from '../Common/redux/systemLookups';
import { custLogout } from '../Common/redux/customerAuthSlice';

import Logo from '../Assets/Amigos.png';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data } = useSelector((store) => store.customer);
  const { sideBar } = useSelector((store) => store.systemLookups);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSideBar = () => {
    console.log('handleSideBar = ' + sideBar);
    dispatch(setSideBar());
  };

  return (
    <React.Fragment>
      <Container className="py-1">
        {data.groups[0] === 'ROLE_ADMIN' && <AdminHome />}
        {data.groups[0] === 'ROLE_APPLICANT' && <ApplicantHome />}
        {data.groups[0] === 'ROLE_DISTRIBUTOR' && <ApplicantHome />}
        {data.groups[0] === 'ROLE_OFFICER' && <ApplicantHome />}
        {data.groups[0] === 'ROLE_OFFICER_HEAD' && <ApplicantHome />}
        {data.groups[0] === 'ROLE_AUDITOR' && <ApplicantHome />}
        {data.groups[0] === 'ROLE_PLANNER' && <ApplicantHome />}
      </Container>
    </React.Fragment>
  );
};

export default Home;
