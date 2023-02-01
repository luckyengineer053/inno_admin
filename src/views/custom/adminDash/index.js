// ** React Imports
import { Fragment, useEffect } from 'react'

// redux 
import { useSelector, useDispatch } from 'react-redux'
import {
  getData,
  updateEvent
} from './store'

// ** Third Party Components
import {
  Row,
  Col,
  Card
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './index.scss'
// custom components
import Overview from './overview'
import Cards from './cards'
import Log from './log'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const overviewData = useSelector(state => state.adminOverview.data)
  const userData = localStorage.getItem('userData')
  const username = JSON.parse(userData).username

  useEffect(() => {
    dispatch(
      getData(username)
    )
  }, [dispatch])

  console.log('overview: ', overviewData)

  return (
    <Fragment>
      <Row>
        <Col md='12'>
          <Row>
            <Col md='4'>
              <Overview
                data={overviewData}
              />
            </Col>
            <Col md='8'>
              <Cards
                data={overviewData}
              />
            </Col>
          </Row>
          <Row>
            <Log
              data={overviewData}
            />
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
}

export default AdminDashboard
