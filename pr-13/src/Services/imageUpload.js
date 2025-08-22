import axios from "axios";


export const uploadImage = async (data) => {
    let formData = new FormData();

    formData.append('file', data);
    formData.append('upload_preset', "Blinkit_clone");
    formData.append('cloud_name', 'dcb8wpa6p');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dcb8wpa6p/image/upload`, formData)
    return res.data.secure_url;
}