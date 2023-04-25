import axios from 'axios';
import { loginDomain } from '../constants';
const signIn = (Email, Password) => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below

  // const postLogin = async () => {
  //   try {
  //     await axios.post(loginDomain, {
  //       Email, Password
  //     }).then(function (response) {
  //       // console.log(response, response.data);
  //       return response.data.authorization;
  //     });
  //   }
  //   catch (error) {
  //     console.error("Error LOGIN:", error);
  //   };

  // }
  // postLogin();

};

export const authService = {
  signIn,
};
