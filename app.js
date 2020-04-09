const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

const emails = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//getting emails
app.get("/emails", (req, res) => {
  res.send(emails);
});

//creating emails
app.post("/", (req, res) => {
  let email = req.body.email;

  if (emails.includes(email) === true) {
    res.send("Email already exists");
  } else {
    emails.push(email);
    res.send("Email added");
  }
});

//deleting emails

app.delete("/email/:emailid", (req, res) => {
  if (emails.includes(emailid) === true) {
    emails.splice(emails.indexOf(emailid), 1);

    res.redirect("/email");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
