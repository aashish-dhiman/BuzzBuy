import { Route, Routes, useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import Users from "./Users";
import Deactivate from "../Auth/Deactivate";
import EditProduct from "./EditProduct";
import SeoData from "../../SEO/SeoData";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  useEffect(() => {
    if (window.location.pathname === "/admin/dashboard") {
      navigate("./profile");
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <SeoData title="Admin Dashboard" />
      <div className="h-full py-[5px]">
        <div className="flex h-full items-start justify-between gap-5 px-2 py-2 text-[14px] sm:px-[50px] sm:py-[40px]">
          <div
            className={`sm:w-[30%] ${
              isMenuOpen ? "relative z-50 h-full w-full bg-white" : "hidden"
            } sm:inline-block`}
          >
            <AdminMenu toggleMenu={toggleMenu} />
          </div>
          <div
            className={`h-full w-full rounded-sm bg-white shadow-md sm:w-[70%] ${
              isMenuOpen ? "hidden" : "block"
            }`}
          >
            <button
              onClick={toggleMenu}
              className="rounded px-2 py-2 text-lg text-blue-400 underline sm:hidden"
            >
              {isMenuOpen ? "Close" : <GiHamburgerMenu />}
            </button>
            <Routes>
              <Route path="" element={<UserProfile />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="address" element={<AddressComponent />} />
              <Route path="pan" element={<PanCardComponent />} />
              <Route path="add-product" element={<CreateProduct />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="users" element={<Users />} />
              <Route path="profile/deactivate" element={<Deactivate />} />
              <Route path="product/:productId" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
