// ** Icons Import
import { Settings, Package, Droplet, Image, Grid, Users } from 'react-feather'

export default [
  {
    header: 'ADMIN'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <img src='/assets/img/dashboard.png' style={{ paddingRight: '15px' }} />,
    navLink: '/app/adminDash'
  },
  {
    id: 'project',
    title: 'Project',
    icon: <img src='/assets/img/check.png' style={{ paddingRight: '15px' }} />,
    navLink: '/app/project'
  },
  {
    id: 'applications',
    title: 'Applications',
    icon: <img src='/assets/img/applications.png' style={{ paddingRight: '15px' }} />,
    navLink: '/app/applications'
  },
  {
    id: 'rafflesManager',
    title: 'Raffles Manager',
    icon: <img src='/assets/img/ticket.png' style={{ paddingRight: '15px' }} />,
    navLink: '/app/rafflesManager'
  },
  {
    id: 'subscribers',
    title: 'Subscribers',
    icon: <Users size={20} />,
    navLink: '/app/users'
  },
  {
    id: 'setting',
    title: 'Setting',
    icon: <Settings size={20} />,
    navLink: '/app/setting'
  }

]
