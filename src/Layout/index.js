import { useState } from 'react'
import { Icon, IconDropdownNav, IconDropdownNavItem, InitialsBadge } from '@vtfk/components'
import { useSession } from '@vtfk/react-msal'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Students } from '../Pages/Students'
import { Student } from '../Pages/Student'
import { Help } from '../Pages/Help'
import { NotFound } from '../Pages/NotFound'

import { config } from '../config'

import './style.scss'

export function Layout () {
  const { isAuthenticated, logout, user } = useSession()
  const navigate = useNavigate()
  const [showInfoMsg, setShowInfoMsg] = useState(true)

  return (
    <div className='layout'>
      <div className='header'>
        <div className='logo'>
          <div className='image' onClick={() => navigate('/')}>
            <img alt='logo' src='/logo.png' height='40px' width='40px' />
          </div>
          <div className='text' onClick={() => navigate('/')}>
            Elevdok (tidligere Elevmappa)
          </div>
        </div>

        {
          isAuthenticated &&
            <nav>
              <InitialsBadge firstName={user.givenName} lastName={user.surname} title={user.name} />
              <IconDropdownNav>
                <IconDropdownNavItem
                  closeOnClick
                  icon={<Icon name='home' />}
                  onClick={() => navigate('/')}
                  title='Hjem'
                />
                <IconDropdownNavItem
                  closeOnClick
                  icon={<Icon name='help' />}
                  onClick={() => navigate('help')}
                  title='Hjelp'
                />
                <IconDropdownNavItem
                  closeOnClick
                  icon={<Icon name='lock' />}
                  onClick={() => logout()}
                  title='Logg av'
                />
              </IconDropdownNav>
            </nav>
        }
      </div>

      <div className='content'>
        {
          showInfoMsg &&
            <div className='infoBox'>
              <p>
                <strong>Informasjon om endring i tilgangsstyring</strong><br />
                <ul>
                  <li>Dette er en løsning som gir oversikt over eller lesetilgang til elevdokumenter som ligger arkivert i fylkets sak -og arkivsystem ("P360").</li>
                  <li>Kontaktlærer har lesetilgang til elevdokumenter tilknyttet kontaktelever.</li>
                  <li>Faglærer får se en oversikt over titlene på elevdokumentene, og må derfor henvende seg til sin nærmeste leder ved tjenstlig behov for å lese et dokument. Leder åpner dokumentet i "P360" og lar faglærer lese det.</li>
                  <li>Alle oppslag i elevdokumenter loggføres av systemet.</li>
                  <li>Løsningen har fått nytt navn, og heter nå "Elevdok".</li>
                </ul>
              </p>
              <p class="butt" onClick={() => { setShowInfoMsg(false) }}>Lukk info</p>
            </div>
        }
        <Routes>
          <Route path='/' element={<Students />} />
          <Route path='/students/:id' element={<Student />} />
          <Route path='/help' element={<Help />} />

          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>

      <div className='footer'>
        <div className='text'>&copy; {`${new Date().getFullYear()} - ${config.productOwner}`}</div>
      </div>
    </div>
  )
}
