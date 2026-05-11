export const getRecommendations = async (payload: any, isAI: boolean) => {
  console.log("payload: ");
  console.log(payload);
  
  
  try {
    const URL = isAI
      ? "http://127.0.0.1:8000/api/ai/recommend/"
      : "http://127.0.0.1:8000/api/prolog/recommend/";
    console.log(payload);
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("the data ", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
