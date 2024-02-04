import http from 'k6/http';
import {sleep} from 'k6';

/**
 * k6 options
 * (ref. https://grafana.com/docs/k6/latest/using-k6/k6-options/reference)
 */
export const options = {
    vus: 100,
    duration: '30s',
};

/**
 * docker based k6에서 <localhost> 접근 시 <host.docker.internal> 로 접근
 */
const BASE_URL = "http://host.docker.internal:8080";

export default function () {
    http.get(`${BASE_URL}/docs/index.html`);
    sleep(0.1);
}