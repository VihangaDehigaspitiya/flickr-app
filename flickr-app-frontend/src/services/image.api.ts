import axios from "axios";

/**
 * Get all flickr images
 * @param tags
 * @returns {Promise<AxiosResponse<any>>}
 */
const getImages = async (tags = "") => {
    return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/image${tags !== '' ? `?tags=${tags}` : ''}`);
};

const movie = {
    getImages
}

export default movie;
