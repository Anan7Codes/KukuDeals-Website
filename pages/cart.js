import Cart from "@/components/cart/Cart";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function cart() {
    return (
        <div className="bg-gray-100 px-5 mt-4 overflow-x-hidden">
            <Navbar/>
            <Cart/>
            <Footer/>

        </div>
    )
}
