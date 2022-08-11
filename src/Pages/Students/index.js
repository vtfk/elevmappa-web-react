import { useState } from 'react'
import { ErrorMessage, SearchField } from '@vtfk/components'
import { isEqual } from 'lodash'
import { useNavigate } from 'react-router-dom'

import { Pagination } from '../../components/Pagination'

import { hasStudents } from '../../lib/has-data'

import { config } from '../../config'

import { useAPI } from '../../hooks/useAPI'

import './style.scss'

export function Students () {
  const [paginationFrom, setPaginationFrom] = useState(0)
  const [paginationTo, setPaginationTo] = useState(config.studentsPrPage)
  const [search, setSearch] = useState('')
  const { items: students, itemsOptions, loading, setItemsOptions } = useAPI('students', 'fullName', 'asc', ['fullName', 'mainGroupName'])
  const navigate = useNavigate()

  const handleSortClick = properties => {
    setItemsOptions({
      ...itemsOptions,
      orderBy: properties,
      order: isEqual(itemsOptions.orderBy, properties) ? (itemsOptions.order === 'asc' ? 'desc' : 'asc') : 'desc'
    })
  }

  const handleStudentClick = id => {
    if (!id) return

    navigate(`students/${id}`)
  }

  return (
    <>
      {
        ((!loading && hasStudents(students)) || (!loading && !hasStudents(students) && search)) &&
          <>
            <SearchField
              debounceMs={100}
              loading={loading}
              onSearch={e => { setSearch(e.target.value); setItemsOptions({ ...itemsOptions, filter: e.target.value }) }}
              placeholder='Søk etter elev eller klasse'
              showClear={false} />

            <div className='students-container'>
              <div className='students'>
                <div className='students-header'>
                  <div className='students-header-column' onClick={() => handleSortClick(['fullName'])}>Navn</div>
                  <div className='students-header-column' onClick={() => handleSortClick(['mainGroupName'])}>Klasse</div>
                </div>
                {
                  (students.length > config.studentsPrPage ? students.slice(paginationFrom, paginationTo) : students).map((student, index) => {
                    return (
                      <div className='student' key={index} onClick={() => handleStudentClick(student.userName)}>
                        <div className='student-name' title='Navn'>{student.fullName}</div>
                        <div className='student-class' title='Klasse'>{student.mainGroupName}</div>
                      </div>
                    )
                  })
                }
              </div>

              {
                hasStudents(students) &&
                  <Pagination totalItems={students.length} itemsPrPage={config.studentsPrPage} onPageChange={(from, to) => { setPaginationFrom(from); setPaginationTo(to) }} />
              }
            </div>

            {
              !loading && !hasStudents(students) && search &&
                <ErrorMessage>
                  Ditt søk fikk ingen resultater.<br />
                  Finner du ikke det du leter etter, ta kontakt med administrativt personale på din skole.
                </ErrorMessage>
            }
          </>
      }

      {
        !loading && !hasStudents(students) && !search &&
          <ErrorMessage>
            Du har ikke tilgang til noen elever.<br />
            Ta kontakt med administrativt personale på din skole dersom du mener dette er feil.
          </ErrorMessage>
      }
    </>
  )
}
