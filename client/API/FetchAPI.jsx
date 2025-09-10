
const fetchA = async (lang, code) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, code }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching:", error);
    return null;
  }
};

const genOutput = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/output`);
    const data = await res.json();

  
    const formattedOutput = data.output;

    return formattedOutput;
  } catch (err) {
    console.error("Error fetching output:", err);
    return "Error fetching output";
  }
};



export { fetchA , genOutput};
