import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProviders/AuthProvider';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';


const SignUp = () => {
    const captchaRef = useRef(null);
    const [disable, setDisable] = useState(false);
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const { createUser } = useContext(AuthContext);


    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
    }


    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value) == true) {
            setDisable(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold">Registration now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-lg">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && <span className='text-red-600'>Password feild is required</span>}
                                {errors.password?.type === "minLength" && <span className='text-red-600'>Password must be minimu 6 charecter</span>}
                                {errors.password?.type === "maxLength" && <span className='text-red-600'>Password must be maximum 20 charecter</span>}

                                {errors.password?.type === "pattern" && <span className='text-red-600'>Password must be one Uppercase,  one Lowercase, one Number and one Special Charecter</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Captcha</span>
                                </label>
                                <LoadCanvasTemplate />
                                <input type="text" ref={captchaRef} name="captcha" placeholder="captcha" className="input input-bordered" />
                                <button type="button" onClick={handleValidateCaptcha} className='btn btn-outline btn-xs w-full mt-4'>Captcha Submit</button>
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disable} type="submit" className="btn btn-primary w-full" value="Register" />
                            </div>
                        </form>
                        <div className='text-center py-4'>
                            <p>Already registered? <Link to={'/login'} className='text-blue-700'>Go to log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;