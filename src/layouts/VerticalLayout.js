// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical/apps'
import { raffleVoting, raffle, voting } from '@src/navigation/vertical/init'
import { current } from '@reduxjs/toolkit'

const VerticalLayout = props => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])
  const currentRole = JSON.parse(localStorage.getItem('userData'))

  // if (currentRole.role === 'admin') {
  //   return (
  //     <Layout menuData={navigation} {...props}>
  //       <Outlet />
  //     </Layout>
  //   )
  // } else {
  //   return (
  //     <Layout menuData={subscriberNavigation} {...props}>
  //       <Outlet />
  //     </Layout>
  //   )
  // }
  if (currentRole.role === 'admin') {
    return (
      <Layout menuData={navigation} {...props}>
        <Outlet />
      </Layout>
    )
  } else if (currentRole.role === 'subscriber') {
    if (currentRole.hasWlRaffle && currentRole.hasDaoVoting) {
      return (
        <Layout menuData={raffleVoting} {...props}>
          <Outlet />
        </Layout>
      )
    } else if (currentRole.hasWlRaffle && !currentRole.hasDaoVoting) {
      return (
        <Layout menuData={raffle} {...props}>
          <Outlet />
        </Layout>
      )
    } else if (!currentRole.hasWlRaffle && currentRole.hasDaoVoting) {
      return (
        <Layout menuData={voting} {...props}>
          <Outlet />
        </Layout>
      )
    }
  }

  // return (
  //   <Layout menuData={currentRole.role === 'admin' ? navigation : subscriberNavigation} {...props}>
  //     <Outlet />
  //   </Layout>
  // )

}

export default VerticalLayout
