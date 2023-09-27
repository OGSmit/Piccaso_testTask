export default async function fetchPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (res.ok) {
      return res.json();
    }
  }
  catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}