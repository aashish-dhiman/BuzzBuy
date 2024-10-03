import mobiles from "../../assets/images/Categories/phone.png";
import fashion from "../../assets/images/Categories/fashion.png";
import electronics from "../../assets/images/Categories/electronics.png";
import home from "../../assets/images/Categories/home.png";
import travel from "../../assets/images/Categories/travel.png";
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
        <section className="bg-white py-6 min-w-full px-12 shadow overflow-x-auto space-y-4">
            <div className="text-primary flex items-center gap-3">
                <span className="w-3 h-7 bg-primary rounded-sm"></span>
                <span className="text-sm font-bold">Categories</span>
            </div>
            <div>
                <h3 className="text-2xl font-bold">Browse By Category</h3>
            </div>
            <div className="flex items-center justify-between group">
                {catNav.map((item, i) => (
                    <Link
                        to={`/products?category=${item.name}`}
                        className="flex flex-col gap-1 items-center p-2"
                        key={i}
                    >
                        <div className="h-16 w-16 ">
                            <img
                                draggable="false"
                                className="h-full w-full object-contain"
                                src={item.icon}
                                alt={item.name}
                            />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
