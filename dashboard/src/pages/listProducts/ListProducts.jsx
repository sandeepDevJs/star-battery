import "./listProducts.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ProductDataTable from "../../components/ProductDataTable/ProductDataTable";
import Table from "../../components/table/Table";

const ListProducts = () => {
	return (
		<div className="list">
			<Sidebar />
			<div className="listContainer">
				<Navbar />
				{/* <ProductDataTable/> */}
				<Table />
			</div>
		</div>
	);
};

export default ListProducts;
