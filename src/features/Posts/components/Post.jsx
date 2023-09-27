
const Post = ({item}) => {
  return (<div>
    <li key={item.id}>
      <h2>{`. ${item.title}`}</h2>
      <p>{item.body}</p>
    </li>
  </div>)
}

export default Post;