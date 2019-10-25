const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const creds = require("../../config/config");
const auth = require("../../config/email_creds");
var sgTransport = require("nodemailer-sendgrid-transport");
const User = require("../../models/User");
const crypto = require("crypto");

var transport = {
	service: "SendGrid",
	auth: {
		user: auth.USER,
		pass: auth.PASS
	}
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take messages");
	}
});

router.post("/send", (req, res, next) => {
	console.log(req);
	var name = req.body.name;
	var business = req.body.business;
	var email = req.body.email;
	var phone = req.body.phone;
	var location = req.body.location;
	var message = req.body.message;
	var number = req.body.number;
	var time = req.body.time;
	var side = String(req.body.side);
	var bottom = String(req.body.bottom);
	var top = String(req.body.top);
	var img = String(req.body.img);
	var content = `name: ${name} \n business: ${business} \n email: ${email} \n phone: ${phone} \n location: ${location} \n number needed: ${number} \n needed by: ${time} \n message: ${message}`;

	var mail = {
		from: email,
		to: auth.ADMIN, //Change to email address that you want to receive messages on
		subject: "Someone Needs Some Socks!",
		text: content,
		attachments: [
			{
				filename: business + "-side-view.jpg",
				content: side.split("base64,")[1],
				encoding: "base64"
			},
			{
				filename: business + "-bottom-view.jpg",
				content: bottom.split("base64,")[1],
				encoding: "base64"
			},
			{
				filename: business + "-top-view.jpg",
				content: top.split("base64,")[1],
				encoding: "base64"
			}
		]
	};

	var confirmation = {
		from: "sales@shocktrampoline.com",
		to: email,
		subject: "Thanks for your submission to Shock!",
		text:
			"Thanks for your submission, our sales team will be in contact soon!"
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				msg: "fail"
			});
		} else {
			res.json({
				msg: "success"
			});
			transporter.sendMail(confirmation);
		}
	});
});

router.post("/bug", (req, res, next) => {
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	var content = `name: ${name} \n email: ${email} \n message: ${message} `;

	var mail = {
		from: "info@shocktrampoline.com",
		to: "mike@highrevapplications.com", //Change to email address that you want to receive messages on
		subject: "Something is Broken On Shock Park Builder!",
		text: content
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				msg: "fail"
			});
		} else {
			res.json({
				msg: "success"
			});
		}
	});
});

router.post("/reset", (req, res, next) => {
	var email = req.body.email;
	var host = req.body.host;
	var link = "";
	var token = "";
	var details = {};
	console.log(email);
	if (email === "") {
		return res.status(400).json({ email: "Email Required" });
	}
	User.findOne({ email }).then(user => {
		if (user === null) {
			return res.status(400).json({ email: "That Email Does Not Exist" });
		} else {
			token = crypto.randomBytes(20).toString("hex");
			details = {
				resetPasswordToken: token,
				resetPasswordExpires: Date.now() + 360000
			};
			User.updateOne({ email }, details).then(user =>
				console.log("User Updated")
			);
			link = "http://" + host + "/reset/" + token;
		}
		var mail = {
			from: "info@shocktrampoline.com",
			to: email,
			subject: "Shock Park Builder Password Reset",
			html:
				`<p>Hello! \n Please click the following link or paste it in your browser to reset your password for the Shock Park Builder</p> \n\n` +
				`<a href=${link}> Reset Password </a>`
		};

		transporter.sendMail(mail, (err, data) => {
			if (err) {
				res.json({
					msg: "fail"
				});
			} else {
				res.json({
					msg: "success"
				});
			}
		});
	});
});

createComponentList = items => {
	let array = [];
	Object.keys(items).forEach(function(key) {
		array.push(`\n ${key}: ${items[key]}`);
	});
	return array;
};

module.exports = router;
