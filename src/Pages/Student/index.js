import { useState } from 'react'
import { Button, ErrorMessage, Icon, Modal, ModalBody, PersonCard, SearchField } from '@vtfk/components'
import { useParams } from 'react-router-dom'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'

import { Pagination } from '../../components/Pagination'

import { hasStudent, hasDocuments } from '../../lib/has-data'

import { config } from '../../config'

import { useAPI } from '../../hooks/useAPI'

import './style.scss'

const PersonInfo = ({ person }) => {
  return (
    <PersonCard
      firstName={person.firstName}
      lastName={person.lastName}
      largeName={person.fullname}>
      <div className='extra-info'>
        <span>{person.mail}</span>
        <span>{person.mainGroupName}</span>
      </div>
    </PersonCard>
  )
}

const InfoProp = ({ header, value }) => {
  return (
    <div className='info'>
      <div className='info-header'>{header}:</div>
      <div className='info-value'>{value}</div>
    </div>
  )
}

export function Student () {
  const { id } = useParams()  
  const [fileBase64, setFileBase64] = useState(null)
  const [expandedDocument, setExpandedDocument] = useState('')
  const [documentFileLoading, setDocumentFileLoading] = useState('')
  const [paginationFrom, setPaginationFrom] = useState(0)
  const [paginationTo, setPaginationTo] = useState(config.documentsPrPage)
  const [numPages, setNumPages] = useState(0)
  // items will be a object if all goes well. If an error occurs, items will be an empty array
  const { documents, getFile, items, itemsOptions, loading, setItemsOptions } = useAPI(`students/${id}`, 'displayDate', 'desc', ['title'])

  const toggleExpandedDocument = id => {
    if (id === expandedDocument) setExpandedDocument('')
    else setExpandedDocument(id)
  }

  const getDocumentFile = async (document, file) => {
    setDocumentFileLoading(file)
    const data = await getFile(document.source, document.documentNumber, file.recno, items.userName)
    if (!data) console.error('Failed to retrieve file') // TODO: Add toast here ? -- No point until react-msal return full response for errors aswell
    else {
      setFileBase64(data.file)
    }
  }

  const getContactNames = (contacts, type) => {
    return contacts.filter(contact => contact.Role === type).map(contact => contact.SearchName).join(', ')
  }

  function onDocumentLoadSuccess ({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <>
      {
        !loading && hasStudent(items) && hasDocuments(items) &&
          <>
            <PersonInfo person={items} />

            <SearchField
              debounceMs={100}
              onSearch={e => setItemsOptions({ ...itemsOptions, filter: e.target.value })}
              placeholder='Søk i dokumenttittel'
              showClear={false} />
            
            <div className='documents-container'>
              <div className='documents'>
                {
                  (documents.length > config.documentsPrPage ? documents.slice(paginationFrom, paginationTo) : documents).map((document, index) => {
                    return (
                      <div className='document' key={index}>
                        <div className='document-header'>{document.title}</div>
                        <InfoProp header='Sendt dato' value={document.displayDate} />
                        <InfoProp header='Dok. nr.' value={`${document.documentNumber}${document.source ? ` (${document.source})` : ''}` || 'Ukjent'} />
                        <InfoProp header='Dokumentkategori' value={document.category || 'Ukjent'} />
                        <InfoProp header='Tilgangskode' value={document.accessCodeDescription || 'Ukjent'} />
                        <InfoProp header='Fra' value={getContactNames(document.contacts, 'Avsender')} />
                        <InfoProp header='Til' value={getContactNames(document.contacts, 'Mottaker')} />
                        <div className='toggle' onClick={() => toggleExpandedDocument(document.documentNumber)}>
                          <Icon name={expandedDocument === document.documentNumber ? 'chevronUp' : 'chevronDown'} size='small' /> Filer ({document.files.length})
                        </div>
                        {
                          expandedDocument === document.documentNumber && document.files.map(file => {
                            return (
                              <div className='file' key={file.recno}>
                                <Button size='small' disabled={documentFileLoading.recno === file.recno} onClick={() => { getDocumentFile(document, { file: document.documentNumber, recno: file.recno }) }} title='Klikk for å åpne filen'>
                                  <div className='link-btn'>
                                    <Icon name='pdf' size='small' />
                                    {documentFileLoading.recno === file.recno ? 'Åpner dokumentet...' : file.title}
                                  </div>
                                </Button>
                              </div>
                            )
                          })
                        }

                        {
                          expandedDocument === document.documentNumber && document.files.length === 0 &&
                            <div className='empty-file'>
                              Dokumentet inneholder ingen filer ... 😭
                            </div>
                        }
                      </div>
                    )
                  })
                }
              </div>

              <Pagination totalItems={documents.length} itemsPrPage={config.documentsPrPage} onPageChange={(from, to) => { setPaginationFrom(from); setPaginationTo(to) }} />
            </div>

            {
              documents.length === 0 &&
                <ErrorMessage>
                  Ditt søk fikk ingen resultater.<br />
                  Finner du ikke det du leter etter, ta kontakt med administrativt personale på din skole.
                </ErrorMessage>
            }
          </>
      }

      {
        !loading && hasStudent(items) && !hasDocuments(items) &&
          <>
            <PersonInfo person={items} />
            <ErrorMessage>
              Du har tilgang til denne eleven, men eleven har ingen dokumenter 😲
            </ErrorMessage>
          </>
      }
      
      {
        !loading && !hasStudent(items) &&
          <ErrorMessage>
            Du har ikke tilgang til denne eleven.<br />
            Ta kontakt med administrativt personale på din skole dersom du mener dette er feil.
          </ErrorMessage>
      }

      {
        loading &&
          <span>Henter elev...</span>
      }

      {
        fileBase64 &&
          <Modal
            open
            title={`Dokumentvisning - ${documentFileLoading.file}`}
            onDismiss={() => { setDocumentFileLoading(''); setFileBase64(null) }}>
            <ModalBody>
              <p>{numPages} sider</p>
              <Document file={`data:application/pdf;base64,${fileBase64}`} onContextMenu={e => e.preventDefault()} className='pdf-document' onLoadSuccess={onDocumentLoadSuccess} pageLayout=''>
                {
                  numPages > 0 && [...Array(numPages)].map((page, index) => <Page key={index} pageNumber={index + 1} scale={2} />)
                }
                {
                  numPages === 0 && <span>🤔</span>
                }
              </Document>
            </ModalBody>
          </Modal>
      }
    </>
  )
}
