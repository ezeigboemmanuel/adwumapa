"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import CheckImg from "../../../assets/check.png";

type Props = {
  isVisible: boolean;
  setShowModal: (arg: boolean) => void;
};

const Modal = ({ isVisible, setShowModal }: Props) => {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id == "wrapper") {
      return setShowModal(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      id="wrapper"
      className="fixed w-full inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center"
    >
      <div className="w-full flex flex-col">
        <button
          onClick={() => setShowModal(false)}
          className="text-white absolute right-14 top-10 font-bold place-self-end"
        >
          X
        </button>
        <div className="w-full flex justify-center items-center">
          <div className="bg-white w-[747px] flex justify-center items-center">
            <div className="max-w-[451px] py-14">
              <div className="my-4 flex justify-center items-center w-full">
                <Image src={CheckImg} alt="img" className="max-w-24 max-h-24" />
              </div>
              <h3 className="text-[24px] font-semibold text-center">
                Thank you for joining BlockGig&apos;s waitlist.{" "}
              </h3>
              <Link href="https://discord.gg/2En4TDDH?event=1299087034333528221">
                <div className="text-blue-500 underline font-semibold text-center">
                  Join our discord community to stay informed about our other activities
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
