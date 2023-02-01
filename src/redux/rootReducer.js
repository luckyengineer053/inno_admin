// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import setting from '@src/views/custom/setting/store'
import project from '@src/views/custom/project/store'
import whitelistOpp from '@src/views/custom/project/store/whitelistOpp'
import daoVotings from '@src/views/custom/project/store/daoVoting'
import wlRaffle from '@src/views/custom/whitelistRaffle/store'
import raffles from '@src/views/custom/rafflesManager/store'
import nft from '@src/views/custom/nfts/store'
import country from '@src/views/init/country/store'
import user from '@src/views/custom/users/store'
import subscriberOverview from '../views/custom/subscriberDash/store'
import adminOverview from '../views/custom/adminDash/store'

const rootReducer = {
  auth,
  setting,
  project,
  whitelistOpp,
  daoVotings,
  raffles,
  wlRaffle,
  nft,
  country,
  user,
  navbar,
  layout,
  subscriberOverview,
  adminOverview
}

export default rootReducer
