const express = require("express");
const path = require("path");
const conn = require("./db/db");
const app = express();
const bodyParser = require("body-parser");
const Login = require("./router/login");
const getcount = require("./router/getCountClaims");
const getUser = require("./router/getUser");
const warrentyClaims = require("./router/warrentyClaims");
const ManageUser = require("./router/ManageUser");
const logout = require("./router/logout");

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/login", Login);
app.use("/getUserInfo", getUser);
app.use("/getClaimCount", getcount);
app.use("/getWarrentyClaims", warrentyClaims);
app.use("/user", ManageUser);
app.use("/logout", logout);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
