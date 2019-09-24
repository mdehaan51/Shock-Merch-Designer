const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const creds = require("./config/config");

const users = require("./routes/api/users");
const mailer = require("./routes/api/mailer");
const path = require("path");
const Sentry = require("@sentry/node");

require("dotenv").config();

const app = express();
// Bodyparser middleware

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 50000
	})
);
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "client", "build")));

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/mailer", mailer);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
