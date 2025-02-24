// This is the DATA URL
const API_URL = import.meta.env.VITE_QUIZ_API_URL;


export const data = async () => {
    try { // API Fetching 
        const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_URL}&limit=10`);
        const data = await response.json();

        return data.map((q, index) => {
            const options = Object.values(q.answers).filter(answer => answer !== null);
            const correctIndex = Object.values(q.correct_answers).findIndex(ans => ans === "true");

            return {
                id: index + 1,
                question: q.question,
                option1: options[0] || "Option 1",
                option2: options[1] || "Option 2",
                option3: options[2] || "Option 3",
                option4: options[3] || "Option 4",
                ans: correctIndex + 1, 
            };
        });
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        return [];
    }
};
