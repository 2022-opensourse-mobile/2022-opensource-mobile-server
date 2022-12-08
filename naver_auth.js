'use strict'

// const admin = require('./firebase_admin.js');
const Async = require('async');
const axios = require('axios');

var admin = require("firebase-admin");


const naverRequestMeUrl = 'https://openapi.naver.com/v1/nid/me'

function requestMe(naverAccessToken,callback) {
  console.log('Requesting user profile from Naver API server. '+ naverAccessToken)
  return axios.get(naverRequestMeUrl,{
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + naverAccessToken}
  }).then((result)=>{
    callback(null,result.data,result);
  });
}


function createFirebaseToken(naverAccessToken,callback) {

  Async.waterfall([
    (next)=>{
      requestMe(naverAccessToken,(error,response,boy)=>{
        console.log(response)
        const body =response.response // JSON.parse(response)
        console.log(body)
        const userId = `naver:${body.id}`
        if (!userId) {
          return response.status(404)
          .send({message: 'There was no user with the given access token.'})
        }
        let nickname = null

        const updateParams = {
          uid :userId,
          email :body.email,
          provider: 'NAVER',
          displayName: '',
        };
        if (body.nickname) {
          updateParams['displayName'] = body.nickname;
        } else {
          updateParams['displayName'] = body.email;
        }
        if (body.profile_image) {
          updateParams['photoURL'] = body.profile_image;
        }

        next(null,updateParams)
      });
    },
    (userRecord, next) => {
      console.log(userRecord.email);
      admin.auth().getUserByEmail(userRecord.email).then((userRecord)=>{
        next(null,userRecord);
      }).catch((error)=>{
        console.log(error);
        admin.auth().createUser(userRecord).then((user)=>{
          next(null,user)
        })
      })
    },
    (userRecord, next) => {
      console.log(userRecord);
      console.log("**************");
      const userId = userRecord.uid
      console.log(`creating a custom firebase token based on uid ${userId}`)
      admin.auth().createCustomToken(userId, {provider: 'NAVER'}).then((result)=>{
        console.log(result);  
        next(null , result);
      });
    }
  ],(err, results) => {
      console.log(results)
      callback(results);
  });

}

module.exports={
  createFirebaseToken
}
