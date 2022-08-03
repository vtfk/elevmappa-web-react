import { useEffect, useMemo, useState } from 'react'
import { useSession } from '@vtfk/react-msal'
import { orderBy } from 'lodash'

import { API } from '../../config'

export function useAPI (endpoint, itemProps = []) {
  const { apiGet } = useSession()
  const [_items, setItems] = useState([])
  const [itemsOptions, setItemsOptions] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getItems = async () => {
      setLoading(true)
      try {
        const data = await apiGet(`${API.URL}/${endpoint}`)
        setItems(data)
      } catch (error) {
        console.log('Failed to get items from', endpoint)
        // TODO: use Sentry here
        setItems([])
      }
      setLoading(false)
    }

    getItems()
  }, [endpoint]) // eslint-disable-line

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
