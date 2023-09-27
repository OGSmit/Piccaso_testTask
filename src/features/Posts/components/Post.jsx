import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ item, virtualItem, itemHigh }) => {
  // const textRef = useRef(null)
  // console.log(textRef.current)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/${item.id}`, {replace: true})
  }

  return (<div
    key={item.id}
    style={{
      height: itemHigh,
      position: 'absolute',
      top: 0,
      transform: `translateY(${virtualItem.offsetTop}px)`,
      width: '100%',
    }}
  >
    <p className='scroll-itemText'>{`${item.id}. ${item.title} ${item.body}`}</p>
    <button onClick={handleClick} className='scroll-itemButton' type='button'>Просмотр</button>
  </div >
  )
}

export default Post;