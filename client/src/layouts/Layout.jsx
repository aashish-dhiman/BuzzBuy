import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="min-h-[60vh] mt-20 z-100 w-[100%] relative bg-[#f1f3f6] overflow-hidden">
                <Routers />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
