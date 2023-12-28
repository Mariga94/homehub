// API BASE CONFIG

const BASE_URL = `http://localhost:3000/api/`;
const apiKEY = "123456ABCD";

export const fetchData = async (endpoint: string, options = {}) => {
  const headers = {
    "x-api-key": apiKEY,
    ...options,
  };
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, { headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};

type PostDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export const postData = async (endpoint: string, postData: PostDataType) => {
  try {
    //POST dat to the API
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": '123456ABCD'
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("POST request failed:", err);
    throw new Error(err.message || "An unexpected error occurred")
  }
};
