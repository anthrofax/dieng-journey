import AXIOS_API from "@/utils/axios-api";

export async function getMostReservedListings() {
    const { data } = await AXIOS_API.get('/admin/listing/most-reserved')

    if (data) {
        const { data: base64 } = await AXIOS_API.get(`/base64?url=${data.imageUrls[0]}`)
        data.blurredImage = base64

        return data
    }
}