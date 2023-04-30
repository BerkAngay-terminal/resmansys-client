import { Formik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../firebase/clientApp";
import { EyeIcon, EyeSlash } from '@heroicons/react/20/solid';
import { setCookie } from 'cookies-next';

const auth = getAuth(firebase);

import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import authService from "../firebase/authService";
import { useState } from "react";

export default function SignIn() {
    const router = useRouter();
    const [passwordShown, setPasswordShown] = useState(false);

    async function handleSignIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log('User:', user);
                setCookie('token', user.accessToken);
                setCookie('uid', user.uid);
                router.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return { errorCode, errorMessage }
            });
    }

    return (
        <>
            <Head>
                <title>ResmanSys: Sign In</title>
            </Head>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        ResmanSys Sign In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Email Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'Password Required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                toast.promise(handleSignIn(values.email, values.password),
                                    {
                                        pending: 'Giriş yapılıyor',
                                        success: 'Giriş yapıldı 👌',
                                        error: 'Giriş yapılamadı 🤯'
                                    });
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p className="text-xs font-medium text-red-500 mt-1"> {errors.email && touched.email && errors.email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2 relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type={passwordShown ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {passwordShown == false
                                                ?
                                                <EyeIcon onClick={() => setPasswordShown(true)} className="cursor-pointer absolute right-3 top-1.5 text-gray-300 h-6 z-50" />
                                                :
                                                <EyeSlash onClick={() => setPasswordShown(false)} className="cursor-pointer absolute right-3 top-1.5 text-gray-300 h-6 z-50" />
                                            }
                                            <p className="text-xs font-medium text-red-500 mt-1"> {errors.password && touched.password && errors.password}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>

                    </div>
                </div>

            </div>
        </>
    )
}
