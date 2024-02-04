import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
};

const BASE_URL = "http://host.docker.internal:8080";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjQwNzA2LCJ1c2VySWQiOjQwNzA1LCJleHAiOjE3MDc2NTUzMTR9.fXsXB-iGfORPh0UAknC14DRmm6V2PwmtY8devXWG8qg";

export default function () {
    http.get(`${BASE_URL}/me`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        }
    );

    sleep(0.01);
};
