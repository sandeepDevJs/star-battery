const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const config = require("../config");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { findOne } = require("../models/WarentySchema");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

router.get("/all", async (req, res) => {
	const AllUsers = await User.find({});

	res.status(200).send(AllUsers);
});

router.get("/single/:id", async (req, res) => {
	try {
		if (mongoose.isValidObjectId(req.params.id)) {
			const singleUser = await User.findOne({ _id: req.params.id });
			if (singleUser === null || !singleUser) {
				res.status(404).send("User Not Found");
			}
			res.status(200).send(singleUser);
		} else {
			res.status(404).send("User Not Found ,wrongID");
		}
	} catch (error) {
		if (
			error instanceof TypeError &&
			error.message.includes("Cannot read property 'toString' of null")
		) {
			// Handle the error here and display an appropriate message to the user
			res.status(404).send("User Not Found");
		} else {
			// Handle other types of errors
			console.log("Error fetching user data:", error);
		}
	}
});

router.delete("/delete/:id", async (req, res) => {
	const deleteUser = await User.deleteOne({ _id: req.params.id });
	if (deleteUser) {
		res.status(200).send("deleted successfully");
	} else {
		res.status(404).send("could Not deleted");
	}
});

router.post("/new", async (req, res) => {
	const data = await req.body;

	try {
		const FindDuplicateUser = await User.findOne({ username: data.Username });

		if (FindDuplicateUser) {
			res.status(409).send("Username already Exists");
		} else {
			const result = await User.createUser(data);

			if (!result) {
				res.status(403).send("Problem Creating User");
				return;
			}

			res.status(200).send("user Creted Successfully");
		}
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
