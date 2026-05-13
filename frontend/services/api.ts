
export const getRecommendations = async (payload: any, isAI: boolean) => {

  const api_url = process.env.EXPO_PUBLIC_IP_ADDRESS
  
  try {
    const URL = isAI
      ? `http://${api_url}:8000/api/ai/recommend/`
      : `http://${api_url}:8000/api/prolog/recommend/`;
    console.log(URL);  
    console.log(payload);
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log(response)
    const data = await response.json();
    console.log("the data ", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
