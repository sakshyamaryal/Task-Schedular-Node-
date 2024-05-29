const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// require("./schedular1.js");
// require("./schedular2.js");
require("./schedular3.js");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
