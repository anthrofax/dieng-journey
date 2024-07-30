"use client";

import { AiFillBank, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdHotel } from "react-icons/md";
import { useWidgetHook } from "../../hooks/widget-hook";
import Widget from "../../components/widget";
import BigWidget from "../../components/big-widget";
import Chart from "../../components/chart";

function Dashboard() {
  const [
    usersQuery,
    listingsQuery,
    reservationsQuery,
    revenueQuery,
    mostReservedQuery,
  ] = useWidgetHook();

  const widgetData = [
    {
      page: "users",
      data: usersQuery.data,
      icon: <AiOutlineUser color="#efefef" />,
    },
    {
      page: "listings",
      data: listingsQuery.data,
      icon: <MdHotel color="#efefef" />,
    },
    {
      page: "reservations",
      data: reservationsQuery.data,
      icon: <AiOutlineHome color="#efefef" />,
    },
    {
      page: "revenue",
      data: revenueQuery.data,
      icon: <AiFillBank color="#efefef" />,
    },
  ];

  console.log(revenueQuery.data);
  console.log(reservationsQuery.data);

  return (
    <div className="lg-:w-full h-full flex flex-col col-span-10">
      <div className="grid grid-row-4 lg:grid-rows-1 grid-col-1 lg:grid-cols-4 gap-8 justify-items-center w-screen lg:w-full">
        {widgetData?.map(({ page, data, icon }) => (
          <Widget key={page} page={page} data={data} icon={icon} />
        ))}
      </div>
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-7 lg:gap-16 w-screen lg:w-full items-center py-10">
        <BigWidget listing={mostReservedQuery.data} />
        <Chart revenueDataProps={revenueQuery.data} />
      </div>
    </div>
  );
}

export default Dashboard;
