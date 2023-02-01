// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import axios from 'axios'
// ** Reactstrap Imports
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
  Table
} from 'reactstrap'

import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// Card, CardHeader, CardTitle, CardBody, Input, Label

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
// import './edit.scss'

const WinnerModal = ({
  open,
  setOpen,
  data
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  const getWinner = (discordId) => {
    if (data.isEnded) {
      const temp = { discordName: '', walletAddress: '' }
      if (data.rafflers) {
        data.rafflers.map((raffler) => {
          if (raffler.discordId === discordId) {
            temp.discordName = raffler.discordName
            temp.walletAddress = raffler.walletAddress
          }
        })
      }
      return temp
    }
  }

  return (
    <Fragment>
      <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>Winners</h1>
          </div>

          <Table striped responsive>
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} >
                  Name
                </th>
                <th style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
                  Wallet Address
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.winners && data.winners.map((discordId, index) => {
                  const temp = getWinner(discordId)
                  return <tr key={index}>
                    <td>{temp.discordName}</td>
                    <td>{temp.walletAddress}</td>
                  </tr>
                })
              }
            </tbody>
          </Table>

          <Row>
            <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-end'>
              <Button type='reset' className='me-1' color='secondary' outline onClick={handleClose}>
                Exit
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default WinnerModal
