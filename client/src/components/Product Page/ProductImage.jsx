/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../../pages/Home/Banner/Banner.jsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate } from "react-router-dom";

const ProductImage = ({
    product,
    cartItems,
    productId,
    itemInWishlist,
    addToCartHandler,
    addToWishlistHandler,
}) => {
    const navigate = useNavigate();
    const { auth, setAuth, LogOut, isAdmin, isContextLoading } = useAuth();
    const itemInCart = cartItems.some((item) => item.productId === productId);

    const buyNow = () => {
        addToCartHandler();
        navigate("/cart");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    return (
        <div className="w-full lg:w-[35%] lg:sticky top-16 h-auto">
            {/* <!-- imgBox --> */}
            <div className="flex flex-col gap-3 m-3 ">
                <div className="w-full h-full pb-6 border relative">
                    <Slider {...settings}>
                        {product?.images.length > 1 ? (
                            product?.images?.map((item, i) => (
                                <img
                                    draggable="false"
                                    className="w-full h-96 object-contain"
                                    src={item.url}
                                    alt={product.name}
                                    key={i}
                                />
                            ))
                        ) : (
                            <img
                                draggable="false"
                                className="w-full h-96 object-contain"
                                src={product?.images[0]?.url}
                                alt={product?.name}
                            />
                        )}
                    </Slider>
                    <div
                        className={`absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full ${
                            isAdmin ? "hidden" : ""
                        } `}
                    >
                        <span
                            onClick={addToWishlistHandler}
                            className={`${
                                itemInWishlist
                                    ? "text-red-500"
                                    : "hover:text-red-500 text-gray-300"
                            } cursor-pointer`}
                        >
                            <FavoriteIcon sx={{ fontSize: "18px" }} />
                        </span>
                    </div>
                </div>

                <div className="w-full flex gap-3">
                    {/* <!-- add to cart btn --> */}
                    {product.stock > 0 && (
                        <button
                            onClick={itemInCart ? goToCart : addToCartHandler}
                            disabled={isAdmin}
                            className="disabled:cursor-not-allowed p-2 sm:p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-black rounded-sm shadow hover:shadow-lg"
                        >
                            <ShoppingCartIcon />
                            {itemInCart ? "GO TO CART" : "ADD TO CART"}
                        </button>
                    )}
                    <button
                        onClick={buyNow}
                        disabled={isAdmin || product.stock < 1}
                        className={`disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white rounded-sm shadow hover:shadow-lg p-4 ${
                            product.stock < 1
                                ? "w-full bg-gray-300 cursor-not-allowed"
                                : "w-1/2 bg-primary"
                        }`}
                    >
                        <FlashOnIcon />
                        {product?.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                    </button>
                    {/* <!-- add to cart btn --> */}
                </div>
            </div>
            {/* <!-- img box --> */}
        </div>
    );
};

export default ProductImage;
