/* eslint-disable react/prop-types */
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
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductDescription = ({ product, productId }) => {
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleDialogClose = () => {
        setOpen(!open);
    };

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            toast.error("Empty Review", {
                style: {
                    top: "40px",
                },
            });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);

        setOpen(false);
    };
    return (
        <div className="py-2 px-3 lg:flex-1 w-full">
            {/* <!-- whole product description --> */}
            <div className="flex flex-col gap-3 mb-4">
                <h2 className="text-lg sm:text-xl">{product?.name}</h2>
                {/* <!-- rating badge --> */}
                <span className="text-md text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-primaryGreen rounded-sm text-white flex items-center gap-0.5">
                        {product?.ratings?.toFixed(1)}
                        <StarIcon sx={{ fontSize: "12px" }} />
                    </span>
                    <span>{product?.numOfReviews} Reviews</span>
                </span>
                {/* <!-- rating badge --> */}

                {/* <!-- price desc --> */}
                <div className="flex flex-col text-3xl">
                    <span className="text-primaryGreen text-sm font-medium">
                        Special Price
                    </span>
                    <div className="flex items-baseline gap-2 text-3xl font-medium">
                        <span className="text-gray-800">
                            ₹{product?.discountPrice?.toLocaleString()}
                        </span>
                        <span className="text-base text-gray-500 line-through">
                            ₹{product?.price?.toLocaleString()}
                        </span>
                        <span className="text-base text-primaryGreen">
                            {getDiscount(
                                product?.price,
                                product?.discountPrice
                            )}
                            %&nbsp;off
                        </span>
                    </div>
                </div>
                {product?.stock <= 10 && product?.stock > 0 && (
                    <span className="text-red-500 text-sm font-medium">
                        Hurry, Only {product.stock} left!
                    </span>
                )}
                {/* <!-- price desc --> */}

                {/* <!-- banks offers --> */}
                <p className="text-md font-[600]">Available offers</p>

                {[
                    "Flat ₹200 off on HDFC Bank Credit/Debit Card on 3 months EMI Txns, Min Txn Value ₹10,000",
                    "10% Instant Discount on ICICI Bank Credit Card Txns, up to ₹1250, on orders of ₹5000 and above",
                    "Flat ₹500 off on HDFC Bank Credit/Debit Card on 6 months EMI Txns, Min Txn Value ₹10,000",
                ].map((el, i) => (
                    <div
                        className="flex gap-2 text-xs sm:text-sm leading-4"
                        key={i}
                    >
                        <div className="whitespace-nowrap flex items-start">
                            <LocalOfferIcon
                                sx={{
                                    fontSize: "16px",
                                }}
                                style={{
                                    color: "#16bd49",
                                    marginTop: "2px",
                                }}
                            />
                            <span className="ml-1 font-semibold">
                                Bank Offer
                            </span>
                        </div>
                        <div className="flex items-start text-sm">
                            <span>
                                {el}
                                <Link
                                    className="text-primary text-[12px] font-medium ml-1"
                                    to="./"
                                >
                                    T&C
                                </Link>
                            </span>
                        </div>
                    </div>
                ))}
                {/* <!-- banks offers --> */}

                {/* <!-- warranty & brand --> */}
                <div className="flex gap-8 mt-2 items-center text-sm">
                    <img
                        draggable="false"
                        className="w-20 h-8 p-0.5 border object-contain"
                        src={product.brand?.logo.url}
                        alt={product?.brand?.name}
                    />
                    <span>
                        {product?.warranty === 0
                            ? "No Warranty"
                            : `${product?.warranty} Year Brand Warranty`}
                    </span>
                    <Link className="font-medium text-primary   -ml-5" to="/">
                        Know More
                    </Link>
                </div>
                {/* <!-- warranty & brand --> */}

                {/* <!-- delivery details --> */}
                <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Delivery</p>
                    <span>Delivery by {getDeliveryDate()} | ₹ 40</span>
                </div>
                {/* <!-- delivery details --> */}

                {/* <!-- highlights & services details --> */}
                <div className="flex flex-col sm:flex-row justify-between">
                    {/* <!-- highlights details --> */}
                    <div className="flex gap-16 mt-4 items-stretch text-sm">
                        <p className="text-gray-500 font-medium">Highlights</p>

                        <ul className="list-disc flex flex-col gap-2 w-64">
                            {product?.highlights?.map((highlight, i) => (
                                <li key={i}>
                                    <p>{highlight}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <!-- highlights details --> */}

                    {/* <!-- services details --> */}
                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                        <p className="text-gray-500 font-medium">Services</p>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <p className="flex items-center gap-3">
                                    <span className="text-primary  ">
                                        <VerifiedUserIcon
                                            sx={{
                                                fontSize: "18px",
                                            }}
                                        />
                                    </span>{" "}
                                    {product?.warranty} Year Brand Warranty
                                </p>
                            </li>
                            <li>
                                <p className="flex items-center gap-3">
                                    <span className="text-primary  ">
                                        <CachedIcon
                                            sx={{
                                                fontSize: "18px",
                                            }}
                                        />
                                    </span>{" "}
                                    7 Days Replacement Policy
                                </p>
                            </li>
                            <li>
                                <p className="flex items-center gap-3">
                                    <span className="text-primary  ">
                                        <CurrencyRupeeIcon
                                            sx={{
                                                fontSize: "18px",
                                            }}
                                        />
                                    </span>{" "}
                                    Cash on Delivery available
                                </p>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- services details --> */}
                </div>
                {/* <!-- highlights & services details --> */}

                {/* <!-- seller details --> */}
                <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Seller</p>
                    <Link className="font-medium text-primary   ml-3" to="/">
                        {product?.brand?.name}
                    </Link>
                </div>
                {/* <!-- seller details --> */}

                {/* <!-- flipkart plus banner --> */}
                {/* <div className="lg:w-1/2 mt-4 border">
                                        <img
                                            draggable="false"
                                            className="w-full h-full object-fill"
                                            src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png"
                                            alt="flipkart plus"
                                        />
                                    </div> */}
                {/* <!-- flipkart plus banner --> */}

                {/* <!-- description details --> */}
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                    <p className="text-gray-500 font-medium">Description</p>
                    <span>{product?.description}</span>
                </div>
                {/* <!-- description details --> */}

                {/* <!-- specifications border box --> */}
                <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-[600]">
                        Specifications
                    </h1>
                    <h1 className="px-6 py-3 text-lg">General</h1>

                    {/* <!-- specs list --> */}
                    {product?.specifications?.map((spec, i) => (
                        <div
                            className="px-6 py-2 flex items-center text-sm"
                            key={i}
                        >
                            <p className="text-gray-500 w-3/12">{spec.title}</p>
                            <p className="flex-1">{spec.description}</p>
                        </div>
                    ))}
                    {/* <!-- specs list --> */}
                </div>
                {/* <!-- specifications border box --> */}

                {/* <!-- reviews border box --> */}
                <div className="w-full mt-4 rounded-sm border flex flex-col">
                    <div className="flex justify-between items-center border-b px-6 py-4">
                        <h1 className="text-2xl font-medium">
                            Ratings & Reviews
                        </h1>
                        <button
                            onClick={handleDialogClose}
                            className="shadow bg-white font-[500] px-4 py-2 rounded-sm hover:shadow-md border"
                        >
                            Rate Product
                        </button>
                    </div>

                    <Dialog
                        aria-labelledby="review-dialog"
                        open={open}
                        onClose={handleDialogClose}
                    >
                        <DialogTitle className="border-b">
                            Submit Review
                        </DialogTitle>
                        <DialogContent className="flex flex-col m-1 gap-4">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                                precision={0.5}
                            />
                            <TextField
                                label="Review"
                                multiline
                                rows={3}
                                sx={{ width: 400 }}
                                size="small"
                                variant="outlined"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <button
                                onClick={handleDialogClose}
                                className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={reviewSubmitHandler}
                                className="py-2 px-6 rounded bg-[#FB641B] hover:bg-[#ff7f54] text-white shadow uppercase"
                            >
                                Submit
                            </button>
                        </DialogActions>
                    </Dialog>

                    <div className="flex items-center border-b">
                        <h1 className="px-6 py-3 text-3xl font-semibold">
                            {product?.ratings?.toFixed(1)} <StarIcon />
                        </h1>
                        <p className="text-lg text-gray-500">
                            ({product?.numOfReviews}) Reviews
                        </p>
                    </div>

                    {viewAll
                        ? product?.reviews
                              ?.map((rev, i) => (
                                  <div
                                      className="flex flex-col gap-2 py-4 px-6 border-b"
                                      key={i}
                                  >
                                      <Rating
                                          name="read-only"
                                          value={rev.rating}
                                          readOnly
                                          size="small"
                                          precision={0.5}
                                      />
                                      <p>{rev.comment}</p>
                                      <span className="text-sm text-gray-500">
                                          by {rev.name}
                                      </span>
                                  </div>
                              ))
                              .reverse()
                        : product.reviews
                              ?.slice(-3)
                              .map((rev, i) => (
                                  <div
                                      className="flex flex-col gap-2 py-4 px-6 border-b"
                                      key={i}
                                  >
                                      <Rating
                                          name="read-only"
                                          value={rev.rating}
                                          readOnly
                                          size="small"
                                          precision={0.5}
                                      />
                                      <p>{rev.comment}</p>
                                      <span className="text-sm text-gray-500">
                                          by {rev.name}
                                      </span>
                                  </div>
                              ))
                              .reverse()}
                    {product.reviews?.length > 3 && (
                        <button
                            onClick={() => setViewAll(!viewAll)}
                            className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                        >
                            {viewAll ? "View Less" : "View All"}
                        </button>
                    )}
                </div>
                {/* <!-- reviews border box --> */}
            </div>
        </div>
    );
};

export default ProductDescription;
