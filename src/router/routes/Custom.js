import { lazy } from 'react'

const Setting = lazy(() => import('../../views/custom/setting'))
const Project = lazy(() => import('../../views/custom/project'))
const Raffle = lazy(() => import('../../views/custom/raffle'))
const NFTs = lazy(() => import('../../views/custom/nfts'))
const Account = lazy(() => import('../../views/custom/account'))
const ProjectView = lazy(() => import('../../views/custom/project/detail'))
const UsersView = lazy(() => import('../../views/custom/users'))
const WhitelistRaffle = lazy(() => import('../../views/custom/whitelistRaffle'))
const DaoVoting = lazy(() => import('../../views/custom/daoVoting'))
const AdminDash = lazy(() => import('../../views/custom/adminDash'))
const SubscriberDash = lazy(() => import('../../views/custom/subscriberDash'))
const Applications = lazy(() => import('../../views/custom/applications'))
const RafflesManager = lazy(() => import('../../views/custom/rafflesManager'))

const CustomRoutes = [
  {
    path: '/app/setting',
    element: <Setting />
  },
  {
    path: '/app/project',
    element: <Project />
  },
  {
    path: '/app/raffle',
    element: <Raffle />
  },
  {
    path: '/app/nfts',
    element: <NFTs />
  },
  {
    path: '/app/account',
    element: <Account />
  },
  {
    path: '/app/project_detail',
    element: <ProjectView />
  },
  {
    path: '/app/users',
    element: <UsersView />
  },
  {
    path: '/app/whitelistRaffle',
    element: <WhitelistRaffle />
  },
  {
    path: '/app/daoVoting',
    element: <DaoVoting />
  },
  {
    path: '/app/adminDash',
    element: <AdminDash />
  },
  {
    path: '/app/subscriberDash',
    element: <SubscriberDash />
  },
  {
    path: '/app/applications',
    element: <Applications />
  },
  {
    path: '/app/rafflesManager',
    element: <RafflesManager />
  }
]

export default CustomRoutes
