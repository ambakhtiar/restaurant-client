import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SocialLogIn = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();

    const form = location.state?.form?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);

                const userInfo = {
                    email: result.user?.email,
                    mame: result.user?.displayName
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                    })

                navigate(form, { replace: true });
            })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} type='button' className="btn btn-outline w-full"><FcGoogle className="text-xl" /> Sign In with Google</button>
        </div>
    );
};

export default SocialLogIn;