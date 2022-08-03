import { SearchField, Table } from '@vtfk/components'
import { isEqual } from 'lodash'

import { useAPI } from '../../hooks/useAPI'

import { Layout } from  '../../Layout'

import './style.scss'

export function Students () {
  const { items, itemsOptions, loading, setItemsOptions } = useAPI('students', ['fullName', 'mainGroupName'])

  const headers = [
    {
      label: 'Navn',
      value: 'fullName',
      onClick: () => handleSortClick(['fullName'])
    },
    {
      label: 'Klasse',
      value: 'mainGroupName',
      onClick: () => handleSortClick(['mainGroupName'])
    }
  ]

  const handleSortClick = properties => {
    setItemsOptions({
      ...itemsOptions,
      orderBy: properties,
      order: isEqual(itemsOptions.orderBy, properties) ? (itemsOptions.order === 'asc' ? 'desc' : 'asc') : 'desc'
    })
  }

  const handleStudentClick = ids => {
    if (!Array.isArray(ids) || ids.length === 0) return

    /* TODO: make this a router navigate */
    window.location.pathname = `students/${ids[0]}`
  }

  /* Features from old FrontEnd
    - table is paginated to 8 items
    - (check) on key up in searchfield, table is filtered to show users by search value
    - (check) table has Navn and Klasse
    - (cehck) click on a student sends them to the student view
  */
  return (
    <Layout>
      <SearchField
        debounceMs={100}
        loading={loading}
        onSearch={e => setItemsOptions({ ...itemsOptions, filter: e.target.value })}
        placeholder='Søk etter elev eller klasse'
        showClear={false} />
      
      <Table
        headers={headers}
        items={items}
        isLoading={loading}
        selectOnClick
        itemId='userName' /* this must be a unique property for all items */
        onSelectedIdsChanged={e => handleStudentClick(e)} />
    </Layout>
  )
}
