import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE__Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, price, recipe, category, _id } = useLoaderData();
    const navigate = useNavigate();

    // console.log(name, price, recipe, category, _id);

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        // console.log(res.data);
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // console.log(menuItem);

            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);

            if (menuRes.data.modifiedCount > 0) {
                reset();
                navigate("/dashboard/manageItems");

                Swal.fire({
                    title: "Good job!",
                    icon: "success",
                    text: `${data.name} is updated to the menu`,
                    showCancelButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <SectionTitle heading={"Update Item"} subHeading={"Refreshing"}></SectionTitle>
            <div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full my-6 flex flex-col">
                            <div className="label">
                                <span className="label-text">Recipe Name*</span>
                            </div>
                            <input {...register("name", { require: true })}
                                defaultValue={name}
                                type="text" placeholder="recipe name" className="input input-bordered w-full" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="form-control w-full flex-col">
                                <div className="label">
                                    <span className="label-text">Category*</span>
                                </div>
                                <select {...register("category", { require: true })}
                                    className="select select-bordered w-full" defaultValue={category}>Select a Category
                                    <option disabled value={"default"}>Select a Category</option>
                                    <option value={"salad"}>Salad</option>
                                    <option value={"dessert"}>Dessert</option>
                                    <option value={"pizza"}>Pizza</option>
                                    <option value={"soup"}>Soup</option>
                                    <option value={"drinks"}>Drinks</option>
                                </select>
                            </div>
                            <div className="form-control w-full flex flex-col">
                                <div className="label">
                                    <span className="label-text">Price*</span>
                                </div>
                                <input {...register("price", { require: true })}
                                    defaultValue={price}
                                    type="text" placeholder="price" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="form-control w-full flex flex-col">
                            <div className="label">
                                <span className="label-text">Recipe Details*</span>
                            </div>
                            <textarea  {...register("recipe")}
                                defaultValue={recipe}
                                className="textarea textarea-bordered w-full" placeholder="recipe details"></textarea>
                        </div>

                        <div className="my-6 form-control w-full flex flex-col">
                            <input {...register("image", { require: true })}
                                type="file" className="file-input w-full " />
                        </div>

                        <button className="btn bg-gradient-to-r from-[#835D23] to-[#B58130] text-white">Update Item <FaUtensils className="ml-4" /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;