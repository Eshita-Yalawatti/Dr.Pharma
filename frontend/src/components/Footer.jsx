import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ----- left Section ----- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 landing-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
            delectus aut doloremque mollitia quibusdam ipsum error excepturi,
            amet fuga dolore harum ex in nam? Corporis quis possimus at,
            quisquam cupiditate ea natus ex laboriosam omnis repudiandae.
            Voluptate, possimus!
          </p>
        </div>

        {/* ----- Center Section ----- */}
        <div>
          <p className="text-xl font-medium mb-5 ">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ----- Right Section ----- */}
        <div>
          <p className="text-xl font-medium mb-5 ">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+88-01267-891003 </li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ----- Copyright Section ----- */}
      <div>
        <hr className="text-gray-400"/>
        <p className="py-5 text-sm text-center">Copyright 2025@ Sumaiya Hossain Surovi - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
