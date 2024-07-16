import listing_image from "../../../public/img/hr_1.jpg"
import Card from "./card"

function Reservations() {
    const data = [
        {
            id: crypto.randomUUID(),
            listingId: 1,
            image: listing_image,
            location: "Dubai",
            name: "Arabian Paradise",
            startDate: new Date(),
            endDate: new Date().getDate() + 5,
            daysDifference: 5,
            pricePerNight: 500
        },
        {
            id: crypto.randomUUID(),
            listingId: 1,
            image: listing_image,
            location: "Dubai",
            name: "Arabian Paradise",
            startDate: new Date(),
            endDate: new Date().getDate() + 5,
            daysDifference: 5,
            pricePerNight: 500
        },
        {
            id: crypto.randomUUID(),
            listingId: 1,
            image: listing_image,
            location: "Dubai",
            name: "Arabian Paradise",
            startDate: new Date(),
            endDate: new Date().getDate() + 5,
            daysDifference: 5,
            pricePerNight: 500
        },
    ]

    return (
        <div className="mt-24 px-16 min-h-screen w-full">
            <div className="h-full w-full flex flex-wrap gap-12">
                {data?.map((hotel) => (
                    <Card
                        key={hotel.listingId}
                        hotel={hotel}
                    />
                ))}
            </div>
        </div>
    )
}

export default Reservations
