import { useState } from 'react'

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
  Progress,
  InputGroup
} from 'reactstrap'

import '../adminDash/index.scss'

const ChangePasswordModal = ({
  currentPass,
  open,
  setOpen,
  updatePassword
}) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState(0)

  const onClickSave = () => {
    if (currentPassword !== currentPass) {
      setErrors(1)
      return
    }

    if (newPassword.length < 4) {
      setErrors(2)
      return
    }

    if (newPassword !== confirmPassword) {
      console.log('wrong confirm')
      setErrors(3)
      return
    }

    setErrors(0)
    const userData = localStorage.getItem('userData')
    const discordId = JSON.parse(userData).discordId
    const data = {
      discordId,
      newPassword
    }

    updatePassword(data)
  }

  const handleClose = () => {
    setErrors(0)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setOpen(false)
  }

  return (
    <>
      <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-md changePassword'>
        <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>Change Password</h1>
          </div>

          <div className='mb-1'>
            <Label for='Name'>Current Password</Label>
            <InputGroup>
              <Input name='name' type='password' placeholder='Enter your current password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </InputGroup>
            {errors === 1 && <p className='mt-1 error'>Please enter a correct current password</p>}
          </div>

          <div className='mb-1'>
            <Label for='Name'>New Password</Label>
            <InputGroup>
              <Input name='name' type='password' placeholder='Enter new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </InputGroup>
            {errors === 2 && <p className='mt-1 error'>Your password must be 4 letters at least</p>}
          </div>

          <div className='mb-1'>
            <Label for='Name'>Confirm New Password</Label>
            <InputGroup>
              <Input name='name' type='password' placeholder='Confirm your new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </InputGroup>
            {errors === 3 && <p className='mt-1 error'>Your password doesn't match</p>}
          </div>

          <Row>
            <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-between gap-2'>
              <Button type='reset' className='me-1 btn' color='secondary' outline onClick={handleClose}>
                Discard
              </Button>
              <Button className='btn' color='primary' onClick={onClickSave} >
                Save
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ChangePasswordModal