import { Route,Redirect } from "react-router-dom";


const PrivateRoute=({children,...rest})=>{
    console.log('okk');
    return(
    <Route {...rest}>{children}</Route>
    )
}

export default PrivateRoute