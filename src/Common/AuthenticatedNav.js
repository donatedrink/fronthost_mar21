import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { custLogout } from "../Common/redux/customerAuthSlice";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function AuthenticatedNav() {
  const { data } = useSelector((store) => store.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">
            <a href="/">
              <div style={{ fontSize: 12, fontWeight: "bold" }}>
                Amigos SACCO
              </div>
              <div style={{ fontSize: 10, justifyContent: "center" }}>
                {data.groups[0] === "ROLE_OFFICER" ? " የብድር ኦፊሰር" : ""}
                {data.groups[0] === "ROLE_APPLICANT"
                  ? " አፕሊኬሽን ኦፊሰር"
                  : ""}
                {data.groups[0] === "ROLE_ADMIN" ? " አስተዳደር" : ""}
                {data.groups[0] === "ROLE_DISTRIBUTOR" ? " Distributor" : ""}
                {data.groups[0] === "ROLE_AUDITOR" ? " ኦዲተር" : ""}
                {data.groups[0] === "ROLE_OFFICER_HEAD" ? " Officer Head" : ""}
                {data.groups[0] === "ROLE_PLANNER" ? " Planner" : ""}
              </div>
            </a>
          </Navbar.Brand>
          <Nav className="me-auto">
            {data.groups[0] === "ROLE_APPLICANT" && (
              <Nav.Link href="/loanlistapplicant"> ብድሮች </Nav.Link>
            )}
            {data.groups[0] === "ROLE_APPLICANT" && (
              <Nav.Link href="/helpapplicant"> እገዛ </Nav.Link>
            )}
            {data.groups[0] === "ROLE_AUDITOR" && (
              <Nav.Link href="/helpauditor"> እገዛ </Nav.Link>
            )}
            {data.groups[0] === "ROLE_OFFICER" && (
              <Nav.Link href="/helpofficer"> እገዛ </Nav.Link>
            )}
            {data.groups[0] === "ROLE_PLANNER" && (
              <Nav.Link href="/helpplanner"> እገዛ </Nav.Link>
            )}

            {/* {data.groups[0] === 'ROLE_OFFICER' && (
              <NavDropdown title="Reports" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            )} */}
          </Nav>
          <div className="d-flex userMenu">
            <NavDropdown
              title={
                <>
                  <span>
                    <FaUser /> &nbsp;&nbsp;
                  </span>
                  {data.first_name + " " + data.last_name}
                </>
              }
              id="navbarScrollingDropdown"
              style={{ fontWeight: "bold" }}
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/changepass">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  dispatch(custLogout());
                  navigate("/guest/login");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>
      <hr
        style={{ borderTop: "3px solid Orange", paddingBottom: 5, margin: 0 }}
      />
    </>
  );
}

export default AuthenticatedNav;
