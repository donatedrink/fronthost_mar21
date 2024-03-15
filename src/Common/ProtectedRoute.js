import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((store) => store.customer);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/guest/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <React.Fragment>{isAuthenticated ? props.children : null}</React.Fragment>
  );
};

export default ProtectedRoute;
