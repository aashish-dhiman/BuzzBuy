import logoMain from "../../assets/images/logo-main.png";

const Footer = () => (
    <footer className="bg-slate-950 rounded-lg shadow m-2 sm:m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between">
                <a
                    href="./"
                    className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src={logoMain}
                        className="w-[200px] "
                        alt="BuzzBuy Logo"
                    />
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a
                            href="./user/dashboard/profile"
                            className="hover:underline me-4 md:me-6"
                        >
                            My Profile
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                            Licensing
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
                © 2023 - {new Date().getFullYear()}{" "}
                <a href="./" className="hover:underline">
                    BuzzBuy
                </a>
                .  <br />All Rights Reserved.
            </span>
        </div>
    </footer>
);

export default Footer;
