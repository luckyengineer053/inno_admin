import { lazy } from 'react'

const Country = lazy(() => import('../../views/custom/whitelistRaffle'))

const InitDataRoutes = [
  {
    path: '/custom/whitelistRaffle',
    element: <Country />
  }
]

export default InitDataRoutes
