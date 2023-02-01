import React, { useState, useEffect, Fragment } from 'react'
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Progress
} from 'reactstrap'

import { FileText } from 'react-feather'

import './detail.scss'

const WhitelistOpp = () => {
  const [show, setShow] = useState(false)

  return (
    <Fragment >
      <FileText
        color='#555555'
        size={18}
        className='icon'
        onClick={() => setShow(true)}
        style={{ marginRight: '10px' }}
      />
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 whitelist-opp'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>Whitelist Opportunity</h1>
            <p className='sub-title' color='#555555'>Hosted by: Inoooo</p>
          </div>
          <Row>
            <Col md={3}>
              <img src='/assets/img/dao.png' alt='dao' />
            </Col>
            <Col md={9}>
              <table>
                <tr>
                  <td>Project: </td>
                  <td>Project Name</td>
                </tr>
                <tr>
                  <td>Whitelist Spots: </td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Duration: </td>
                  <td>72 hours</td>
                </tr>
                <tr>
                  <td>Starts on: </td>
                  <td>22 JUL 2022</td>
                </tr>
                <tr>
                  <td>Following Requirements: </td>
                  <td>https://twitter.com/newproject</td>
                </tr>
              </table>
            </Col>
          </Row>
          <Row>
            <Col xs='12'>
              <p>Winners</p>
              <table>
                <tr>
                  <th>Discord ID</th>
                  <th>Wallet Address</th>
                </tr>
                <tr>
                  <td>JohnDoe#1234</td>
                  <td>ABCD...1e2f</td>
                </tr>
                <tr>
                  <td>JohnDoe#1234</td>
                  <td>ABCD...1e2f</td>
                </tr>
                <tr>
                  <td>JohnDoe#1234</td>
                  <td>ABCD...1e2f</td>
                </tr>
                <tr>
                  <td>JohnDoe#1234</td>
                  <td>ABCD...1e2f</td>
                </tr>
                <tr>
                  <td>JohnDoe#1234</td>
                  <td>ABCD...1e2f</td>
                </tr>
              </table>
            </Col>

          </Row>

        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default WhitelistOpp