const express = require("express");
const router = express.Router();

const warrentyClaims = require("../models/WarentySchema");
const upload = require("../libs/multer");

router.post(
	"/save",
	upload.fields([
		{
			name: "front",
			maxCount: 1,
		},
		{
			name: "back",
			maxCount: 1,
		},
	]),
	async (req, res) => {
		const data = { ...req.body };

		const front_image = req.files.front[0].filename;
		const back_image = req.files.back[0].filename;

		const ticket_no = await warrentyClaims.CreateClaim({
			status: "pending",
			...data,
			front_image,
			back_image,
		});
		res.send({ message: "ticket successfully generated!", ticket_no });
	}
);

router.get("/tickets", async (req, res) => {
	const contact = req.query.contact;

	const data = await warrentyClaims.find({ contact });

	res.send(data);
});

router.get("/", async (req, res) => {
	const allClaims = await warrentyClaims.GetAllClaims();

	const page = parseInt(req.query.page);
	const limit = parseInt(req.query.limit);

	const startIndex = (page - 1) * limit;
	const lsatIndex = page * limit;

	const results = {};
	results.totalUser = allClaims.length;
	results.pageCount = Math.ceil(allClaims.length / limit);

	if (lsatIndex < allClaims.length) {
		results.next = {
			page: page + 1,
		};
	}
	if (startIndex > 0) {
		results.prev = {
			page: page - 1,
		};
	}

	results.result = allClaims.slice(startIndex, lsatIndex);
	console.log(results);
	if (allClaims === 404) {
		res.status(404).send("No data found");
	}
	res.send(results);
});

module.exports = router;
