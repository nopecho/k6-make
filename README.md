# Local K6 Maker

[K6 docs](https://grafana.com/docs/k6/latest/)

로컬 환경에서 K6를 사용하여 간단한 부하 테스트를 진행할 수 있도록 도와주는 스크립트입니다.

---

## Quick Start

### 1. init

```shell
make k6-init name=example
```

`/scripts` 경로에 부하 테스트를 위한 스크립트 파일이 생성됩니다.

`name=` 파라미터 부분을 수정하여 원하는 이름으로 변경할 수 있습니다.
> name 파라미터를 입력하지 않으면 기본값으로 `240101T000000-script` 형태로 생성됩니다.

### 2. edit

```javascript
// example.js

export const options = {
    vus: 100,
    duration: '30s',
};

export default function () {
    // 로컬 환경 테스트 시 localhost -> host.docker.internal 로 접근 해야합니다. (docker based host)
    http.get('http://host.docker.internal:8080/k6/test');

    sleep(0.1);
}

```

`/scripts` 경로에 생성된 스크립트 파일을 원하는 테스트 시나리오에 맞게 수정합니다.

자세한 테스트 스크립트 작성 방법은 [공식 문서](https://grafana.com/docs/k6/latest/using-k6/)에서
확인합니다. [options](https://grafana.com/docs/k6/latest/using-k6/k6-options/), [script](https://grafana.com/docs/k6/latest/javascript-api/)
등

### 3. run

```shell
make k6-run name=example
```

`/scripts` 경로에 존재하는 스크립트 파일을 기반으로 부하 테스트를 실행합니다.

### 4. report

부하 테스트 결과를 확인합니다.

부하 테스트 종료 시 자동으로 `/reports` 경로 하위에 결과 html 이 생성 되고, 브라우저를 통해 확인할 수 있습니다.

또는 아래와 같은 console 결과를 통해 확인할 수 있습니다.

```shell
     data_received..................: 573 kB 19 kB/s
     data_sent......................: 555 kB 19 kB/s
     http_req_blocked...............: avg=35.5µs   min=2.08µs  med=4.95µs   max=6.63ms  p(90)=10.87µs  p(95)=16.31µs 
     http_req_connecting............: avg=20.97µs  min=0s      med=0s       max=4.02ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=3.95ms   min=1.94ms  med=3.51ms   max=54.65ms p(90)=5.35ms   p(95)=6.48ms  
       { expected_response:true }...: avg=3.95ms   min=1.94ms  med=3.51ms   max=54.65ms p(90)=5.35ms   p(95)=6.48ms  
     http_req_failed................: 0.00%  ✓ 0         ✗ 1969
     http_req_receiving.............: avg=193.78µs min=31.79µs med=127.45µs max=3.95ms  p(90)=386.84µs p(95)=554.74µs
     http_req_sending...............: avg=45.38µs  min=9.5µs   med=25.62µs  max=3.83ms  p(90)=78.66µs  p(95)=132.69µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.72ms   min=1.8ms   med=3.29ms   max=53.84ms p(90)=5ms      p(95)=6.2ms   
     http_reqs......................: 1969   65.609959/s
     iteration_duration.............: avg=15.18ms  min=12.07ms med=14.71ms  max=66.37ms p(90)=16.93ms  p(95)=18.37ms 
     iterations.....................: 1969   65.609959/s
     vus............................: 1      min=1       max=1 
     vus_max........................: 1      min=1       max=1 
```