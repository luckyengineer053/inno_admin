import React, { useState } from 'react'
import { Card, Col, Row } from 'reactstrap'

// custom components
import ChangePasswordModal from './changePassword'
import ChangeImageModal from './changeImage'

import '../adminDash/index.scss'
import { BACKEND_URL } from '../../../configs'

// redux
import { updatePassword } from './store'
import { useDispatch } from 'react-redux'

const Overview = ({ data }) => {
  const dispatch = useDispatch()
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)

  const updatePasswordData = (updatedData) => {
    dispatch(updatePassword(updatedData))
  }

  return (
    <>
      <Card className='subscriberOverviewBody'>
        <Row>
          <div className='title'>
            Overview
          </div>
        </Row>
        <hr />
        <Row>
          <Col sm='4'>
            <img src={BACKEND_URL + data.image} alt='image' />
          </Col>
          <Col sm='8'>
            <table>
              <tbody>
                <tr>
                  <td className='tdLeft'>DAO Hub Name</td>
                  <td className='tdRight'>{data.projectName}</td>
                </tr>
                <tr>
                  <td className='tdLeft'>Subscription</td>
                  <td className='tdRight'>{data.billingCycle === 0 ? 'Monthly (2 SOL)' : 'Yearly (2 SOL)'}</td>
                </tr>
                <tr>
                  <td className='tdLeft'>Main Contact</td>
                  <td className='tdRight'>{data.discordName}</td>
                </tr>
                <tr>
                  <td className='tdLeft'>Password</td>
                  <td className='tdRight' onClick={() => setPasswordOpen(true)}>
                    <span>Change Password</span>
                  </td>
                </tr>
                <tr>
                  <td className='tdLeft'>Display Image</td>
                  <td className='tdRight' onClick={() => setImageOpen(true)}>
                    <span>Change Image</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Card>
      <ChangePasswordModal
        open={passwordOpen}
        setOpen={setPasswordOpen}
        currentPass={data.password}
        updatePassword={updatePasswordData}
      />
      <ChangeImageModal
        open={imageOpen}
        setOpen={setImageOpen}
        currentImage={data.image}
        projectId={data.projectId}
      />
    </>
  )
}

export default Overview