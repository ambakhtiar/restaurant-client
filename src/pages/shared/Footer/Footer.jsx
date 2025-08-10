import { BsInstagram } from "react-icons/bs";
import { FaDiscord, FaFacebook } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="grid grid-cols-2 text-white">
            <div className="bg-[#1F2937] text-center py-24 space-y-4">
                <h3 className="text-xl font-bold">CONTACT US</h3>
                <p>123 ABS Street, Uni 21, Bangladesh <br />
                    +88 123456789 <br />
                    Mon - Fri: 08:00 - 22:00 <br />
                    Sat - Sun: 10:00 - 23:00</p>
            </div>
            <div className="bg-[#111827] text-center flex flex-col items-center py-24 gap-4">
                <h3 className="text-xl font-bold">Follow US</h3>
                <p>Join us on social media</p>
                <div className="flex gap-4">
                    <FaFacebook />
                    <BsInstagram />
                    <FaDiscord />
                </div>
            </div>
            <div className="footer footer-center bg-base-300 text-base-content p-4 col-span-2">
                <aside>
                    <p className="font-semibold">Copyright © {new Date().getFullYear()} - All right reserved by Bistro Boss Restaurant</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;