import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Auth_Context";
import { Outlet, } from "react-router-dom";

import axios from "axios";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  

  useEffect(() => {
    if (auth && auth.user) {
            setOk(true);
    }

    // if (auth?.token) {
    //   authCheck();
    // }
  }, [auth]);
  return ok ? <Outlet /> : <h1>please login</h1>;
};

export default PrivateRoute;



