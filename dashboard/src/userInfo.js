import React from "react";
import Cookies from "js-cookie";
import { Encryption_KEY } from "./config";
import CryptoJS from "crypto-js";
import {JWT_SECRET_KEY} from "./config"
// import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";


// The Token Stored in cookies will be decoded here and will return the decoded data

async function decryptToken() {
  const token = await Cookies.get("token");

  if (token != null) {
    const decoded = await jwt_decode(token);
    // console.log(decoded)
    const decryptedPayload = await CryptoJS.AES.decrypt(decoded.payload, JWT_SECRET_KEY).toString(CryptoJS.enc.Utf8);

    const userData = await JSON.parse(decryptedPayload);
    console.log(userData)
    return userData;
  } else {
    console.log("User is not logged in");
    return null;
  }
}




export default decryptToken