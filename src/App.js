import { Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import Main from './features/Posts/components/Main';
import Post from './features/Posts/components/Post';
import './App.css';

function App() {
  async function fetchPosts() {
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

  const { data, isLoading, error } = useQuery('posts', fetchPosts)
  if (isLoading) {
    return <h3>Loading...</h3>
  }

  if (error) {
    return <h3>{error}</h3>
  }

  if (!data) {
    return <h3>Empty</h3>
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Main data={data} />} />
        {(data.length > 0) && data.map((item) => {
          return <Route key={item.id} path={`/${item.id}`} element={<Post item={item} />} />
        })}
      </Routes>
    </>
  );
}

export default App;
