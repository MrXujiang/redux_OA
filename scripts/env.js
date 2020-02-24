// 环境参数,本地为true，测试环境为false
const isLocal = true;

const dev = {
    'rs': {
        '/wt':'http://192.168.0.166:8082',
    },
    'yk': {
        '/wt':'http://192.168.0.108:8081',
    }
}

const prod = {
    '/wt':'http://xxx.com',
}

const env = isLocal ? dev['yk'] : prod

module.exports = {env}
