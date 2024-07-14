import AXIOS_API from "@/utils/axios-api";

export async function getPopularPlaces() {
    const { data } = await AXIOS_API.get('/listing/popular-locations')

    return data
}