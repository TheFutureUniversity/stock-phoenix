"use client";
import dayjs from "dayjs";

import Head from "next/head";

import mixpanel from "@/utils/mixpanel";
import { useEffect, useState } from "react";
import { ExpandableTile } from "@/components/pages/infoTile";
import { Timer, TimerOnlyText } from "@/components/pages/timer/timer";
import { Disclaimer } from "@/components/MarketingComponents/MarketingDisclaimer";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import LeadForm from "@/components/lead-form";
import Modal from "@/components/ui/Modal";
import Image from "next/image";

const pageData = {
  slug_Title: "prabhu-swing",
  head: {
    title: "Prabhu | Swing Trading",
    meta: {
      name: "description",
      content:
        "Learn from the co founder of stock phoenix, Prabhu Selvaraj's expertise in trading, mentored more than 7500 students to start their profitable trading journey and  accumulated 12+ years of experience in the indian share market",
      key: "desc",
    },
  },
  language: "English",
  mcDuration: "2 Hours",
  Heading:
    '<b class=" text-[#2563EB] font-normal">10x Your Capital: </b>Swing Trading Masterclass with Prabhu Selvaraj',
  HeadingPara:
    "Transform Your Trading Strategy with Prabhu Selvaraj's Swing Trading Workshop.",
  teacherName: "Prabhu Selvaraj",
  learningOutcome: {
    loHeading:
      "Learn important skills & knowledge to Improve your trading expertise.",
    loList: [
      "Exploring the advantages of swing trading over other trading styles",
      "What and Why of Swing Trading",
      "Advantages of Swing Trading",
      "How to generate Consistent Return using Swing Trading.",
      "One Powerful swing trading strategy",
      "How much profits can be made using Swing Trading Strategy",
    ],
  },
  meetYourMentor: {
    mymPara:
      "An expert with 12 years of experience in CMMI Level 3 and Level 5 implementation for services and development projects. He has worked with top firms like Infosys, J.P. Morgan, HCL Technologies, and Mindtree. Since 2018, Prabhu has been actively involved in mentorship programs, sharing his extensive knowledge and experience to guide others.",
    mymContent: [
      ["12+ Years", "of experience"],
      ["6,000+", "students mentored"],
      ["Top 100", "visionaries in education"],
      ["90%", "sucess rate"],
    ],
  },
  testimonials: [
    [
      "Prabhu Selvaraj's bootcamp gave me a solid foundation in swing trading. His strategies are game-changing!",
      "Jaspreet singh",
    ],
    [
      "Amazing experience with Prabhu Selvaraj! His swing trading insights are clear and actionable. Worth every minute.",
      "Akaash kumar",
    ],
    [
      "The swing trading bootcamp by Prabhu Selvaraj enhanced my trading skills. Practical tips and great teaching style!",
      "vikram Sharma",
    ],
  ],
  FAQ_Content: [
    {
      question: "Is it a live or pre-recorded workshop?",
      answer: "It is a live workshop.",
    },
    {
      question: "Is this class for beginners? ",
      answer:
        " This masterclass is perfect for beginners; no prior knowledge of swing trading is required.",
    },
    {
      question: "Will recording be provided?",
      answer: "No, the recording will not be provided.",
    },
    {
      question: "How much capital is required?",
      answer:
        "While you can join the class for learning purposes, trading requires a capital of Rs. 4,000-5,000.",
    },
    {
      question: "Will there be a QnA session in the class?",
      answer:
        " Yes, there will be a Q&A session during the class. It's designed to facilitate your learning, and we'll have a Q&A session after each step.",
    },
  ],
};

