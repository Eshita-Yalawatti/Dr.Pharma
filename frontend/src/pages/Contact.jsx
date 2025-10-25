import React from "react";
import contact_image from "../assets/contact_image.png";

const Contact = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* Main Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={contact_image}
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            BRAC University Medical Center(Badda)
            <br />
            Kha 224, Bir Uttam Rafiqul Islam Ave, Dhaka 1212, BD
          </p>
          <button className="text-blue-600 underline">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
