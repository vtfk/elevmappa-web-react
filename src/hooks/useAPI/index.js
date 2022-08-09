import { useEffect, useMemo, useState } from 'react'
import { useSession } from '@vtfk/react-msal'
import { orderBy } from 'lodash'
import { hasStudent } from '../../lib/has-data'

import { API } from '../../config'

export function useAPI (endpoint, defaultOrderBy, defaultOrder, itemProps = []) {
  const { apiGet, apiPost } = useSession()
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
        console.error('Failed to get items from', endpoint)
        // TODO: use Sentry here
        setItems([])
      }
      setLoading(false)
    }

    getItems()
  }, [endpoint]) // eslint-disable-line

  const getFile = async (source, documentId, recno, id) => {
    try {
      const data = await apiPost(`${API.URL}/file`, { source, documentId, recno, id }, true)
      console.log('I got:', data)
      return data.data
    } catch (error) {
      console.error('Failed to fetch file', documentId, 'with recno', recno, `from '${source}'`)
      // TODO: use Sentry here
      return null
    }
  }

  const options = useMemo(() => {
    return {
      filter: '',
      orderBy: [defaultOrderBy],
      order: defaultOrder,
      ...itemsOptions
    }
  }, [itemsOptions, defaultOrderBy, defaultOrder])

  const items = useMemo(() => {
    const orderItems = items => orderBy(items, options.orderBy, options.order)

    if (hasStudent(_items)) return _items
    if (options.filter === '') return orderItems(_items)

    const filtered = _items.filter(item => itemProps.map(prop => item[prop].toLowerCase().includes(options.filter.toLowerCase())).includes(true))
    return orderItems(filtered)
  }, [_items, itemProps, options])

  const documents = useMemo(() => {
    const orderDocuments = documents => orderBy(documents, [resultItem => new Date(resultItem.date)], options.order)

    if (!hasStudent(_items)) return []

    if (options.filter === '') return orderDocuments(_items.documents)

    const filtered = _items.documents.filter(document => itemProps.map(prop => document[prop].toLowerCase().includes(options.filter.toLowerCase())).includes(true))
    return orderDocuments(filtered)
  }, [_items, itemProps, options])

  return {
    documents,
    getFile,
    items,
    itemsOptions,
    loading,
    setItemsOptions
  }
}
