// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import {
  Row,
  Col,
  Card
} from 'reactstrap'

// redux 
import { useSelector, useDispatch } from 'react-redux'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// custom components
import Cards from './cards'
import Overview from './overview'

import {
  getData,
  updateEvent
} from './store'

import UploadIcon from '@src/assets/images/icons/upload.png'

const SubscriberDashboard = () => {
  const dispatch = useDispatch()
  const overviewData = useSelector(state => state.subscriberOverview)
  const userData = localStorage.getItem('userData')
  const username = JSON.parse(userData).username

  const [imageSrc, setImageSrc] = useState(UploadIcon)
  const [imageFile, setImageFile] = useState('')

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    }
  }

  useEffect(() => {
    dispatch(
      getData(username)
    )
  }, [dispatch])

  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <Row>
            <Col md='6'>
              <Overview
                data={overviewData.data}
                imageSrc={imageSrc}
                handleImageChange={handleImageChange}
              />
            </Col>
            <Col md='6'>
              <Cards
                data={overviewData.data}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  )
}

export default SubscriberDashboard
