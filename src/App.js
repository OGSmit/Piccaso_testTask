import { Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Main from './features/Posts/components/Main';
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
          return <Route key={item.id} path={`/${item.id}`} element={(
            <>
              <span>{`${item.id}${item.title}${item.body}`}</span>
              <Link to='/' >Назад</Link>
            </>
          )} />
        })}
        <Route path='/*' element={<span>Упс такой страницы нет</span>} />
      </Routes>
    </>
  );
}

export default App;
