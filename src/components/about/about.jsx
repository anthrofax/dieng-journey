import React from "react";
import { GiMountainRoad } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";

function About() {
  return (
    <section className="relative w-full my-36">
      <section className="flex w-5/6 gap-5 mx-auto justify-center relative">
        <section className="w-[40%] relative">
          <img
            src="/img/dieng.jfif"
            alt="Dieng"
            className="w-[350px] rounded-2xl object-cover"
          />
          <div className="absolute right-5 top-10 w-[100px] bg-white flex justify-center items-center gap-2 shadow-xl rounded-2xl py-2 px-4">
            <div className="bg-blue-300 rounded-2xl flex justify-center items-center py-2 px-4">
              <GiMountainRoad color="blue" size={30} />
            </div>
            <div>
              <h3 className="text-slate-500">Paket Travel</h3>
              <h3 className="text-slate-800 text-xl font-bold">2</h3>
            </div>
          </div>
        </section>
        <section className="w-[60%] flex flex-col justify-center p-4 gap-3">
          <h1 className="sm:text-2xl text-4xl sm:w-[80%] w-[60%] text-slate-800 font-bold mb-4">
            Dieng Journey Travel Agency
          </h1>
          <p className="text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            ex quibusdam, consequuntur quisquam itaque aut, velit culpa fuga
            labore aliquam deleniti? Voluptatem laboriosam quae enim atque
            distinctio asperiores suscipit mollitia! At nostrum possimus
            provident. Illo, similique natus consectetur provident maxime
            ducimus ratione id beatae cum itaque quasi a unde rem?
          </p>
          <button className="mt-3">
            <div className="bg-blue-500 flex gap-2 items-center rounded-lg w-max p-3">
              <h1 className="text-white">Read More</h1>
              <IoIosArrowForward color="white" size={20} />
            </div>
          </button>
        </section>
      </section>
    </section>
  );
}

export default About;
