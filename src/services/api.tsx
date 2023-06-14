import axios from 'axios';

export async function fetchData() {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json");
        return response.data;
    } catch (error) {
        throw new Error(error as string);
    }
}
