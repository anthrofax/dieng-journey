import { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme["navbar"] = {
  root: {
    base: "bg-transparent px-2 py-2.5 sm:px-10 fixed z-50 h-24 w-full top-0 left-0 flex items-center",
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
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full lg:block lg:w-auto",
    list: " mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium",
    hidden: {
      on: "hidden",
      off: "absolute left-0 top-20 lg:static lg:top-0 bg-white lg:bg-transparent backdrop-blur lg:backdrop-blur-none",
    },
  },
  link: {
    base: "block py-2 pl-3 pr-4 lg:p-0",
    active: {
      on: "border-b-2",
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
