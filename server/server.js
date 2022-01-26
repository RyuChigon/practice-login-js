const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt_config = require("./config/secretkey");
const cors = require('cors');
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// 회원가입한 유저 목록
const userList = [];

// 회원가입
app.post("/api/signup", (req, res) => {
  const newUser = {
    id: req.body.id,
    pw: bcrypt.hashSync(req.body.pw, 10),
  };
  userList.push(newUser);
  res.json({ success: true });
});

// 로그인
app.post("/api/signin", (req, res) => {
  const user = userList.find(u => u.id === req.body.id);
  if (user === undefined) {
    res.json({ success: false });
    return;
  }

  const validPw = bcrypt.compareSync(req.body.pw, user.pw);

  if (!validPw) {
    res.json({ success: false });
    return;
  }

  const token = jwt.sign({ id: user.id }, jwt_config.secretKey, jwt_config.options);
  res.json({ success: true, token: token });
})

const token_verify = (req) => {
  if (req.headers["token"] === undefined) {
    console.log("header is undefined");
    return { success: false }
  }

  console.log("hello")
  const token = req.headers["token"].split(" ")[1];
  const verify = jwt.verify(token, jwt_config.secretKey, (err, decoded) => {
    if (err) {
      return { success: false }
    }
    return { success: true, decoded: decoded }
  })
  return verify
}

app.get("/api/validuser", async (req, res) => {
  console.log(req.header);
  console.log(req.headers);
  const decode = token_verify(req);

  if (!decode.success)
    res.json({ success: false });
  else
    res.json({ success: true, decode: decode });
})

app.listen(PORT, () => console.log(`server is on ${PORT}`));