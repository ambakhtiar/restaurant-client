import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => alert("Log out succesfull"))
            .catch(error => console.log(error));
    }

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/menu'}>Menu</NavLink></li>
        <li><NavLink to={'/order/salad'}>Order Food</NavLink></li>
        {
            user && isAdmin && <li><NavLink to={'/dashboard/adminHome'}>Dashboard</NavLink></li>
        }
        {
            user && !isAdmin && <li><NavLink to={'/dashboard/userHome'}>Dashboard</NavLink></li>
        }
        <li><NavLink to={'/dashboard/cart'}>
            <button className="flex items-center gap-2"> <FaShoppingCart />
                <div className="badge badge-secondary p-1.5">+{cart.length}</div>
            </button>
        </NavLink></li>
        {
            user ?
                <><button onClick={handleLogOut} className="btn btn-ghost">Log Out</button></>
                : <li><NavLink to={'/login'}>LogIn</NavLink></li>
        }
    </>

    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl text-white bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-300 text-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost flex flex-col gap-0">
                    <p>Bistro Boss</p>
                    <p>Restaurant</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" /> :
                        <button className="btn"><NavLink to={'/login'}>LogIn</NavLink></button>
                }
            </div>
        </div>
    );
};

export default NavBar;