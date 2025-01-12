import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../apiFolder/api";
const FormRegistration = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);
    const [errors, setErrors] = useState("");

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [mobile, setMobile] = React.useState('');


    /*    const validateField = (name, value) => {
           let error = '';
   
           // Validation for the Name field
           if (name === 'firstName') {
               if (!value) {
                   error = 'Name is required';
               } else if (!/^\S+$/.test(value)) {
                   error = 'Name can only contain letters and spaces';
               }
           }
           if (name === 'lastName') {
               if (!value) {
                   error = 'Name is required';
               } else if (!/^\S+$/.test(value)) {
                   error = 'Name can only contain letters and spaces';
               }
           }
   
           // Validation for the Email field
           if (name === 'email') {
               if (!value) {
                   error = 'Email is required';
               } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                   error = 'Email is invalid';
               }
           }
   
           // Validation for the Phone Number field
           if (name === 'phoneNumber') {
               if (!value) {
                   error = 'Phone number is required';
               } else if (!/^\d{10}$/.test(value)) {
                   error = 'Phone number must be 10 digits';
               }
           }
   
           if (name === 'password') {
               if (!value) {
                   error = 'Password is required';
               }
           }
   
           setErrors((prevErrors) => ({
               ...prevErrors,
               [name]: error,
           }));
       }; */

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName === '' || lastName === '' || email === '' || password === '' || mobile === '') {
            alert('All fields are required');
        } else {
            register();
        }
    }

    const register = async (e) => {
        await account.create('unique()', email, password, firstName + " " + lastName, mobile).then(response => {
            console.log(response);
            navigate('/log-in');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5">
            <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
                <div className="flex">
                    <h3 className="text-white">Dark Mode : &nbsp;</h3>
                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            readOnly
                        />
                        <div
                            onClick={() => {
                                setDarkMode(!darkMode);
                            }}
                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                    </label>
                </div>
            </div>
            <div
                className={`xl:max-w-3xl ${darkMode ? "bg-black" : "bg-white"
                    }  w-full p-5 sm:p-10 rounded-md`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"
                        }`}
                >
                    Register for a free account
                </h1>
                <div className="w-full mt-8">
                    <form className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div>
                                <input
                                    className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    name='firstName'
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    placeholder="Your first name"
                                />
                                {errors.firstName && <span style={{ color: 'red' }} className="text-sm">{errors.firstName}</span>}
                            </div>
                            <div>
                                <input
                                    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                        ? "bg-[#302E30] text-white focus:border-white"
                                        : "bg-gray-100 text-black focus:border-black"
                                        }`}
                                    type="text"
                                    name='lastName'
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Your last name"
                                />
                                {errors.lastName && <span style={{ color: 'red' }} className="text-sm">{errors.lastName}</span>}
                            </div>
                        </div>
                        <div>
                            <input
                                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                    ? "bg-[#302E30] text-white focus:border-white"
                                    : "bg-gray-100 text-black focus:border-black"
                                    }`}
                                name='email'
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            {errors.email && <span style={{ color: 'red' }} className="text-sm">{errors.email}</span>}
                        </div>
                        <input
                            className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                ? "bg-[#302E30] text-white focus:border-white"
                                : "bg-gray-100 text-black focus:border-black"
                                }`}
                            name="phoneNumber"
                            type="tel"
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter your phone"
                        />
                        {errors.phoneNumber && <span style={{ color: 'red' }} className="text-sm">{errors.phoneNumber}</span>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
                                ? "bg-[#302E30] text-white focus:border-white"
                                : "bg-gray-100 text-black focus:border-black"
                                }`}
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button className="mt-5 tracking-wide font-semibold bg-[#22c55e] text-gray-100 w-full py-4 rounded-lg hover:bg-[#4ade80]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg
                                className="w-6 h-6 -ml-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Register</span>
                        </button>
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Already have an account?{" "}
                            <Link to="/log-in">
                                <span className="text-[#E9522C] font-semibold">Login</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default FormRegistration;
