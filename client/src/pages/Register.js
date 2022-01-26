import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const Register = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwc, setPwc] = useState(""); // password confirm
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    if (id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (pw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (pw !== pwc) {
      setWarning(true);
      return;
    }
    
    await axios.post("http://localhost:8000/api/signup", {
      id: id,
      pw: pw
    })
    .then(res => {
      if (!res.data.success) {
        alert("회원가입 오류");
        return;
      }
      alert("회원가입 완료");
      navigate("/");
    })
    .catch(err => console.log(err))
  }

  return (
    <div style={{
      width: "30%",
      minWidth: "300px",
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
    }}>
      <h1>회원가입</h1>
      <input placeholder="아이디" onChange={e => setId(e.target.value)} style={{ padding: "10px" }}/>
      <input
        type="password"
        placeholder="비밀번호"
        onChange={e => {setWarning(false); setPw(e.target.value);}}
        style={{ padding: "10px" }} />
      <input
        type="password"
        placeholder="비밀번호 확인"
        onChange={e => {setWarning(false); setPwc(e.target.value);}}
        style={{ padding: "10px" }} />
      {warning && <div style={{color: "red"}}>비밀번호가 일치하지 않습니다</div>}
      <button onClick={register} style={{ padding: "10px" }}>회원가입</button>
      <button onClick={() => navigate("/")} style={{ padding: "10px" }}>뒤로 가기</button>
    </div>
  )
}

export default Register;