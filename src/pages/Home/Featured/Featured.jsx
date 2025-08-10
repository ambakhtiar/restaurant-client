import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg';

const Featured = () => {
    return (
        <div
            className="bg-cover bg-center bg-fixed pt-4"
            style={{ backgroundImage: `url(${featuredImg})` }}
        >
            <SectionTitle subHeading={"Check it out"} heading={"Featured"} />
            <div className="md:flex justify-center items-center pt-4 md:pt-8 pb-16 px-16 md:px-44 bg-slate-400 bg-opacity-60">
                <div>
                    <img className="rounded-xl" src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10 space-y-2 text-white">
                    <p>August 5, 2024</p>
                    <p className="uppercase">WHERE CAN I GET SOME?</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, natus
                        accusamus nisi perspiciatis pariatur tempora asperiores ducimus odit
                        saepe quis nulla.
                    </p>
                    <button className="btn btn-outline border-0 border-b-4 rounded-xl">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;