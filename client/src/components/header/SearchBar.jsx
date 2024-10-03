import { BsSearch } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const dialogRef = useRef(null);
    const inputRef = useRef(null); // Add a ref for the input field

    const handleSearch = async (query) => {
        try {
            const products = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/v1/product/search/${query}`
            );
            setResults(products?.data?.slice(0, 6));
        } catch (error) {
            console.error("Error searching for products:", error);
        }
    };

    let timeout = useRef(null);
    const debounce = function (cb, delay) {
        return (...args) => {
            if (timeout.current) clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                cb(...args);
            }, delay);
        };
    };

    const debouncedSearch = debounce(handleSearch, 200);

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim() === "") {
            setResults([]);
            return;
        }

        debouncedSearch(newQuery);
    };

    useEffect(() => {
        function handleClick(e) {
            // Close the dropdown only if clicked outside the input and the dialog
            if (
                dialogRef.current &&
                !dialogRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        }
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <div className="w-full sm:w-[60%] relative flex flex-col items-center search-container">
                <form
                    action="/search"
                    method=""
                    className="bg-secondaryHover relative w-[100%] rounded-full px-1"
                >
                    <div className="flex items-center h-[40px] ">
                        <div className=" flex items-center px-2 group">
                            <button type="submit">
                                <figure className=" text-slate-500 bg-transparent group-hover:text-black transition-all duration-200 ease-in-out">
                                    <BsSearch />
                                </figure>
                            </button>
                        </div>
                        <div className="w-[100%]">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for Products, Brands and More"
                                autoComplete="off"
                                className=" bg-transparent w-full border-none outline-none text-sm md:text-base p-1 placeholder-gray-600 "
                                onChange={handleInputChange}
                                value={query}
                            />
                        </div>
                    </div>
                </form>
                {open && results.length > 0 && (
                    <div
                        ref={dialogRef}
                        className="absolute top-[40px] left-0 right-0 pb-2 w-full bg-white shadow-xl rounded-b-md z-50 h-fit"
                    >
                        <ul>
                            {results?.map((product) => (
                                <li key={product?._id}>
                                    <a
                                        href={`/product/${product._id}`}
                                        className="px-5 py-3 h-fit hover:bg-secondaryHover flex gap-5 items-center"
                                    >
                                        <img
                                            src={product?.images[0].url}
                                            alt="product"
                                            className="w-5 h-5"
                                        />
                                        <span>
                                            {product?.name?.length > 30
                                                ? `${product?.name?.substring(
                                                      0,
                                                      30
                                                  )}...`
                                                : product?.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;
