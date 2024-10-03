/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductSlider from "../../pages/Home/ProductsListing/ProductSlider.jsx";
import Spinner from "../../components/Spinner";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { fashionProducts } from "../../utils/fashion";
import { electronicProducts } from "../../utils/electronics";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { useCart } from "../../context/cart";
import SeoData from "../../SEO/SeoData";
import ProductImage from "../Product Page/ProductImage.jsx";
import ProductDescription from "../Product Page/ProductDescription.jsx";

const ProductDetails = () => {
    const { auth, isAdmin, isContextLoading } = useAuth();
    const [cartItems, setCartItems, addItems] = useCart();

    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    const { productId } = useParams();

    const addToCartHandler = () => {
        const item = {
            productId: product._id,
            name: product.name,
            stock: product.stock,
            image: product.images[0].url,
            brandName: product.brand.name,
            price: product.price,
            discountPrice: product.discountPrice,
            seller: product.seller,
        };
        addItems(item, 1);
    };

    //fetch cart items
    useEffect(() => {
        //fetch wishlist items
        const fetchWishlistItems = async () => {
            try {
                // only id of wishlist products will get
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
                    {
                        headers: {
                            Authorization: auth.token,
                        },
                    }
                );
                setWishlistItems(res.data.wishlistItems);
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };
        auth.token && !isAdmin && fetchWishlistItems();
    }, [isContextLoading, auth.token, auth, isAdmin]);

    //fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/v1/product/${productId}`
                );
                // console.log(res.data.product);
                res.status === 201 && setProduct(res.data.product);
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
                // product not found
                error.response?.status === 404 &&
                    toast.error("Product Not Found!", {
                        style: {
                            top: "40px",
                        },
                    });

                //server error
                error.response?.status === 500 &&
                    toast.error(
                        "Something went wrong! Please try after sometime.",
                        {
                            style: {
                                top: "40px",
                            },
                        }
                    );
            }
        };
        fetchProduct();
    }, [productId]);

    let itemInWishlist = wishlistItems?.find((id) => id === productId);
    // Optimistic UI update
    const updateWishlistUI = (add) => {
        setWishlistItems((prev) =>
            add
                ? [...prev, product._id]
                : prev.filter((item) => item !== product._id)
        );
    };

    const addToWishlistHandler = async () => {
        let type = itemInWishlist ? "remove" : "add";
        try {
            // Update the UI before the API call
            updateWishlistUI(type === "add");
            const res = await axios.post(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/user/update-wishlist`,
                {
                    productId: productId,
                    type,
                },
                {
                    headers: {
                        Authorization: auth.token,
                    },
                }
            );
            // console.log(res);
            res.status === 201 &&
                toast.success(
                    type === "add"
                        ? "Product Added To Wishlist"
                        : "Product Removed From Wishlist",
                    {
                        style: {
                            top: "40px",
                        },
                    }
                );
        } catch (error) {
            console.log(error);
            // Revert UI update if there is an error
            updateWishlistUI(type !== "add");
            toast.error("Something went wrong!", {
                style: {
                    top: "40px",
                },
            });
        }
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <SeoData title={product?.name} />
                    <ScrollToTopOnRouteChange />
                    <main className="w-full">
                        {/* <!-- product image & description container --> */}
                        <div className="flex flex-col lg:flex-row bg-white sm:p-2 relative h-full items-start">
                            {/* <!-- image wrapper --> */}
                            <ProductImage
                                product={product}
                                itemInWishlist={itemInWishlist}
                                cartItems={cartItems}
                                productId={productId}
                                addToWishlistHandler={addToWishlistHandler}
                                addToCartHandler={addToCartHandler}
                            />
                            {/* <!-- image wrapper --> */}

                            {/* <!-- product desc wrapper --> */}
                            <ProductDescription
                                product={product}
                                productId={productId}
                            />
                            {/* <!-- product desc wrapper --> */}
                            {/* <!-- product image & description container --> */}
                        </div>

                        {/* Sliders */}
                        <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider
                                title={"Recommendation"}
                                products={[
                                    ...fashionProducts,
                                    ...electronicProducts,
                                ]}
                            />
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
