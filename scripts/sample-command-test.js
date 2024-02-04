import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    vus: 100,
    duration: '30s',
};

const BASE_URL = "http://host.docker.internal:8080";

export default function () {
    const body = {
        userId: uuid(),
        password: "password",
        name: "username",
        regNo: "961112-1234567"
    };

    http.post(`${BASE_URL}/signup`,
        JSON.stringify(body),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    sleep(0.1);
};

function uuid() {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
