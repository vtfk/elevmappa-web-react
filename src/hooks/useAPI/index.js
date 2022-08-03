import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { orderBy } from 'lodash'

import { API } from '../../config'

export function useAPI (token, endpoint, itemProps = []) {
  const [_items, setItems] = useState([])
  const [itemsOptions, setItemsOptions] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getItems = async () => {
      setLoading(true)
      try {
        const options = {
          headers: {
            Authorization: token
          }
        }

        const { data } = await axios.get(`${API.URL}/${endpoint}`, options)
        setItems(data)
      } catch (error) {
        console.log('Failed to get items from', endpoint)
        // TODO: use Sentry here
        setItems([])
      }
      setLoading(false)
    }

    getItems()
  }, [token, endpoint])

  const options = useMemo(() => {
    return {
      filter: '',
      orderBy: ['fullName'],
      order: 'asc',
      ...itemsOptions
    }
  }, [itemsOptions])

  const items = useMemo(() => {
    if (options.filter === '') return orderBy(_items, options.orderBy, options.order)

    const filtered = _items.filter(item => itemProps.map(prop => item[prop].toLowerCase().includes(options.filter.toLowerCase())).includes(true))
    return orderBy(filtered, options.orderBy, options.order)
  }, [_items, itemProps, options])

  return {
    items,
    itemsOptions,
    loading,
    setItemsOptions
  }
}
