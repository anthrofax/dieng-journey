import AXIOS_API from "@/utils/axios-api";

export async function getAllReviews() {
    const { data } = await AXIOS_API.get('/admin/review')

    return data
}