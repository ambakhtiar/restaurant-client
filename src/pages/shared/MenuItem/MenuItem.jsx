

const MenuItem = ({ item }) => {
    const { name, price, recipe, image } = item;

    return (
        <div className="flex gap-4">
            <img className="w-28 h-24 object-cover rounded-b-[200px] rounded-tr-[200px]" src={image} alt="" />
            <div>
                <h4 className="uppercase">{name}------------</h4>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-600">${price}</p>
        </div>
    );
};

export default MenuItem;