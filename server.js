const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./config/routes');

app.use('/api', routes);  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
