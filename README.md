# 자취 백과사전
#### 2022-2 오픈소스 팀 모바일  
자취 백과사전의 서버 코드입니다.  
자취 백과사전: https://github.com/2022-opensourse-mobile/a_living_dictionary  

  - 목적: 각종 로그인 서버와 통신 
  - 사용 언어: node.js      
  - 서버 동작 예시:     
  
![server sequence diagram 1](https://user-images.githubusercontent.com/102962030/206417788-62545f7f-7c42-4a17-8284-ee59e8cea829.png)
![server sequence diagram 3](https://user-images.githubusercontent.com/102962030/206436861-c25b5d69-dfa8-4f23-9153-60cb4ee9c503.png)


  이후 발급받은 토큰으로 로그인 진행
  
  - 코드 요약: 
    - /kakao: 로그인한 사용자 정보를 받고 카카오서버에 토큰요청을 보내고 토큰을 발급받아 response로 보냄
    - /callbacks/naver/sign_in: 네이버 웹 로그인
    - /callbacks/naver/token: 엑세스토큰을 이용하여 네이버서버에서 토큰을 발급받아 response로 보냄
