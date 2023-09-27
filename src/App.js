import { Route, Routes } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Main from './features/Posts/components/Main';
import './App.css';
import fetchPosts from './features/Posts/utils/fetchPosts';

function App() {

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
            <section>
              <div style={{
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                <span>{`Номер=${item.id}`}</span>
                <span>{`Заголовок=${item.title}`}</span>
                <span>{`Полное Описание${item.body}`}</span>
                <Link style={{
                  height: 'max-content',
                  width: 'max-content',
                  textDecoration: 'none'
                }} to='/#' >Назад</Link>
              </div>
            </section>
          )} />
        })}
        <Route path='/*' element={<span>Упс такой страницы нет</span>} />
      </Routes>
    </>
  );
}

export default App;
