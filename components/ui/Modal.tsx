import { cn } from "@/lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export interface EnrollNowFormProps {
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  className: string;
  overlayClassName?: string;
  outerDialogClass?: string;
}

export default function Modal({
  isOpen,
  closeModal,
  children,
  className,
  overlayClassName = "",
  outerDialogClass = ""
}: EnrollNowFormProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <div
          className={cn(
            "fixed flex justify-center items-center bg-black/30 inset-0 overflow-y-auto ",
            overlayClassName
          )}
        >
          <div className={"flex items-center justify-center md:p-4  text-center w-full h-full "+outerDialogClass}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              
            >
              <Dialog.Panel
                className={
                  "w-full flex flex-col gap-5 border-4 md:max-w-screen-lg justify-center transform overflow-hidden rounded-2xl mx-2 bg-white p-6 text-left align-middle shadow-xl transition-all  " +
                  " " +
                  className
                }
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
