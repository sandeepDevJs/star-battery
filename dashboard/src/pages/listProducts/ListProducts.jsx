import "./listProducts.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ProductDataTable from "../../components/ProductDataTable/ProductDataTable"

const ListProducts = () => {
  return (
    <div className="list">
      
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductDataTable/>
      </div>
    </div>
  )
}

export default ListProducts