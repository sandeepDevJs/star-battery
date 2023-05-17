import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Widget = ( props ) => {
  let data;

  //temporary
  // const amount = 100;
  const diff = 20;

  switch (props.type) {
    case "ClaimRegistered":
      data = {
        title: "Registered",
        link: "See all Registered Claims",
        icon: (
          <ArrowDropDownIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
      };
      break;
    case "ClaimAccepted":
      data = {
        title: "Accepted",
        link: "View all Accepted Claims",
        icon: (
          <ArrowDropDownIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "ClaimRecieved":
      data = {
        title: "Recieved",
        link: "View all Recieved Claims",
        icon: (
          <ArrowDropDownIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "ClaimPending":
      data = {
        title: "Pending",
        link: "View all Pending Claims",
        icon: (
          <ArrowDropDownIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "Crimson",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
           {props.count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
