const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const creds = require("../../config/config");
const auth = require("../../config/email_creds");
const keys = require("../../config/keys");
var sgTransport = require("nodemailer-sendgrid-transport");
const User = require("../../models/User");
const crypto = require("crypto");
const Mailchimp = require('mailchimp-api-v3');
var md5 = require('md5');

var transport = {
	service: "SendGrid",
	auth: {
		user: auth.NAME,
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

router.post("/subscribe", (req, res, next) =>{
	const api_key = keys.mailchimp
	const list_id = keys.list_id
	const mailchimp = new Mailchimp(api_key)
	mailchimp.post(`lists/${list_id}`, {members:[{
		email_address: req.body.email,
		status: "subscribed",
		merge_fields: {
			"FNAME": req.body.name,
		}
	}]}).then((result)=>{
		console.log(result)
		return res.send(result);
	}).catch((error)=>{
		return res.send(error)
	})
})

router.post("/send", (req, res, next) => {
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
	var content = `name: ${name} \n business: ${business} \n email: ${email} \n phone: ${phone} \n location: ${location} \n number needed: ${number} \n needed by: ${time} \n message: ${message}`;
	var images = req.body.images;

	var attachments = [
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
	];
	if (images) {
		images.forEach(function(item, index) {
			attachments.push({
				filename: "logo " + index + ".jpg",
				content: item.split("base64,")[1],
				encoding: "base64"
			});
		});
	}
	var mail = {
		from: "info@shocktrampoline.com",
		to: auth.ADMIN, //Change to email address that you want to receive messages on
		subject: "Someone Needs Some Socks!",
		text: content,
		attachments: attachments
	};

	const api_key = keys.mailchimp
	const list_id = keys.list_id
	const mailchimp = new Mailchimp(api_key)
	const hash = md5(email)
	mailchimp.patch(`lists/${list_id}/members/${hash}`, {
		merge_fields: {
			"FNAME": name,
			"PHONE": phone,
			"LOCATION": location,
			"BUSINESS": business,
			"RFQ": "Submitted",
			"SOURCE": "Socks"
		}
	}).then((result)=>{
		return res.send(result);
	}).catch((error)=>{
		return res.send(error)
	})

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				msg: "fail"
			});
		} else {
			console.log('success')
			res.json({
				msg: "success"
			});
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
