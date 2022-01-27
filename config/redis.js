const Redis = require("ioredis");

let url = process.env.REDIS_URL;; 
if(process.env.NODE_ENV !== "production"){
  url = null;
}
let redis;

async function connect() {
  redis = new Redis(url);
  return redis;
}

function getRedis() {
  return redis;
}

module.exports = {
  connect,
  getRedis,
};