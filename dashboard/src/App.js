import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { QueryClientProvider, QueryClient } from "react-query";
import ListProducts from "./pages/listProducts/ListProducts";
import NewProduct from "./pages/newProduct/NewProduct";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
// import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<QueryClientProvider client={queryClient}>
			<div className={darkMode ? "app dark" : "app"}>
				<BrowserRouter>
					{/* <AuthProvider> */}
					<Routes>
						<Route path="/">
							<Route path="login" element={<LoginPage />} />
							<Route index element={<Home />} />
							<Route path="users">
								<Route index element={<List />} />
								<Route path="detail" element={<Single />} />
								<Route
									path="new"
									element={<New inputs={userInputs} title="Add New User" />}
								/>
							</Route>
							<Route path="products">
								<Route index element={<ListProducts />} />
								<Route path=":productId" element={<Single />} />
								<Route
									path="new"
									element={
										<NewProduct
											inputs={productInputs}
											title="Add New Product"
										/>
									}
								/>
							</Route>
						</Route>
					</Routes>
					{/* </AuthProvider> */}
				</BrowserRouter>
			</div>
		</QueryClientProvider>
	);
}

export default App;
