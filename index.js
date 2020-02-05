const db = require("./db");
const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.static("public"));
app.use(
  express.json({
    limit: "1mb"
  })
);

// add a experiment response to the database
app.post("/", (request, response, next) => {
  const data = request.body;
  const now = new Date();

  const query = {
    text: "INSERT INTO responses(response, timestamp) VALUES($1, $2)",
    values: [data, now]
  };

  db.query(query.text, query.values, (err, response) => () {
    if (err) {
      return next(err)
    }
    res.send(res.rows[0])
  })
});
