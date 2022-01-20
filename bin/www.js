const app = require('../app');
const { connect } = require('../config/redis');

const port = process.env.PORT || 3000;

connect().then(async () => {
  app.listen(port, () => console.log(`Listen on http://localhost:${port}`));
});