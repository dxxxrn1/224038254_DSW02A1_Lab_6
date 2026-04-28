const express = require("express");
const fs = require("fs");
const path = require("path");

const { validateName, validatePassword, validateID } = require("./validate");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  save input onto form
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "protectaccess.html");

  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error loading redirect page ");
    }
  });
});

//Process form data &&&&run checks fron mdoule
app.post("/protectaccess", (req, res) => {
  // get data req.body!
  const name = req.body.name;
  const password = req.body.pw;
  const idNumber = req.body.IDnumber;

  console.log("user Input:", req.body);

  let checkLogin = "";
  const nameValid = validateName(name);
  const passwordValid = validatePassword(password);
  const idValid = validateID(idNumber);

  // const cleanID = idNumber.split("-").join("").split(".").join("");
  const cleanID = idNumber.replace(/[-.]/g, "");

  const maskedPassword = password.replace(/./g, "*");

  if (nameValid && passwordValid && idValid) {
    checkLogin = "Successful";
  } else {
    checkLogin = "Access denied, invalid data";
  }

  const resultOutput = `${checkLogin} - ${name}, ${maskedPassword}, ${cleanID}\n`;
  fs.appendFileSync("accessresults.txt", resultOutput, "utf8");

  const resultFile = fs.readFileSync("accessresults.txt", "utf8");

  const formattedResults = resultFile.split("\n").join("<br>");
  // if (nameValid && pwValid && idValid) {
  // }

  if (checkLogin === "Successful") {
    res.send(`
      <h1 style="color: green">Successful</h1>
      <p>${name}, ${maskedPassword}, ${cleanID}</p>
      <h3>Access Results Log:</h3>
      <p>${formattedResults}</p>
    `);
  } else {
    res.send(`
      <h1 style="color:red">Access Denied! Invalid Data</h1>
      <p>${name}, ${maskedPassword}, ${cleanID}</p>
      <h3>Access Results: </h3>
      <p>${formattedResults}</p>
    `);
  }
});

// Start
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});

//node server.js
//Express server running at http://localhost:3000/
