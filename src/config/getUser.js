const getUser = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Fetching error: " + res.statusText);
    }
    const FetchValue = await res.json();
    return FetchValue;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};