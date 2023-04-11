import axios from 'axios';
/*
  instance : new axios 객체 
  requestSuccess : 요청 성공
  requestFail : 요청 실패
  responseSuccess : 응답 성공
  responseFail : 응답 실패 
*/
const key = 'AIzaSyDk0LODxj0Ynf--W3VQ4VInHOTGY8_4KCk';
const API = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: { key },
});

export { API };
