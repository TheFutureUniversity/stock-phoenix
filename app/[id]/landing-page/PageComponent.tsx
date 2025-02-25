"use client";
import LeadForm from "@/components/lead-form";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import React, { useState } from "react";

function PageComponent({ masterclass }: { masterclass: any }) {
  const [isEnrollNowFormOpen, setIsEnrollNowFormOpen] =
    useState<boolean>(false);

  return (
    <div>
      <div className="h-screen bg-black text-white max-lg:px-2 px-28 max-sm:h-fit max-sm:pb-5 max-sm:bg-[url(/mobileBkg.webp)] bg-no-repeat bg-left-bottom">
        <div>
          <Image
            src={"/logo.webp"}
            alt=""
            width={150}
            height={150}
            className="max-sm:place-self-center"
          />
        </div>
        {/* <LeadForm
          masterClass={masterclass}
          customPage={true}

        /> */}
        <div className="max-sm:grid max-sm:grid-cols-1 w-full sm:hidden items-center px-2 relative bottom-8">
          <div className="text-3xl text-center mb-3">
            LEARN <span className="text-[#03FFDD]">SHORT-TERM</span> TRADING IN{" "}
            <span className="text-[#03FFDD]">EQUITIES</span>
          </div>
          <div className="text-[14px] text-left place-self-center my-2 mb-5">
            <div>• NSIM-CERTIFIED MENTOR</div>
            <div>• 3 YEARS OF LIVE EXAMPLES</div>
            <div>
              • LIFE TIME <span className="text-[#2F76FF]">FREE SCANNER</span>
            </div>
            <div>
              {" "}
              • LEARN ENTRY{" "}
              <span className="text-[#2F76FF]">STOP LOSS AND EXIT</span>
            </div>
          </div>
          <div className="flex flex-col items-center h-auto mb-5">
            <div className="flex w-[70vw]">
              <Image
                src={"/teacher.webp"}
                alt=""
                width={450}
                height={400}
                className="h-full w-full"
              />
            </div>
            <div className="text-2xl text-center">Mr. Prabhu Selvaraj</div>
          </div>
          <div>
            <LeadForm
              masterClass={masterclass}
              customPage={true}
              className="z-50 px-5 bg-white/10 rounded-xl py-2"
              //    buttonStyle="!bg-black py-3 px-4 !text-white md:text-lg text-sm rounded-lg hover:scale-105 !self-center"
              buttonStyle="!bg-[#2F76FF] md:mt-3 mt-1 btn-block hover:scale-105  p-3 text-white font-semibold text-xl rounded-md"
              inputStyle="md:!py-3 !p-3 w-full rounded-md bg-gray-500/10"
            />
          </div>
        </div>
        <div className="grid grid-cols-3  w-full max-h-[70vh] h-full  max-sm:hidden">
          <div className="col-span-1 max-lg:text-5xl text-7xl flex flex-col h-full  justify-between p-10 ">
            <div className=" ">
              LEARN TO <span className="text-[#2F76FF]">TRADE</span> IN{" "}
              <span className="text-[#2F76FF]">EQUITIES</span>
            </div>
            <button
              className="bg-[#2F76FF] text-black p-5 text-2xl text-center w-fit rounded-lg place-self-center border-none font-[600]"
              onClick={() => setIsEnrollNowFormOpen(true)}
            >
              Register NOW
            </button>
          </div>
          <div className="col-span-2 bg-white grid grid-cols-2 text-black w-fit  h-full  justify-between p-10 ">
            <div className="max-lg:text-5xl text-6xl">
              <div className="text-[#D20609]">
                {" "}
                Everything
                <br />
                <span className="text-[#404040]"> About </span>Short
                <br /> Term Trading{" "}
              </div>
              <div className="text-lg text-black">
                <div>
                  • Learn from{" "}
                  <span className="text-[#D20609]">nsim certified mentor</span>
                </div>
                <div>
                  • Live examples from{" "}
                  <span className="text-[#D20609]">last 3 years</span>
                </div>
                <div>
                  • Life time{" "}
                  <span className="text-[#D20609]">free scanner</span>{" "}
                </div>
                <div>
                  • Learn entry{" "}
                  <span className="text-[#D20609]">stop loss and exit</span>{" "}
                </div>
                <div>• Effective money management and risk management</div>
              </div>{" "}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex-grow">
                <Image
                  src={"/teacher.webp"}
                  alt=""
                  width={200}
                  height={200}
                  className="h-full w-auto"
                />
              </div>
              <div className="text-2xl text-center">Mr. Prabhu Selvaraj</div>
            </div>
          </div>
        </div>
        {/* <Image
      src={"/circle1.webp"}
      alt=""
      width={200}
      height={200}
      className="absolute bottom-32 left-0 z-0 scale-[2]"
      />
      <Image
      src={"/circle2.webp"}
      alt=""
      width={200}
      height={200}
      className="absolute top-0 right-72 z-0 scale-[4]"
      /> */}
      </div>
      <Modal
        className=" !z-40 sm:w-1/2"
        isOpen={isEnrollNowFormOpen}
        closeModal={() => {
          setIsEnrollNowFormOpen(false);
        }}
      >
        <LeadForm
          masterClass={masterclass}
          customPage={true}
          className="z-50"
          buttonStyle="!bg-[#2F76FF] md:mt-3 mt-1 btn-block hover:scale-105  p-3 text-white font-semibold text-xl rounded-md"
          inputStyle="md:!py-3 !p-3 w-full rounded-md bg-gray-500/10"
        />
      </Modal>
    </div>
  );
}

export default PageComponent;
