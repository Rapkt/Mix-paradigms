import { DUMMY_COURSES } from "../constants/courses";

export const getRecommendations = async (payload: any, isAI: boolean) => {
  console.log(`[${isAI ? "AI" : "PROLOG"} ENGINE] Sending payload:`, payload);

  // ==========================================
  // 1. THE MOCK API (Use this for now)
  // ==========================================
  return new Promise((resolve) => {
    setTimeout(() => {
      // (Make sure to use array indexes here instead of .find() so it doesn't crash
      // since we changed your ID format earlier!)
      const fakeRecommendations = [DUMMY_COURSES[10], DUMMY_COURSES[15]].filter(
        Boolean,
      );
      resolve(fakeRecommendations);
    }, 2000);
  });

  // ==========================================
  // 2. THE REAL DJANGO API (Uncomment later!)
  // ==========================================
  /*
  try {
    // Correct URL routing with quotes!
    const URL = isAI 
      ? "http://127.0.0.1:8000/api/recommend/AI" 
      : "http://127.0.0.1:8000/api/recommend/prolog";

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
  */
};
