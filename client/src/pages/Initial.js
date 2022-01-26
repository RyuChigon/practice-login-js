import React, { useState } from "react";
import { useNavigate } from 'react-router'; // react-router v6으로 useHistory에서 useNavigate로 변경
import Cookies from 'js-cookie'
import axios from "axios";

const Initial = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  const signin = async () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (pw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    await axios.post("http://localhost:8000/api/signin", {
      id: id,
      pw: pw
    })
    .then(res => {
      if (!res.data.success) {
        alert("회원 정보가 일치하지 않습니다");
        return;
      }
      Cookies.set('plj-token', res.data.token);
      navigate("/main");
    })
    .catch(err => console.log(err))
  }

  return (
    <div style={{
      width: "30%",
      minWidth: "300px",
      display: "flex",
      marginLeft: "10px",
      flexDirection: "column",
    }}>
      <h1>Hello World</h1>
      <input 
        placeholder="아이디를 입력하세요" 
        style={{ padding: "10px" }} 
        onChange={e => setId(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="비밀번호를 입력하세요" 
        style={{ padding: "10px" }} 
        onChange={e => setPw(e.target.value)}
      />
      <button style={{ padding: "10px" }} onClick={signin}>로그인</button>
      <button
        style={{ padding: "10px" }}
        onClick={() => navigate("/register")}
      >
        회원가입
      </button>
    </div>
  )
}

export default Initial;