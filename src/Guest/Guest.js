import React from "react";
import { Outlet } from "react-router-dom";

import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";

const Guest = () => {
    return (
        <React.Fragment>
            <GuestHeader />
            <Outlet />
            <GuestFooter />
        </React.Fragment>
    );
}

export default Guest;