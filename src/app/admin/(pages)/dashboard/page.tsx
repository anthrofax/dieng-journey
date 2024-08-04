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
    destinationsQuery,
    ordersQuery,
    revenueQuery,
    mostOrderedQuery,
  ] = useWidgetHook();

  const widgetData = [
    {
      page: "users",
      label: "Pengguna Aktif",
      data: usersQuery.data,
      icon: <AiOutlineUser color="#efefef" />,
    },
    {
      page: "destinations",
      label: "Destinasi",
      data: destinationsQuery.data,
      icon: <MdHotel color="#efefef" />,
    },
    {
      page: "orders",
      label: "Transaksi",
      data: ordersQuery.data,
      icon: <AiOutlineHome color="#efefef" />,
    },
    {
      page: "orders",
      label: "Pendapatan",
      data: revenueQuery.data,
      icon: <AiFillBank color="#efefef" />,
    },
  ];

  return (
    <div className="lg-:w-full h-full flex flex-col col-span-10">
      <div className="grid grid-row-4 lg:grid-rows-1 grid-col-1 lg:grid-cols-4 gap-8 justify-items-center w-screen lg:w-full">
        {widgetData?.map(({ page, data, icon, label }) => (
          <Widget
            key={page}
            page={page}
            data={data}
            icon={icon}
            label={label}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-7 lg:gap-16 w-screen lg:w-full items-center py-10">
        <BigWidget destination={mostOrderedQuery.data} />
        <Chart propsDataPendapatan={revenueQuery.data} />
      </div>
    </div>
  );
}

export default Dashboard;
