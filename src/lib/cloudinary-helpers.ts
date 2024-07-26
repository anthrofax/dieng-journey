export async function postImages(cloudName:string, formData:FormData) {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
    })

    const data = await res.json()

    const imageUrl = data["secure_url"]

    return imageUrl
}

export async function removeImage(cloudName:string, formData:FormData) {
  

}