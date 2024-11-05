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
          <h2 className="text-[36px] font-[600] text-[#0A0F29]">Join waitlist as a Client / Company</h2>
        </div>
      </div>

      <form className="flex justify-center items-center">
        <div className="max-w-[550px]">
          <div className="mt-7">
            <label className="font-[500] pb-2">Company Name</label>
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
            <label className="font-[500] pb-2">Type of Talent Needed</label>
            <input
              placeholder="e.g., frontend developer, blockchain developer, etc"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Number of Positions</label>
            <input
              placeholder="How many positions are you hiring for?"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Job Type</label>
            <input
              placeholder="e.g., Full-time, Part-time, Freelance"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Company&apos;s Website URL (optional)</label>
            <input
              placeholder="Add your company's URL"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
          </div>
          <div className="mt-5">
            <label className="font-[500] pb-2">Additional Comments/Requirements</label>
            <input
              placeholder="Any other thing you would like to add"
              className="w-full h-[48px] rounded-[8px] px-4 border shadow-sm"
            />
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
