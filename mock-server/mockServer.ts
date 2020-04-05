import express = require('express');
import bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/auth/login", (req, res) => {
  return res.send({
    key: "abc",
    user: {
      pii: "abc",
      username: "testuser",
      authorizations: [],
      patients: []
    }
  });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
