import { useEffect, useState } from 'react'
import { IconButton } from '@vtfk/components'

import './style.scss'

const defaultOnPageChangeFunc = (from = 0, to = 1) => console.warn('onPageChange callback not implemented. Pagination for', from, '<-->', to)

export function Pagination ({ totalItems = 0, itemsPrPage = 10, onPageChange = defaultOnPageChangeFunc }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePageChange = index => {
    if (onPageChange && typeof onPageChange === 'function') {
      if (index === 0) onPageChange(itemsPrPage * index, itemsPrPage)
      else onPageChange(itemsPrPage * index, itemsPrPage * (index + 1))
    }
  }

  const onArrowClick = type => {
    let newActiveIndex = -1
    if (type === 'back') {
      if (activeIndex === 0) return

      newActiveIndex = activeIndex - 1
    } else if (type === 'forward') {
      if (activeIndex === (getPages().length - 1)) return

      newActiveIndex = activeIndex + 1
    }

    setActiveIndex(newActiveIndex)
    handlePageChange(newActiveIndex)
  }

  useEffect(() => {
    if (totalItems <= itemsPrPage && activeIndex > 0) {
      setActiveIndex(0)
      handlePageChange(0)
    }
  }, [totalItems, itemsPrPage]) // eslint-disable-line

  const onPageClick = index => {
    if (index === activeIndex) return

    setActiveIndex(index)
    handlePageChange(index)
  }

  const getPageCount = () => Math.ceil(totalItems / itemsPrPage)
  const getPages = () => [...Array(getPageCount())]

  return (
    <div className='pagination'>
      {/* <Button onClick={() => console.log('I will go back')} type='secondary2' size='small'><Icon name='arrowLeft' size='small' /></Button> */}
      <IconButton disabled={activeIndex === 0} bordered={false} icon='arrowLeft' onClick={() => onArrowClick('back')} />
      {
        getPages().map((page, index) => <div key={index} className={`page ${index === activeIndex ? 'active' : ''}`} onClick={() => onPageClick(index)}>{index + 1}</div>)
      }
      {/* <Button onClick={() => console.log('I will go forward')} type='secondary2' size='small'><Icon name='arrowRight' size='small' /></Button> */}
      <IconButton disabled={activeIndex === (getPages().length - 1)} bordered={false} icon='arrowRight' onClick={() => onArrowClick('forward')} />
    </div>
  )
}
