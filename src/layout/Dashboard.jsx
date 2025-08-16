import { BiCalendarEvent, BiPhone } from "react-icons/bi";
import { FaCalendar, FaHome, FaShoppingCart } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { RiAddBoxFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";


const Dashboard = () => {
    const [cart] = useCart();

    // TODO: get admin value from database
    const isAdmin = true;

    return (
        <div className="flex ">
            <div className="w-64 min-h-full  bg-orange-300">
                <ul className="menu">
                    <li><NavLink to={'/dashboard/userHome'}><FaHome /> User Home</NavLink></li>
                    <li><NavLink to={'/dashboard/cart'}><FaShoppingCart /> My Cart ({cart.length})</NavLink></li>
                    <li><NavLink to={'/dashboard/reservation'}><FaCalendar /> Reservation</NavLink></li>
                    <li><NavLink to={'/dashboard/review'}><MdRateReview /> Add Review</NavLink></li>
                    <li><NavLink to={'/dashboard/booking'}><BiCalendarEvent /> My Booking</NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to={'/'}><FaHome />Home</NavLink></li>
                    <li><NavLink to={'/order'}><RiAddBoxFill />Order Food</NavLink></li>
                    <li><NavLink to={'/contact'}><BiPhone />Contact</NavLink></li>
                </ul>
            </div>
            <div className="flex-1  p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;