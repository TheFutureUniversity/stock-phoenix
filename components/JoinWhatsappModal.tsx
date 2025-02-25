import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import mixpanel from "@/utils/mixpanel";

export default function JoinWhatsAppModal({
  isOpen,
  onClose,
  masterclass,
  joiningLink = "https://linktr.ee/",
  triggerType = "manual",
}: {
  isOpen: any;
  onClose: any;
  masterclass: any;
  joiningLink: string;
  triggerType?: string;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all border border-white/5">
                <CheckCircleIcon className="w-16 h-16 mb-3 mx-auto text-blue-500 border border-blue-500 rounded-full" />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-black"
                >
                  Thank you for joining
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    Join our Whatsapp community to know more about the
                    masterclass and get notified when it&apos;s live.
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href={joiningLink}
                    target="_blank"
                    className="bg-green-500 p-2 mx-auto flex gap-2  rounded-md justify-center items-center active:scale-105 !no-underline"
                    onClick={() => {
                      mixpanel.track("join_whatsapp", {
                        masterclass: masterclass?.title,
                        masterclassId: masterclass?.id,
                        action: "join",
                        type: triggerType
                      });
                    }}
                  >
                    <span>
                      <Image
                        src="/whatsapp-icon.svg"
                        width={28}
                        height={28}
                        className=""
                        alt="whatsapp icon"
                      />
                    </span>
                    <span className="text-white font-semibold">
                      Join Whatsapp Community
                    </span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}