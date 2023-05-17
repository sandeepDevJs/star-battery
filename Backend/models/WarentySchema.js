const mongoose = require("mongoose");
const conn = require("../db/db");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const WarrantyClaimSchema = new mongoose.Schema(
	{
		ticket_no: { type: Number, unique: true, default: 1 },
		Name: { type: String, required: true },
		middle_name: { type: String, required: true },
		last_name: { type: String, required: true },
		contact: { type: String, required: true },
		battery_brand: { type: String, required: true },
		battery_type: { type: String, required: true },
		battery_serialNumber: { type: String, required: true },
		status: { type: String, required: true },
		front_image: { type: String, required: true },
		back_image: { type: String, required: true },
	},
	{ collection: "warenty_claims" }
);

// var connection = mongoose.createConnection("mongodb://127.0.0.1:27017/starbattery");
// autoIncrement.initialize(connection)
// WarrantyClaimSchema.plugin(AutoIncrement, {
//     inc_field: 'ticket_no'
// });

WarrantyClaimSchema.statics.GetAllClaims = async function () {
	const result = await this.find();
	if (result === null || !result) {
		return 404;
	}
	return result;
};

WarrantyClaimSchema.statics.CreateClaim = async function (data) {
	const lastClaim = await this.findOne().sort({ _id: -1 });
	const ticket_no = lastClaim ? lastClaim.ticket_no + 1 : 1;
	const claim = {
		ticket_no,
		...data,
	};
	try {
		const res = await new this(claim).save();

		return ticket_no;
	} catch (error) {
		if (error.code === 11000) {
			const matches = error.errmsg.match(/index:\s+(\w+)_/);
			if (matches && matches.length >= 2) {
				const field = matches[1];
				return `Duplicate key error on field "${field}"`;
			}
		} else {
			return error;
		}
		// return false;
	}
};

WarrantyClaimSchema.statics.GetCount = async function (status) {
	const resultPending = await this.find({ status: status });
	if (resultPending === null) {
		return "no data found";
	}
	return resultPending;
};

const warrantyClaims = mongoose.model("warrantyClaims", WarrantyClaimSchema);

module.exports = warrantyClaims;
