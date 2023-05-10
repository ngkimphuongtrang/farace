import axios from 'axios';
import { endpoints } from '../constants';

const signIn = (Email, Password) => {
  // this is a mock of an API call, in a real app
  // will be need connect with some real API,
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below

  const postLogin = async () => {
    var token, userId;
    try {
      console.log(endpoints.login, {
        Email, Password
      });
      await axios.post(endpoints.login, {
        Email, Password
      }).then(function (response) {
        console.log(response, response.data, response.data.authorization);
        token = response.data.authorization;
        userId = response.data.customerId;
      });
    }
    catch (error) {
      console.error("Error post login:", error);
    };
    return [token, userId];
  }
  return postLogin();

};

export const authService = {
  signIn,
};
