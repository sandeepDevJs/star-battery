import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { Link } from "react-router-dom";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";
import decryptToken from "../../userInfo";

const Sidebar = () => {
	const navigate = useNavigate();
	async function Logout() {
		const result = await decryptToken();

		const isStatusChanged = await axios.post(
			`${API_URL}logout`,
			{ id: result._id },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (isStatusChanged) {
			await Cookies.remove("token");
			window.location.href = "/login";
		} else {
			alert("problem logging out");
		}
	}

	return (
		<div className="sidebar">
			<div className="top">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="logo">
						<img
							src={require("./logo.png")}
							alt="star battery"
							style={{ paddingTop: "5px", width: "100px", height: "auto" }}
						/>
					</span>
				</Link>
			</div>
			<hr />
			<div className="center">
				<ul>
					<p className="title">MAIN</p>
					<li>
						<Link to="/" style={{ textDecoration: "none" }}>
							<DashboardIcon className="icon" />
							<span>Dashboard</span>
						</Link>
					</li>
					<p className="title">CLAIMS</p>
					<Link to="/users" style={{ textDecoration: "none" }}>
						<li>
							<TaskAltIcon className="icon" />
							<span>Users</span>
						</li>
					</Link>
					<Link to="/products" style={{ textDecoration: "none" }}>
						<li>
							<AddTaskIcon className="icon" />
							<span>Register Claim</span>
						</li>
					</Link>
					{/* <li>
						<TaskAltIcon className="icon" />
						<span>Recieved Claims</span>
					</li>
					<li>
						<TaskAltIcon className="icon" />
						<span>Pending Claims</span>
					</li>
					<p className="title">SALE REGISTRATION</p>
					<li>
						<AddTaskIcon className="icon" />
						<span>Add Sale</span>
					</li>
					<li>
						<SearchIcon className="icon" />
						<span>Search Sale</span>
					</li>
					<p className="title">WARRANTY CLAIM SEARCH</p>
					<li>
						<AddTaskIcon className="icon" />
						<span>Register Claim</span>
					</li>
					<li>
						<SearchIcon className="icon" />
						<span>Search Claim</span>
					</li>
					<li>
						<AddTaskIcon className="icon" />
						<PsychologyOutlinedIcon className="icon" />
						<span>Logs</span>
					</li> */}
					<p className="title">USER</p>
					<li>
						<ExitToAppIcon className="icon" />
						<span>
							<a href="#" onClick={() => Logout()}>
								Logout
							</a>
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
