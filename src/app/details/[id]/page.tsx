"use client"
import Image from 'next/image'
import { register } from "swiper/element/bundle"
import { CiLocationOn } from "react-icons/ci"
import { FaBed, FaWifi } from "react-icons/fa"
import React, { useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { format } from 'currency-formatter'
// import BookModal from '@/components/book-modal/BookModal'
import { useQuery } from '@tanstack/react-query'
// import { getListingById } from './service'
// import Reviews from './Reviews'

import hotel_image_1 from '../../../../public/img/hr_1.jpg'
import hotel_image_2 from '../../../../public/img/hr_2.jpg'
import Review from './review'
import BookModal from '@/components/book-modal/book-modal'

register();

const HotelDetails = (props: any) => {
    const id = props.params.id
    const [selectedStar, setSelectedStar] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const swiperElRef = useRef(null)

    // const { data: listing, isPending } = useQuery({
    //     queryKey: ["listings", { id }],
    //     queryFn: () => getListingById(id)
    // })

    const handleShowModal = () => setShowModal(prev => true)
    const handleHideModal = () => setShowModal(prev => false)

    // if (isPending) {
    //     const style: any = {
    //         marginTop: "5rem",
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //         height: "100vh"
    //     }

    //     return (
    //         <div style={style}>
    //             <ClipLoader
    //                 color={"#123abc"}
    //             />
    //         </div>
    //     )
    // }


    return (
        <div className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}>
            {showModal &&
                <BookModal
                    handleHideModal={handleHideModal}
                />
            }
            <div className="h-full w-3/4 mx-auto">
                <div>
                    <div className="w-full h-[750px] overflow-hidden mx-auto">
                        <div className="w-full h-full">
                            <swiper-container
                                ref={swiperElRef}
                                slides-per-view="1"
                                navigation="true"
                            >
                                <swiper-slide>
                                    <Image src={hotel_image_1} className="h-[750px] w-full object-cover" alt=''
                                    />
                                </swiper-slide>
                                <swiper-slide>
                                    <Image src={hotel_image_2} className="h-[750px] w-full object-cover" alt=''
                                    />
                                </swiper-slide>
                            </swiper-container>
                        </div>
                    </div>

                    <div className='mt-12 px-6 w-full flex items-center justify-between'>
                        <h2 className='font-bold text-4xl'>
                            Arabian Paradise
                        </h2>

                        <div>
                            <span className='p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2'>
                                <AiFillStar color='white' />
                                <span className='text-white'>
                                    4.7
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className='mt-16 px-6 flex items-center gap-8'>
                    <span className='flex items-center gap-2'>
                        <CiLocationOn />
                        Dubai, UAE
                    </span>
                    <span className='flex items-center gap-2'>
                        {format(325.50, { locale: 'en-US' })}/night
                    </span>
                    <span className='flex items-center gap-2'>2 <FaBed /></span>
                    <span className='flex items-center gap-2'>Free <FaWifi /></span>
                </div>

                <div className='mt-16 px-6 w-full flex items-end justify-between'>
                    <p className='text-xl max-w-xl text-slate-700'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati consequuntur omnis accusamus iusto dolorum aperiam eaque quod neque ullam! Omnis, rem perferendis quasi laudantium quis eveniet totam odit fugit autem repellendus, quibusdam, adipisci incidunt placeat. Magni non recusandae repellat itaque quam natus adipisci sequi, quis, tenetur laboriosam placeat aperiam praesentium!
                    </p>
                    <button onClick={handleShowModal} className='cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500'>
                        Book
                    </button>
                </div>

                <div className='border-t-2 border-white-800 px-6 mt-16 mx-auto'>
                    <h1 className='mt-16 text-3xl font-bold'>
                        Reviews
                    </h1>

                    <div className='mt-8 flex items-center gap-6'>
                        {
                            Array.from(Array(5).keys()).map((number) => (
                                <span onClick={() => setSelectedStar(number + 1)} className={`${selectedStar === number + 1 ? "scale-125" : ""} cursor-pointer flex items-center gap-2 transition-all`}>
                                    {number + 1}
                                    <AiFillStar size={22} color="rgb(59,130,246)" />
                                </span>
                            ))}
                    </div>

                    <div className='mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max'>
                        <input type="text" className='outline-none' placeholder='Leave your opinion' />
                        <button className='cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 hover:bg-blue-400 transition-all'>
                            Post
                        </button>
                    </div>

                    {/* Review Section */}
                    <Review />
                    <Review />
                    <Review />

                </div>
            </div>
        </div >
    )
}

export default HotelDetails