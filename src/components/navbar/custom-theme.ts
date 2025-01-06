import { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme["navbar"] = {
  root: {
    base: "px-2 py-2.5 sm:px-16 fixed z-50 h-24 top-0 w-[100vw] flex items-center backdrop-blur bg-primaryBlack/30 text-secondaryWhite",
    rounded: {
      on: "rounded",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "flex flex-wrap items-center justify-between w-full",
      fluid: {
        on: "",
        off: "",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full lg:block lg:w-auto",
    list: " mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-base lg:font-medium",
    hidden: {
      on: "hidden",
      off: "absolute left-0 top-20 lg:static lg:top-0 bg-primaryBlack/50 lg:bg-transparent backdrop-blur lg:backdrop-blur-none rounded-b-lg",
    },
  },
  link: {
    base: "block py-2 pl-3 pr-4 lg:p-0",
    active: {
      on: "",
      off: "",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "rounded-lg p-2 text-sm lg:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};
