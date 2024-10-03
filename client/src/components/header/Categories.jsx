import mobiles from "../../assets/images/Categories/phone.png";
import fashion from "../../assets/images/Categories/fashion.png";
import electronics from "../../assets/images/Categories/electronics.png";
import home from "../../assets/images/Categories/home.png";
import appliances from "../../assets/images/Categories/appliances.png";
import furniture from "../../assets/images/Categories/furniture.png";
import beauty from "../../assets/images/Categories/beauty.png";
import grocery from "../../assets/images/Categories/grocery.png";
import { Link } from "react-router-dom";

const catNav = [
    {
        name: "Mobiles",
        icon: mobiles,
    },
    {
        name: "Electronics",
        icon: electronics,
    },
    {
        name: "Fashion",
        icon: fashion,
    },
    {
        name: "Home",
        icon: home,
    },
    {
        name: "Appliances",
        icon: appliances,
    },
    {
        name: "Furniture",
        icon: furniture,
    },
    {
        name: "Beauty,Toys & more",
        icon: beauty,
    },
    {
        name: "Grocery",
        icon: grocery,
    },
];

const Categories = () => {
    return (
        <section className="bg-white px-3 sm:px-6 py-0 w-full shadow space-y-4">
            <div className="pt-6">
                <div className="text-primary flex items-center gap-3">
                    <span className="w-3 h-7 bg-primary rounded-sm"></span>
                    <span className="text-sm font-bold">Categories</span>
                </div>
            </div>
            <div className="">
                <div>
                    <h3 className=" text-xl sm:text-2xl font-bold">
                        Browse By Category
                    </h3>
                </div>
                <div className="flex items-center justify-between overflow-x-auto py-2">
                    {catNav.map((item, i) => (
                        <Link
                            to={`/products?category=${item.name}`}
                            className="flex flex-col gap-1 items-center justify-between p-3 group"
                            key={i}
                        >
                            <div className="h-20 w-20 ">
                                <img
                                    className="h-full w-full object-contain rounded-xl group-hover:scale-[1.05] transition-all duration-200 ease-in-out"
                                    src={item.icon}
                                    alt={item.name}
                                />
                            </div>
                            <span className="text-sm text-gray-800 font-medium text-center group-hover:text-primary transition-all duration-200 ease-in-out">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
