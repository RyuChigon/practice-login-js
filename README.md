# practice-login-js

로그인 기능 구현 프로젝트

## Framework

- Frontend: React Javascript

- Backend: Node Express

- Important modules: `jsonwebtoken`(토큰 발행), `bcryptjs`(비밀번호 암호화)

## Important Function

- 회원가입시 비밀번호 암호화(해시) 저장

- 로그인시 토큰 발행

- 로그인 하지 않은 유저가 메인 페이지 접속시 로그인 페이지로 자동 이동

- 로그인 이후 서비스 이용을 위한 api요청시 토큰 확인
