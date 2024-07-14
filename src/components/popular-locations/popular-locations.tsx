"use client"

import React from 'react'
import Card from './card'
import { useQuery } from '@tanstack/react-query'
import { getPopularPlaces } from './service'
import Delhi from '../../../public/img/delhi.jpg'
import Dubai from '../../../public/img/dubai.jpg'
import Berlin from '../../../public/img/berlin.jpg'
import Paris from '../../../public/img/paris.jpg'

const PopularLocations = () => {
  // const { data, isLoading } = useQuery({
  //   queryFn: getPopularPlaces,
  //   queryKey: ["popular-listings"]
  // })

  const data = [
    {
      image: Delhi,
      city: "Delhi",
      numOfPlaces: 73
    },
    {
      image: Berlin,
      city: "Berlin",
      numOfPlaces: 34
    },
    {
      image: Paris,
      city: "Paris",
      numOfPlaces: 52
    },
    {
      image: Dubai,
      city: "Dubai",
      numOfPlaces: 27
    },
  ]

  return (
    <div className="h-full w-full my-36">
      <div className="h-full w-5/6 mx-auto flex flex-col justify-start">
        <h5 className="text-[20px] bg-blue-500 text-white rounded-full p-4 w-max">
          Explore Top
        </h5>
        <h2 className="text-4xl text-slate-800 font-bold mt-6 mb-12">
          Popular Locations
        </h2>
        <div className="flex flex-wrap items-center gap-14">
          {data?.map((place: any, idx: any) => (
            <Card
              key={idx}
              place={place}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularLocations