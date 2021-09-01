const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const nodemailer = require("nodemailer")
const app = express();
require("dotenv").config()

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post("/send_mail", cors(), async (req, res) => {
	let { text } = req.body
  let mailList = [];
  let mailHolder = text.mailList;
	const transport = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	})

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: "sahidularif1@gmail.com",
		subject: text.subject,
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Greetings from Technext Limited!</h2>
        <p>${text.message}</p>
    
        <p>All the best<br/>
        <address>Sahidul Arif</address>
        </p>
         </div>
    `
	})
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});