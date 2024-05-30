const getData = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Fetching error: " + res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

const Posts = async () => {
  const posts = await getData();
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h1 className="text-red-500">{post.name}</h1>
        </div>
      ))}
    </>
  );
};

export default Posts;
