"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children
}) => {
  return ( 
    <Transition.Root
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed
              inset-0
              bg-gradient-to-br
              from-indigo-900/30
              to-black/50
              backdrop-blur-sm
              transition-all
            "
          />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="
              flex
              min-h-full
              items-center
              justify-center
              p-4
              text-center
              sm:p-0
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="
                  relative
                  transform
                  overflow-hidden
                  rounded-xl
                  bg-white
                  dark:bg-gray-900
                  px-4
                  pb-4
                  text-left
                  shadow-xl
                  transition-all
                  w-full
                  sm:my-8
                  sm:w-full
                  sm:max-w-lg
                  sm:p-6
                  border
                  border-indigo-100
                  dark:border-indigo-900/30
                "
              >
                <div
                  className="
                    absolute
                    right-0
                    top-0
                    pr-4
                    pt-4
                    z-10
                  "
                >
                  <button
                    type="button"
                    className="
                      rounded-full
                      bg-white/80
                      dark:bg-gray-800/80
                      text-gray-500
                      dark:text-gray-400
                      hover:text-indigo-600
                      dark:hover:text-indigo-400
                      hover:bg-white
                      dark:hover:bg-gray-800
                      p-1.5
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                      focus:ring-offset-2
                      transition-all
                      duration-200
                    "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
   );
}
 
export default Modal;