import { useNavigate } from "react-router-dom";
import { DESCRIPTION_LENGTH } from '../constants/constants'

const Post = ({ item, virtualItem, itemHigh }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/${item.id}`, { replace: true })
  }

  return (<div
    className='scroll-container'
    key={item.id}
    style={{
      height: itemHigh,
      position: 'absolute',
      top: 0,
      transform: `translateY(${virtualItem.offsetTop}px)`,
      width: '100%',
    }}
  >
    <p className='scroll-itemText'>{`Номер=${item.id} Заголовок=${item.title} Описание обрезанное${item.body.length > DESCRIPTION_LENGTH ? item.body.slice(0, DESCRIPTION_LENGTH - 3) + '...' : item.body}`}</p>
    {item.body.length > DESCRIPTION_LENGTH && <button onClick={handleClick} className='scroll-itemButton' type='button'>Просмотр</button>}
  </div >
  )
}

export default Post;
