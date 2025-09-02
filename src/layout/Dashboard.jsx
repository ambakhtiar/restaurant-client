import { BiCalendarEvent, BiPhone } from "react-icons/bi";
import { FaCalendar, FaHome, FaList, FaShoppingCart, FaUser, FaUtensilSpoon } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { RiAddBoxFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { FaBookBookmark } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();

    const [isAdmin] = useAdmin();

    return (
        <div className="flex ">
            <div className="w-64 min-h-full  bg-orange-300">
                <ul className="menu">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to={'/dashboard/adminHome'}><FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to={'/dashboard/addItems'}><FaCalendar /> Add Item</NavLink></li>
                                <li><NavLink to={'/dashboard/manageItems'}><FaList /> Manage Item</NavLink></li>
                                <li><NavLink to={'/dashboard/manageBookings'}><FaBookBookmark /> Manage Booking</NavLink></li>
                                <li><NavLink to={'/dashboard/users'}><FaUser /> All Users</NavLink></li>
                                <li><NavLink to={'/dashboard/cart'}><FaUtensilSpoon /> My Cart ({cart.length})</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to={'/'}><FaHome />Home</NavLink></li>
                                <li><NavLink to={'/order'}><RiAddBoxFill />Order Food</NavLink></li>
                                <li><NavLink to={'/contact'}><BiPhone />Contact</NavLink></li>
                            </> :
                            <>
                                <li><NavLink to={'/dashboard/userHome'}><FaHome /> User Home</NavLink></li>
                                <li><NavLink to={'/dashboard/cart'}><FaUtensilSpoon /> My Cart ({cart.length})</NavLink></li>
                                <li><NavLink to={'/dashboard/reservation'}><FaCalendar /> Reservation</NavLink></li>
                                <li><NavLink to={'/dashboard/review'}><MdRateReview /> Add Review</NavLink></li>
                                <li><NavLink to={'/dashboard/booking'}><BiCalendarEvent /> My Booking</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to={'/'}><FaHome />Home</NavLink></li>
                                <li><NavLink to={'/order'}><RiAddBoxFill />Order Food</NavLink></li>
                                <li><NavLink to={'/contact'}><BiPhone />Contact</NavLink></li>
                            </>
                    }
                </ul>
            </div>
            <div className="flex-1  p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;