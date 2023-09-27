import { useState, useLayoutEffect, useRef, useMemo } from 'react';
import './Main.css'
import Post from './Post';
import { DESCRIPTION_LENGTH, ITEM_HIGH, CONTAINER_HIGH } from '../constants/constants'
const Main = ({ data }) => {

  const [scrollTop, setScrollTop] = useState(0);

  const scrollElementRef = useRef(null)

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current

    if (!scrollElement) {
      return
    }

    const handleScroll = () => {
      const scrollTopx = scrollElement.scrollTop

      setScrollTop(scrollTopx)
    }

    scrollElement.addEventListener('scroll', handleScroll);

    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [])

  const virtualItems = useMemo(() => {
    const start = Math.floor(scrollTop / ITEM_HIGH);
    const end = Math.min(
      data.length - 1,
      Math.ceil((scrollTop + CONTAINER_HIGH) / ITEM_HIGH)
    );

    const virtualItems = []

    for (let i = start; i <= end; i++) {
      virtualItems.push({
        index: i,
        offsetTop: i * ITEM_HIGH,
      })
    }

    return virtualItems;
  }, [scrollTop, data.length]);

  return (
    <section>
      <main className='main'>
        <span>{`Обрезаем на ${DESCRIPTION_LENGTH} символах`}</span>
        <span></span>
        <span></span>
        <div
          ref={scrollElementRef}
          style={{
            height: CONTAINER_HIGH,
            overflow: 'auto',
            outline: '1px red solid',
          }}
        >
          <div
            key={data.length}
            style={{
              height: data.length * ITEM_HIGH,
              position: 'relative',
            }}
          >
            {virtualItems.map((virtualItem) => {
              const item = data[virtualItem.index]
              return <Post key={item.id} item={item} virtualItem={virtualItem} itemHigh={ITEM_HIGH} />
            })}
          </div>
        </div >
      </main>
    </section>
  );
};

export default Main;
