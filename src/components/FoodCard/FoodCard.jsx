import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { name, price, recipe, image, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = food => {
        if (user && user?.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, price, image
            }

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.acknowledged) {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: `${name} added to cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // Refetch the cart for cart update immediatly
                        refetch();
                    }
                })
        } else {
            Swal.fire({
                title: "You are not login!",
                text: "Please login add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Log In!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { form: location } });
                }
            });
        }
    }

    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img src={image} alt="Food" />
            </figure>
            <p className="bg-stone-800 text-white absolute right-6 top-4 px-2 rounded-md">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title font-bold">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)}
                        className="btn btn-outline rounded-md border-0 border-b-2 text-yellow-700 hover:bg-slate-800">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;