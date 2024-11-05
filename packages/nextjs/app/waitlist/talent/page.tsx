"use client";

import { useState } from "react";
import Modal from "./modal/modal";
import { NextPage } from "next";

const Page: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("signedIn", "true");
    setShowModal(true);
  };
  return (
    <div className="pt-[50px] px-3 md:px-16 lg:px-24 w-full bg-white">
      <div className="flex flex-col justify-center items-center ">
        <div className="text-center max-w-[448px]">
          <h2 className="text-[36px] font-[600] text-[#0A0F29]">Join waitlist as a Talent</h2>
        </div>
      </div>

      <form className="flex justify-center items-center">
        <div className="max-w-[550px]">
          <div className="mt-7">
            <label className="font-[500] pb-2"> Name (Full name)</label>
            <input
              placeholder="Enter your company name"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Email</label>
            <input
              placeholder="This is to notify you when the platform is live"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>

          <div className="mt-5">
            <label className="font-[500] pb-2">Location</label>
            <input placeholder="E.g, Nigeria" className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm" />
          </div>

          <div className="mt-5">
            <label className="font-[500] pb-2">Skillset/Expertise</label>
            <input
              placeholder="e.g., frontend developer, blockchain developer, etc"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2"> Experience Level</label>
            <input
              placeholder="e.g., Junior, Mid-level, Senior"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2"> LinkedIn Profile/Portfolio URL (Optional but useful)</label>
            <input
              placeholder="Enter your LinkedIn Profile/Portfolio URL "
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Availability</label>
            <input
              placeholder="e.g., Full-time, Part-time, Freelance"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Preferred Industry (Optional)</label>
            <input
              placeholder="This is to target specific sectors"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Resume Upload (Optional)</label>
            <input type="file" placeholder="Add file" className="w-full h-[48px] rounded-[8px] mt-2" />
          </div>

          <button
            type="submit"
            className="w-full h-[48px] mt-10 mb-14 px-6 py-3  bg-[#2F66F6] font-medium text-[14px] lg:text-[16px] text-nowrap text-[#ffffff] text-center cursor-pointer"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </form>

      <Modal isVisible={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Page;
