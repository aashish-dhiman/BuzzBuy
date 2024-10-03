import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
    return (
        <main className="max-w-[1440px] mx-auto">
            <Header />
            <main className="min-h-[60vh] mt-[70px] z-100 w-[100%] relative bg-[#f1f3f6]">
                <Routers />
            </main>
            <Footer />
        </main>
    );
};

export default Layout;
