import { Link } from "react-router-dom";
import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";


const MenuCategory = ({ menu, bgImg, title, subTitle }) => {

    return (
        <div className="my-16">
            {
                title && <Cover bgImg={bgImg}
                    title={title}
                    subTitle={subTitle}
                ></Cover>
            }
            <div className="grid md:grid-cols-2 gap-10 mt-12">
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`} className="flex justify-center">
                <button className="btn btn-outline border-0 border-b-4 rounded-xl mt-4">Order Your Favorite Food</button>
            </Link>
        </div>
    );
};

export default MenuCategory;