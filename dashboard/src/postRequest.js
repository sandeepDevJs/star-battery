import axios from "axios";
import React from "react";
import {useQuery } from "react-query";
import { useMutation } from "react-query";
import { API_URL } from './config'

export const AddUser = ()=>{

    const query=(data)=>{

        return axios.post(`${API_URL}user/new/`,data,{
            headers: {
              'Content-Type': 'application/json'
            }
          })
    }

    return useMutation(query)
}