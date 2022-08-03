import { Icon, IconDropdownNav, IconDropdownNavItem } from '@vtfk/components'

import config from '../config'

import './style.scss'

export function Layout ({ children }) {
  /* Features from old FrontEnd
    - Home button (house) (?)
    - Help button (question mark)
    - User button (dude) to log out and stuff
  */
  const isAuthenticated = true

  return (
    <div className='layout'>
      <div className='header'>
        <div className='logo'>
          { /* TODO: make this into a router link to home */}
          <div className='image'>
            <img alt='logo' src='/logo.png' height='40px' width='40px' />
          </div>
          <div className='text'>
            Elevmappa
          </div>
        </div>

        {
          isAuthenticated &&
            <IconDropdownNav>
              { /* TODO: add router links */}
              <IconDropdownNavItem
                icon={<Icon name='home' />}
                onClick={() => alert('Home min fetter!')}
                title='Hjem' />
              <IconDropdownNavItem
                icon={<Icon name='help' />}
                onClick={() => alert('Help min fetter!')}
                title='Hjelp' />
              <IconDropdownNavItem
                icon={<Icon name='lock' />}
                onClick={() => alert('Log out min fetter!')}
                title='Logg av' />
            </IconDropdownNav>
        }

      </div>

      <div className='content'>
        {children}
      </div>

      <div className='footer'>
        <div className='text'>&copy; {`${new Date().getFullYear()} - ${config.productOwner}`}</div>
      </div>
    </div>
  )
}
