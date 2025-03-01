/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import z from "zod";
import axios from "axios";
import dayjs from "dayjs";
import { Input } from "./form";

import mixpanel from "@/utils/mixpanel";
import { useForm } from "react-hook-form";
import { debounce } from "@/utils/quickers";
import JoinWhatsAppModal from "./JoinWhatsappModal";
import { zodResolver } from "@hookform/resolvers/zod";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useEffect, useState, useCallback, Dispatch } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { SetStateAction } from "react";
import { useParams, useSearchParams } from "next/navigation";

dayjs.extend(advancedFormat);

const LeadFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email provided" }),
  phone: z
    .string()
    .min(10, { message: "Phone number should be 10 digits" })
    .max(10, { message: "Phone number should be 10 digits" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Phone number should contain only numbers",
    })
    .refine((value) => /^(6|7|8|9)\d{9}$/.test(value), {
      message: "Phone number should be a valid Indian number",
    }),
});

type Inputs = {
  name: string;
  email: string;
  phone: string;
};

export default function LeadForm({
  className,
  masterClass,
  onClick,
  buttonStyle,
  inputStyle,
  customPage = false,
  exportToExcel,
  bucket,
  abTestType,
  isPartialLead = false,
  partialData = {},
  setPartialData,
  trueCallerFlow = false,
  isAndroid = false,
}: {
  className?: string;
  masterClass: any;
  onClick?: any;
  buttonStyle?: string;
  inputStyle?: string;
  customPage?: boolean;
  exportToExcel?: any;
  bucket?: "A" | "B";
  abTestType?: string;
  isPartialLead?: boolean;
  partialData?: any;
  setPartialData?: Dispatch<SetStateAction<any>>;
  trueCallerFlow?: boolean;
  isAndroid?: boolean;
}) {
  const [showJoiningPopup, setShowJoiningPopup] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const activeSlot = masterClass?.slots?.find((slot: any) => {
    return slot.active == true;
  });
  const params = useParams();
  const searchParams = useSearchParams();

  const isTaboola = searchParams.get("source") === "Taboola";
  const source = searchParams.get("source") || "direct";
  const comment = searchParams.get("comment") || "";
  useEffect(() => {
    if (Object.keys(userData).length != 0) {
      localStorage.setItem("tfu-user-auth", JSON.stringify(userData));
    }
  }, [userData]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LeadFormSchema),
  });
  const name = watch("name");
  const email = watch("email");
  const phone = watch("phone");

  const sendPartialData = useCallback(
    debounce((data: any) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_API}leads/partial-lead`, data)
        .then((res) => {
          if (res?.data?.data?.id) {
            setPartialData
              ? setPartialData((prev: any) => ({
                  ...prev,
                  id: res.data.data.id,
                }))
              : null;
          }
        })
        .catch((err) => console.error("Partial lead error:", err));
    }, 1500),
    []
  );

  useEffect(() => {
    if (!isPartialLead) return;
    if (
      (phone && phone.length > 12) ||
      (name && name.length > 35) ||
      (email && email.length > 35)
    )
      return;

    if (email || phone) {
      const payload = {
        name: name || "",
        email: email || "",
        phone: phone || "",
        ...partialData,
      };

      sendPartialData(payload);
    }
  }, [name, email, phone]);

  useEffect(() => {
    const userDetails = JSON.parse(
      String(localStorage.getItem("tfu-user-auth"))
    );
    if (userDetails) {
      if (trueCallerFlow && isAndroid) return;
      reset({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
      });
    }
  }, []);

  const slotInfo = masterClass?.slots?.find(
    (singleSlot: any) => singleSlot.active === true
  );

  const submitForm = (data: Inputs) => {
    const { name, email, phone } = data;
    setLoading(true);

    setUserData({
      name: data.name,
      phone: data.phone,
      email: data.email,
    });

    mixpanel.alias(data?.phone);
    mixpanel.people.set({
      $name: data?.name,
      $email: data?.email,
      $phone: data?.phone,
    });
    mixpanel.identify(data?.phone);

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API}leads`, {
        email,
        phone,
        name,
        source: source || "direct",
        comment: comment + "_stock-phoenix" || "",
        masterclassSlotId: slotInfo.id,
        masterclassId: masterClass.id,
        payload: {
          ...(bucket &&
            abTestType && {
              bucket,
              abTestType,
            }),
          ...(isTaboola && {
            t_referrer: document.referrer,
          }),
        },
      })
      .then((res) => {
        const inputs = [{ name: "email", value: data.email }];
        const tagPayload = {
          event: "contactFormSubmitted",
          formId: 1,
          "gtm.uniqueEventId": Math.floor(Math.random() * 1000),
          inputs,
        };
        mixpanel.track("lead_submit", {
          source: source || "direct",
          comment: comment || "no_comment",
          type: "free",
          masterclassId: masterClass?.id,
        });
        const customEvent = new CustomEvent("lead_form_submitted", {
          detail: {
            masterclassSlotId: activeSlot.id,
            masterclassId: masterClass.id,
            tagPayload,
          },
        });
        document.dispatchEvent(customEvent);

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "lead_form_submitted" });
        window.dataLayer.push(tagPayload);

        //@ts-ignore
        gtag("event", "contactFormSubmitted", tagPayload);

        if (isPartialLead && partialData.id && partialData.id !== "") {
          axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_API}leads/partial-lead/${partialData.id}`
          );
        }

        reset();
        setShowJoiningPopup(true);
        if (exportToExcel) {
          exportToExcel(phone);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isMGID = source == "MGID";

  return (
    <div className={`${className} relative !z-[60]`}>
      <JoinWhatsAppModal
        isOpen={showJoiningPopup}
        masterclass={masterClass}
        onClose={() => setShowJoiningPopup(false)}
        joiningLink={activeSlot?.whatsappGroupLink}
      />
      <div
        className=" bg-cover bg-center"
        style={{
          backgroundImage: `url(${masterClass?.bootcamp?.coverImage})`,
        }}
      ></div>
      <form
        onSubmit={handleSubmit(submitForm)}
        onClick={onClick}
        className="md:py-5 pt-2"
      >
        {slotInfo && !customPage && (
          <div className="text-sm md:p-4 p-2 rounded-lg bg-green-200 border border-green-300 flex items-center gap-2">
            <span>
              <InformationCircleIcon className="w-5 h-5 stroke-[2]" />
            </span>
            <span>
              Upcoming masterclass is on{" "}
              <span className="font-semibold">
                {dayjs(slotInfo.startDateTime).format("Do MMM (dddd)")}
              </span>{" "}
              at{" "}
              <span className="font-semibold">
                {dayjs(slotInfo.startDateTime).format("h:mm A")}
              </span>
            </span>
          </div>
        )}
        <h3 className="md:text-lg text-sm font-semibold md:mb-3 text-center md:mt-3 mt-1 mb-1 ">
          Please Enter Your Details
        </h3>
        <div
          className="mb-3"
          onClick={() => {
            mixpanel.track("marketing_form", {
              input: "Name Edited",
              type: "free",
            });
          }}
        >
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="Enter your name"
            register={register}
            errors={errors}
            rules={{ required: true }}
            className={inputStyle}
          />
        </div>

        <div
          className="mb-3"
          onClick={() => {
            mixpanel.track("marketing_form", {
              input: "Email Edited",
              type: "free",
            });
          }}
        >
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
            rules={{ required: true }}
            className={inputStyle}
          />
        </div>

        <div
          className="mb-3"
          onClick={() => {
            mixpanel.track("marketing_form", {
              input: "Phone Edited",
              type: "free",
            });
          }}
        >
          <Input
            type="number"
            name="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            register={register}
            errors={errors}
            rules={{ required: true }}
            className={inputStyle}
          />
        </div>
        <div>
          {isMGID ? (
            <div
              className={`flex items-center gap-2 text-sm text-gray-600 mt-4 `}
            >
              <input
                type="checkbox"
                id="consent"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                aria-label="Consent to use personal information"
              />
              <label htmlFor="consent" className="cursor-pointer text-[10px]">
                I agree with your{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-600 hover:underline"
                >
                  Privacy Policy{" "}
                </a>
                &{" "}
                <a
                  href="/terms-and-conditions"
                  className="text-blue-600 hover:underline"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          ) : null}
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className={
              buttonStyle
                ? buttonStyle + " " + "relative"
                : `btn-block btn-pill mt-3 btn-dark relative`
            }
            type="submit"
          >
            <div className="absolute inset-0 bg-[linear-gradient(110deg,#00000000,45%,#ffffff80,55%,#00000000)] bg-[length:200%_100%] animate-shimmer rounded-md" />
            {loading ? "Loading..." : "Register Now For Free"}
          </button>
        </div>
      </form>
    </div>
  );
}
