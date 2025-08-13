import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover/Cover";
import bgImg from "../../../assets/menu/banner3.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";

import useMenu from "../../../hooks/useMenu/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === "offered");
    const salad = menu.filter(item => item.category === "salad");
    const dessert = menu.filter(item => item.category === "dessert");
    const pizza = menu.filter(item => item.category === "pizza");
    const soup = menu.filter(item => item.category === "soup");

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            <Cover bgImg={bgImg}
                title={"Our Menu"}
                subHeading={"Would you like to try a dish?"}
            ></Cover>

            {/* Offer menu  */}
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"}></SectionTitle>
            <MenuCategory menu={offered}></MenuCategory>

            {/* Desser item menu  */}
            <MenuCategory menu={salad} bgImg={saladImg} title={"salad"}
                subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

            {/* Desser item menu  */}
            <MenuCategory menu={dessert} bgImg={dessertImg} title={"dessert"}
                subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

            {/* Desser item menu  */}
            <MenuCategory menu={pizza} bgImg={pizzaImg} title={"pizza"}
                subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

            {/* Desser item menu  */}
            <MenuCategory menu={soup} bgImg={soupImg} title={"soup"}
                subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}></MenuCategory>

        </div>
    );
};

export default Menu;