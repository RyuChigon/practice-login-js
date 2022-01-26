import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";

const Main = () => {
  const navigate = useNavigate();
  const valid = async () => {
    const token = Cookies.get("plj-token");
    await axios.get("http://localhost:8000/api/validuser", {
      headers: {
        "token": `Bearer ${token}`,
      }
    })
    .then(res => {
      console.log(res);
      if (!res.data.success) {
        console.log("go");
        navigate("/", { replace: true })
      }
    })
  }

  useEffect(() => {
    valid()
  }, [])

  return (
    <div>
      <h1>환영합니다</h1>
    </div>
  )
}

export default Main;