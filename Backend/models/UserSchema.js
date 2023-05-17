const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		username: { type: String, default: 18, unique: true },
		issuperuser: { type: Boolean, default: false },
		isstaff: { type: Boolean, default: true },
		date_joinned: { type: Date, default: Date.now },
		isactive: { type: Boolean, default: false },
		last_login: { type: Date, default: Date.now },
		password: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
	},
	{ collection: "Users" }
);

userSchema.statics.createUser = async function (data) {
	try {
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(data.Password, salt);
		const user = {
			first_name: data.Name,
			last_name: data.Surname,
			username: data.Username,
			password: password,
			email: data.Email,
			phone: data.Phone,
			...data,
		};
		const result = await new this(user);
		result.save();
		return 200;
	} catch (err) {
		console.log(err);
		if (err.code === 11000) {
			return 409;
		}
	}
};

userSchema.statics.GetUser = async function (data) {
	const resultData = await this.findOne({ username: data.username });
	// let status
	if (!resultData) {
		return 401;
	} else {
		console.log(resultData.password);
		const passwordMatch = await bcrypt.compare(
			data.password,
			resultData.password
		);
		if (passwordMatch) {
			return resultData;
		} else {
			return 401;
		}
	}
};

const User = mongoose.model("User", userSchema);
module.exports = User;
