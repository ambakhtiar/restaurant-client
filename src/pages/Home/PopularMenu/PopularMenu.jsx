import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu/useMenu";


const PopularMenu = () => {
    let [menu] = useMenu();
    let popularMenu = menu.filter(item => item.category === "popular");

    return (
        <section className="mb-20">
            <SectionTitle
                subHeading={"Check it out"}
                heading={"From our Popular menu"}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popularMenu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="flex justify-center">
                <button className="btn btn-outline border-0 border-b-4 rounded-xl">View Full Menu</button>
            </div>
        </section>

    );
};

export default PopularMenu;