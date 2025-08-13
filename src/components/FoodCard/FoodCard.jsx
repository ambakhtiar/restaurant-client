import { FaBangladeshiTakaSign } from "react-icons/fa6";


const FoodCard = ({ item }) => {
    const { name, price, recipe, image } = item;

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
                    <button className="btn btn-outline rounded-md border-0 border-b-2 text-yellow-700 hover:bg-slate-800">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;