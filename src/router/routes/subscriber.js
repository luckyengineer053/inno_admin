import { lazy } from 'react'

// const Setting = lazy(() => import('../../views/custom/setting'))
// const Project = lazy(() => import('../../views/custom/project'))
// const Raffle = lazy(() => import('../../views/custom/raffle'))
// const NFTs = lazy(() => import('../../views/custom/nfts'))
// const Account = lazy(() => import('../../views/custom/account'))
// const ProjectView = lazy(() => import('../../views/custom/project/detail'))
// const UsersView = lazy(() => import('../../views/custom/users'))
const WhitelistRaffle = lazy(() => import('../../views/custom/whitelistRaffle'))
const DaoVoting = lazy(() => import('../../views/custom/daoVoting'))

const SubscriberRoutes = [
  // {
  //   path: '/custom/setting',
  //   element: <Setting />
  // },
  // {
  //   path: '/custom/project',
  //   element: <Project />
  // },
  // {
  //   path: '/custom/raffle',
  //   element: <Raffle />
  // },
  // {
  //   path: '/custom/nfts',
  //   element: <NFTs />
  // },
  // {
  //   path: '/custom/account',
  //   element: <Account />
  // },
  // {
  //   path: '/custom/project_detail',
  //   element: <ProjectView />
  // },
  // {
  //   path: '/custom/users',
  //   element: <UsersView />
  // },
  {
    path: '/custom/whitelistRaffle',
    element: <WhitelistRaffle />
  },
  {
    path: '/custom/daoVoting',
    element: <DaoVoting />
  }
]

export default SubscriberRoutes
