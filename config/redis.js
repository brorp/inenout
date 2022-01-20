const Redis = require("ioredis");

const url = process.env.REDIS_URL;

let redis = null;

async function connect() {
  redis = new Redis();
  return redis;
}

function getRedis() {
  return redis;
}

module.exports = {
  connect,
  getRedis,
};