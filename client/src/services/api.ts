// API BASE CONFIG
//'http://localhost:3000/api/'
// `https://homehubapi.onrender.com/api/`;
const BASE_URL = `https://homehubapi.onrender.com/api/`;

export const fetchData = async (endpoint: string) => {

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": '123456ABCD'
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};




export const postData = async (endpoint: string, method: string = 'POST', postData: unknown) => {
  try {
    //POST dat to the API
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": '123456ABCD'
      },

      body: postData ? JSON.stringify(postData) : undefined,
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
