import React, { useState, useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  // 0: Pending, 1: LoggedIn, 2: NotLoggedIn
  const [auth, setAuth] = useState(0);
  const valid = async () => {
    const token = Cookies.get("plj-token");
    const { data } = await axios.get("http://localhost:8000/api/validuser", {
      headers: {
        "token": `Bearer ${token}`,
      }
    })
    return data.success;
  }

  useEffect(() => {
    valid()
    .then(success => {
      if (success)
        setAuth(1)
      else
        setAuth(2);
    })
  }, [])

  if (auth === 0)
    return <div>...Loading</div>
  if (auth === 1)
    return <Outlet />
  else
    return <Navigate replace to="/login" />
}

export default AuthRoute;
