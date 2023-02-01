// ** React Imports
import { useState } from 'react'

import { User, AlignCenter, Info, X } from 'react-feather'

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  Input,
  Label
} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({
  open,
  handleModal,
  mode,
  data,
  handleSubmitModal,
  handleEditChange
}) => {

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{mode === 'NEW' ? 'New Record' : 'Edit Record'}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label>* ID</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input name='id' value={data.id} onChange={handleEditChange} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label>* Uri</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input name='uri' value={data.uri} onChange={handleEditChange} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label>* Image Url</Label>
          <InputGroup>
            <InputGroupText>
              <Info size={15} />
            </InputGroupText>
            <Input name='imageUrl' value={data.imageUrl} onChange={handleEditChange} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label>State</Label>
          <div className='form-switch'>
            <Input name='state' type='switch' checked={data.state} onChange={handleEditChange} />
          </div>
        </div>
        <Button className='mr-1' color='primary' onClick={handleSubmitModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