export default function PaidVideo({ masterclass }: { masterclass: any }) {
  const isCustom = false;

  const customToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOjQ5fQ.CxV6Wx22zOtz70T6JXG79RZVCpx5ygSqUTgSf-eNwsA";

  const slots = masterclass?.slots;
  const activeSlot = slots?.find((slot: any) => {
    return slot.active;
  });

  const isPartialLead = true;

  const activeWAGroup = activeSlot?.whatsappGroupLink;

  const masterClassDate = dayjs(activeSlot?.startDateTime)
    .format("DD MMMM YYYY")
    .toString();
  const masterClassTime = dayjs(activeSlot?.startDateTime).format("hh:mm A");

  const [isEnrollNowFormOpen, setIsEnrollNowFormOpen] = useState(false);
  const handleEnrollNowFormOpen = (segment?: string) => {
    mixpanel.track("enroll_now", {
      type: "paid",
      landing_page: "paid-video",
      masterclass: masterclass?.title,
      masterClassId: masterclass?.id,
      platform: "tradewise",
      segment: segment,
    });
    setIsEnrollNowFormOpen(true);
  };

  const [currentCard, setCurrentCard] = useState(0);

  const handlePrev = () => {
    if (currentCard === 0) return;
    setCurrentCard((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentCard === pageData?.testimonials.length - 1) return;
    setCurrentCard((prev) => prev + 1);
  };

  const path = usePathname();
  useEffect(() => {}, []);
  const params = useParams();
  const id = params.id;
  const searchParams = useSearchParams();
  const isTaboola = searchParams.get("source") === "Taboola";
  const source = searchParams.get("source") || "direct";
  const leadComment = searchParams.get("comment") || "";
  const backComment = source === "google" ? "paidMasterClass" : "paidBootcamp";
  return (
    <>
      <Head>
        <title>{ "Stock Phoenix"}</title>
        <meta
          name={pageData?.head?.meta.name}
          content={pageData?.head?.meta.content}
          key={pageData?.head?.meta.key}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5G6WR26B');
          `,
          }}
        />
      </Head>
      <main className="font-inter bg-black h-full overflow-y-auto text-white pb-32 md:pt-6 ">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5G6WR26B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
        <div className="flex flex-row items-center justify-center gap-24 max-xl:gap-4 max-md:flex-wrap max-md:gap-2 p-10 ">
          <div className="flex flex-col w-[500px] max-md:justify-center max-md:items-center max-md:text-center max-md:w-full text-white max-xl:max-w-md gap-5 max-md:pt-4 pt-6">
            <div>
              <Image
                src={"/logo.webp"}
                alt=""
                width={70}
                height={70}
                className="max-sm:place-self-center"
              />

            </div>
            <h1
              className="max-md:text-4xl text-[45px] md:font-normal  leading-[60px] font-bold   "
              dangerouslySetInnerHTML={{ __html: pageData?.Heading }}
            ></h1>
            <p className="font-light text-sm">{pageData?.HeadingPara}</p>
            <div
              className="bg-no-repeat bg-contain scale-x-[-1] md:hidden mt-10"
              style={{
                width: "280px",
                backgroundImage: `url("/paid-video/border.svg"), url('/longEllipse.svg')`,
              }}
            >
              <img
                src={`/prabhu-swing/paidTeacher.webp`}
                width={200}
                className="-translate-y-4 translate-x-16 transform scale-x-[-1]"
              />
            </div>
            <button
              className=" lg:rounded-full !text-white bg-[#2563EB] border-none w-72 text-sm max-md:w-full rounded-lg"
              onClick={() => handleEnrollNowFormOpen("paid_video_heading")}
            >
              <p className="text-lg font-bold ">Reserve Seat For FREE</p>
            </button>
            <div>
              <p> {pageData?.teacherName} </p>
              <div className="flex flex-row gap-2 mt-2 items-center">
                <div className="flex flex-row ">
                  {Array.apply(null, Array(5)).map(
                    (value: any, index: number) => {
                      return <img src="/star.png" key={index} />;
                    }
                  )}
                </div>
                <p className="text-white ">4.9/5</p>
                <p className="text-gray-400">(14k reviews)</p>
              </div>
            </div>
          </div>
          <div
            className="bg-no-repeat bg-contain max-md:hidden scale-x-[-1]"
            style={{
              width: "280px",
              backgroundImage: `url("/paid-video/border.svg"), url('/longEllipse.svg')`,
            }}
          >
            <img
              src={`/prabhu-swing/paidTeacher.webp`}
              width={200}
              className="-translate-y-4 translate-x-16 transform scale-x-[-1] max-lg:translate-x-10"
            ></img>
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="flex flex-row max-md:flex-wrap items-center justify-center gap-6 max-md:gap-4 max-md:bg-[#061433] max-md:mx-2 max-md:py-2 rounded-lg mt-6">
            <div className="flex flex-col items-center justify-center bg-[#2563EB] text-white rounded-lg px-10 max-md:px-4 py-2 text-center bg-opacity-35 max-md:w-36 max-md:h-20">
              <p className="font-bold text-lg max-md:text-base">
                {dayjs(activeSlot?.startDateTime).format("DD MMM YYYY")}
              </p>
              <p className="text-sm">DATE</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#2563EB] text-white rounded-lg px-10 max-md:px-4 py-2 text-center bg-opacity-35 max-md:w-36 max-md:h-20">
              <p className="font-bold text-lg max-md:text-base">
                {" "}
                {masterClassTime}
              </p>
              <p className="text-sm">TIME</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#2563EB] text-white rounded-lg px-10 max-md:px-4 py-2 text-center bg-opacity-35 max-md:w-36 max-md:h-20">
              <p className="font-bold text-lg max-md:text-base">
                {pageData?.language}
              </p>
              <p className="text-sm">LANGUAGE</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#2563EB] text-white rounded-lg px-10 max-md:px-4 py-2 text-center bg-opacity-35 max-md:w-36 max-md:h-20">
              <p className="font-bold text-lg max-md:text-base">
                {pageData?.mcDuration}
              </p>
              <p className="text-sm">DURATION</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 px-44 max-xl:px-20 max-lg:px-10 max-md:px-2 py-12">
          <div className=" flex flex-col items-center gap-2 ">
            <h2 className="text-white text-center">
              What Will You Learn In The Masterclass?
            </h2>

            <p className="text-gray-300 xl:px-64 text-center ">
              {pageData?.learningOutcome?.loHeading}
            </p>
            <div className=" w-20 h-1 bg-[#2563EB]  " />
          </div>

          <div className=" md:grid-cols-3 grid grid-cols-2 items-center justify-center  gap-y-10 gap-x-4 text-white px-5 max-md:gap-10  mt-4">
            {pageData?.learningOutcome?.loList.map(
              (loItem: any, index: any) => {
                return (
                  <div
                    className="flex flex-col items-center justify-center gap-2"
                    key={index}
                  >
                    <img
                      src={`/paid-video/lo${index}.svg`}
                      className="rounded-full bg-white p-2"
                    />
                    <p className=" text-center px-2 ">{loItem}</p>
                  </div>
                );
              }
            )}
          </div>
          <button
            className="bg-[#2563EB] !text-white border-none w-[80%] py-4 text-lg font-bold mt-2 rounded-lg"
            onClick={() =>
              handleEnrollNowFormOpen("paid_video_learning_outcome")
            }
          >
            Reserve Seat For FREE
          </button>
        </div>

        <div className="  w-full text-white flex flex-row justify-center items-center gap-28 xl:px-24 px-12 py-4 max-md:flex-wrap max-xl:gap-16 max-lg:gap-4  bg-['url('/longEllipse.svg')']">
          <div className="flex flex-col items-center justify-center max-lg:text-base gap-3 max-w-md w-full">
            <h3 className="text-center max-xl:text-lg">
              STARTS ON {masterClassDate}
            </h3>
            <p>Language - {pageData?.language}</p>

            <button
              className="bg-[#2563EB] border-none !text-white py-3 w-[400px] max-xl:text-base max-xl:w-72 text-lg rounded-lg"
              onClick={() =>
                handleEnrollNowFormOpen("paid_video_register_timer")
              }
            >
              Reserve Seat For FREE
            </button>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className=" text-center">
              Unlock Bonuses Worth <b className="text-[#FF7F6B]"> Rs 25,000 </b>
              on Registeration
            </p>
            <div className="flex flex-row gap-2 max-xl:gap-1">
              <Timer
                tillDateTime={dayjs(activeSlot?.startDateTime).toDate()}
                tileclassName="!bg-[#0E2252]  !font-playfair !border-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-10 flex-col gap-12">
          <div>
            <h2 className="text-center">Unlock bonuses worth ₹25,000</h2>
            {/* line */}
            <div className=" w-20 h-1 bg-[#2563EB] mx-auto my-3 md:mb-6 mb-2 " />
          </div>

          <div className="flex flex-row justify-center gap-16 max-md:flex-wrap max-xl:gap-4 max-lg:gap-2">
            <div className="grid grid-cols-2 gap-16 max-xl:gap-4 max-lg:gap-2">
              <div className="border-dotted border-[#2563EB] border-2 flex flex-col justify-center items-center p-5 max-md:px-2 rounded-lg gap-2 w-full">
                <img src="/paid-video/bonus1.svg"></img>
                <h4 className="font-semibold">Bonus 1</h4>
                <p className="max-sm:text-xs">Trading Log</p>
                <button className="bg-[#2563EB] !text-white rounded-full border-none max-sm:text-xs py-1 px-3">
                  Worth ₹5000/-
                </button>
              </div>
              <div className="border-dotted border-[#2563EB] border-2 flex flex-col justify-center items-center p-5 max-md:px-2 rounded-lg gap-2 w-full">
                <img src="/paid-video/bonus2.svg"></img>
                <h4 className="font-semibold">Bonus 2</h4>
                <p className="max-sm:text-xs">Trading Kit</p>
                <button className="bg-[#2563EB] !text-white rounded-full border-none max-sm:text-xs py-1 px-3">
                  Worth ₹5000/-
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16 max-xl:gap-4 max-lg:gap-2 ">
              <div className="border-dotted border-[#2563EB] border-2 flex flex-col justify-center items-center p-5 max-md:px-2 rounded-lg gap-2 ">
                <img src="/paid-video/bonus3.svg"></img>
                <h4 className="font-semibold">Bonus 3</h4>
                <p className="max-sm:text-xs">E-Books</p>
                <button className="bg-[#2563EB] !text-white rounded-full border-none max-sm:text-xs py-1 px-2">
                  Worth ₹5000/-
                </button>
              </div>
              <div className="border-dotted border-[#2563EB] border-2 flex flex-col justify-center items-center p-5 max-md:px-2 rounded-lg gap-2 ">
                <img src="/paid-video/bonus4.png"></img>
                <h4 className="font-semibold">Bonus 4</h4>
                <p className="max-sm:text-xs">Live Trading Support</p>
                <button className="bg-[#2563EB] !text-white rounded-full border-none max-sm:text-xs py-1 px-2">
                  Worth ₹10,000
                </button>
              </div>
            </div>
          </div>
          {/* Enroll now*/}
          <button
            className="bg-[#2563EB] border-none !text-white py-5 w-[980px] text-lg max-xl:w-[720px] max-sm:w-80 rounded-lg"
            onClick={() => handleEnrollNowFormOpen("paid_video_bonuses")}
          >
            Reserve Seat For FREE
          </button>

          <div className="flex flex-row md:gap-24  gap-8 justify-center items-center max-sm:flex-wrap ">
            <h2 className="font-normal md:hidden">Meet Your Coach</h2>
            <div
              className="bg-no-repeat bg-contain "
              style={{
                width: "280px",
                backgroundImage: `url("/paid-video/border.svg"), url('/longEllipse.svg')`,
              }}
            >
              <img
                src={`/prabhu-swing/paidTeacher.webp`}
                width={200}
                className="-translate-y-4 translate-x-16 transform scale-x-[-1] max-lg:translate-x-8"
              ></img>
            </div>

            <div className="flex flex-col justify-center items-start max-md:items-center max-w-lg max-lg:max-w-md md:gap-10 gap-4">
              <div>
                <h2 className="font-normal max-md:hidden">Meet Your Coach</h2>
              </div>
              <h1 className="font-light text-[60px] max-md:text-[32px] text-[#2563EB] max-md:font-semibold">
                {pageData?.teacherName?.split(" ")[0]}{" "}
                <span className="xl:inline max-xl:block max-xl:mt-4 max-md:inline">
                  {pageData?.teacherName?.split(" ")[1]}
                </span>
              </h1>
              <h4 className="font-light mt-3 max-md:mt-0 max-md:text-center">
                {pageData?.meetYourMentor?.mymPara}
              </h4>
            </div>
          </div>

          <div className="flex flex-row gap-10 max-sm:flex-wrap justify-center max-xl:gap-3 px-16 max-xl:px-4 max-sm:px-2">
            <div className="flex flex-row max-sm:gap-2 gap-10 max-xl:gap-3">
              <div className="bg-[#ffffff24] p-5 rounded-lg  w-56 max-xl:w-44 max-sm:w-40 h-40 max-xl:h-auto flex flex-col gap-2 items-center justify-center ">
                <h3 className="font-bold max-lg:text-xl lg:text-2xl">
                  {pageData?.meetYourMentor?.mymContent[0][0]}
                </h3>
                <p className=" text-center">
                  {pageData?.meetYourMentor?.mymContent[0][1]}
                </p>
              </div>
              <div className="bg-[#ffffff24] p-5 rounded-lg  w-56 max-xl:w-44 max-sm:w-40 h-40 max-xl:h-auto flex flex-col gap-2 items-center justify-center ">
                <h3 className="font-bold max-lg:text-xl lg:text-2xl">
                  {pageData?.meetYourMentor?.mymContent[1][0]}
                </h3>
                <p className=" text-center">
                  {pageData?.meetYourMentor?.mymContent[1][1]}
                </p>
              </div>
            </div>
            <div className="flex flex-row max-sm:gap-2 gap-10 max-xl:gap-3">
              <div className="bg-[#ffffff24] p-5 rounded-lg  w-56 max-xl:w-44 max-sm:w-40 h-40 max-xl:h-auto flex flex-col gap-2 items-center justify-center ">
                <h3 className="font-bold max-lg:text-xl lg:text-2xl">
                  {pageData?.meetYourMentor?.mymContent[2][0]}
                </h3>
                <p className=" text-center">
                  {pageData?.meetYourMentor?.mymContent[2][1]}
                </p>
              </div>
              <div className="bg-[#ffffff24] p-5 rounded-lg  w-56 max-xl:w-44 max-sm:w-40 h-40 max-xl:h-auto flex flex-col gap-2 items-center justify-center ">
                <h3 className="font-bold max-lg:text-xl lg:text-2xl">
                  {pageData?.meetYourMentor?.mymContent[3][0]}
                </h3>
                <p className=" text-center">
                  {pageData?.meetYourMentor?.mymContent[3][1]}
                </p>
              </div>
            </div>
          </div>
          {/* Enroll now*/}
          <button
            className="bg-[#2563EB] border-none !text-white py-5 w-[1050px] text-lg max-xl:w-[720px] max-sm:w-80 rounded-lg"
            onClick={() =>
              handleEnrollNowFormOpen("paid_video_meet_your_mentor")
            }
          >
            Reserve Seat For FREE
          </button>
        </div>

        <div className="   px-24 max-xl:px-20 max-lg:px-5 md:py-10 py-5 flex flex-col justify-center items-center  gap-5">
          <div className=" flex flex-col justify-center items-center">
            <img src="/paid-video/video.png" alt="video" width={800} />
          </div>
          <h3 className="max-lg:text-base text-center mt-3">
            Trusted By <b className=" text-[#2563EB]"> 100k+ </b> Learners
            Across India
          </h3>
          <div className="hidden md:block mt-5">
            <div className=" flex flex-row gap-4  flex-wrap items-center justify-center">
              {pageData?.testimonials.map((testimonial: any, index: any) => {
                return (
                  <div
                    className="bg-[#ffffff24] px-10 py-5 w-[400px] "
                    key={index}
                  >
                    <div className="  flex flex-row gap-10 items-center justify-start ">
                      <img
                        src={`/Common/person${index + 1}.png`}
                        alt="testimoial image"
                      />
                      <div className="flex flex-col justify-start">
                        <p className="text-sm ">{testimonial[0]}</p>
                        <p className="mt-6 text-lg">{testimonial[1]}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" md:hidden mt-5">
            <div className=" flex gap-1  items-center  justify-between">
              <img
                src="/Common/whiteArrowp.svg"
                alt="next-BTN"
                className=" w-8"
                onClick={handlePrev}
              />
              <div className="relative flex flex-col items-center justify-center  p-2 rounded-sm gap-5  max-w-md  bg-[#ffffff24]">
                <img
                  src={`/Common/person${currentCard + 1}.png`}
                  className="z-10 "
                />
                <p className="text-center text-sm">
                  {pageData?.testimonials[currentCard][0]}
                </p>
                <b>{pageData?.testimonials[currentCard][1]}</b>
              </div>
              <img
                src="/Common/whiteArrown.svg"
                alt="next-BTN"
                className=" w-8"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center px-56 max-xl:px-20 max-lg:px-10 py-10 flex-col gap-10">
          <div>
            <h2 className="max-md:text-lg text-center">
              Valuable Certificate upon completion of the Masterclass!
            </h2>
          </div>

          <img src={`/prabhu-swing/certificate.webp`} width={500}></img>
          {/* Enroll now*/}
          <button
            className="bg-[#2563EB] border-none !text-white py-5 w-[720px] max-lg:w-80 text-lg rounded-lg"
            onClick={() => handleEnrollNowFormOpen("paid_video_certificate")}
          >
            Reserve Seat For FREE
          </button>
        </div>

        <div className="md:px-10 px-5">
          <h2 className="max-md:text-lg text-center  md:mt-10 mt-5">
            Frequently Asked Questions
          </h2>
          <div className=" w-14 h-1 bg-[#2563EB] mx-auto my-2" />
          <div className="w-full flex flex-col gap-5 items-center mt-10 ">
            {pageData?.FAQ_Content.map((faq: any, index: any) => {
              return (
                <ExpandableTile
                  key={index}
                  className="bg-[#ffffff24]"
                  header={faq.question}
                  isVideo={true}
                >
                  {faq.answer}
                </ExpandableTile>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div className="fixed bottom-0 z-20 md:px-[110px] p-[20px] w-full flex justify-between items-center bg-zinc-800">
          <div>
            <div>
              <b className="text-3xl">FREE</b>{" "}
              <span className=" line-through text-xs text-white">999</span>
            </div>
            <div className="text-xs text-white">
              Offer Expires in{" "}
              <b>
                <TimerOnlyText
                  tillDateTime={dayjs().add(15, "minute").toDate()}
                />
              </b>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleEnrollNowFormOpen("paid_video_footer")}
              className="bg-gradient-to-r from-[#2563EB] to-[#162D65] border-none md:py-3 block !text-white md:text-lg rounded-lg max-sm:hidden px-2"
            >
              Reserve Seat For FREE
            </button>
            <button
              onClick={() => handleEnrollNowFormOpen("paid_video_footer")}
              className="bg-gradient-to-r from-[#2563EB] to-[#162D65] border-none md:py-3 block !text-white text-lg rounded-lg sm:hidden"
            >
              Register Now
            </button>
          </div>
        </div>
        <div className="py-1 bg-gradient-to-r from-[#2563EB] to-[#162D65] !mt-24 ">
          <Disclaimer
            source={source as string}
            classNameOuter="!bg-black font-semibold "
          />
        </div>
      </main>
    </>
  );
}
