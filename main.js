
const auth = require("firebase-auth");

const jwt = require("jsonwebtoken");

const naver_auth = require("./naver_auth.js");

var admin = require("firebase-admin");
var serviceAccount = require("./a-living-dictionary-firebase-adminsdk-rw190-b718683ecf.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
// const request = require('request-promise');

const { Server } = require("@grpc/grpc-js");

const requestMeUrl = 'https://kapi.kakao.com/v2/user/me?secure_resource=true';

const port = '3001';
var app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

  

app.post('/kakao', async (req, res) => {
  const user = req.body;
  console.log(user.toString());
  
  const uid = `kakao:${user.uid}`;	// // 들어온 유저정보 uid바꾸기
  
  const updateParams = {    // 정보들 uid빼고 다시 가공
    // email: user.email,
    photoURL: user.photoURL,
    displayName: user.displayName
  };

  try {
    // 계정이 있는 경우 바뀐부분 update: 해당 id인 user의 데이터를 updateParam으로 업데이트
    await admin.auth().updateUser(uid, updateParams);
  } catch (e) {
    // 계정 없을 때 id지정하기. 
    updateParams['uid'] = uid;
    await admin.auth().createUser(updateParams);	// 여기 내용엔 id없는데, uid는 여기서 자동생성
  }
  
  const token = await admin.auth().createCustomToken(uid);// uid로 등록된 사용자의 토큰 만듦
  console.log(token);
  
  res.send(token);
})





app.get("/callbacks/naver/sign_in", (request, response) => {
  const redirect = `webauthcallback://success?${new URLSearchParams(request.query).toString()}`;
  console.log(redirect);
  response.redirect(307, redirect);
});

app.post("/callbacks/naver/token", (request, response) => {
  naver_auth.createFirebaseToken(request.body["accessToken"], (result) => {
    response.send(result);
  })
});


app.listen(port, () => {
   console.log(`server funning on https://logintest-aytgq.run.goorm.io/`);
})

