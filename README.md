# 자취 백과사전
#### 2022-2 오픈소스 팀 모바일  
자취 백과사전의 서버 코드입니다.  
자취 백과사전: https://github.com/2022-opensourse-mobile/a_living_dictionary  

  - 목적: 각종 로그인 서버와 통신 
  - 사용 언어: node.js      
  - 서버 동작 예시:     
  
<div align="center">  
  
![server sequence diagram 1](https://user-images.githubusercontent.com/102962030/206472813-09a76a06-a58b-4bd2-8921-357661db0c51.png)
![server sequence diagram 2](https://user-images.githubusercontent.com/102962030/206472820-98665e88-e400-4468-bec2-8aa6faf87fcc.png)
   

</div>  

  
  - 코드 요약: 
    - /kakao: 로그인한 사용자 정보를 받고 카카오서버에 토큰요청을 보내고 토큰을 발급받아 response로 보냄
    - /callbacks/naver/sign_in: 네이버 웹 로그인
    - /callbacks/naver/token: 엑세스토큰을 이용하여 네이버서버에서 토큰을 발급받아 response로 보냄
