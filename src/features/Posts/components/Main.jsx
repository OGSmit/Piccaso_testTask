

const Main = ({ data }) => {
  console.log(data);

  return (
    <ul>
      {data.map((item, index) => (
        <li key={item.id}>
          <h2>{`${index}. ${item.title}`}</h2>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default Main;