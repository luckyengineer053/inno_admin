// ** React Imports
import { useState } from 'react'

import { User, AlignCenter, Info, X, PlusCircle, MinusCircle } from 'react-feather'

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
  handleEditChange,
  newState,
  handleNewStateChange,
  handleAddState,
  handleStateChange,
  handleDeleteState
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
          <Label for='country'>* Country</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='country' placeholder='Country' value={data.country} onChange={(event) => handleEditChange(event, 'country')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='state'>State</Label>
          {
            data.states.map((state, index) => {
              return (
                <InputGroup key={index} className='mb-1'>
                  <InputGroupText>
                    <Info size={15} />
                  </InputGroupText>
                  <Input value={state} onChange={(event) => handleStateChange(event, index)} />
                  <Button.Ripple className='btn-icon' color='danger' onClick={(event) => handleDeleteState(event, index)}>
                    <MinusCircle size={16} />
                  </Button.Ripple>
                </InputGroup>
              )
            })
          }
        </div>
        <div className='mb-1'>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input placeholder='New State' value={newState} onChange={handleNewStateChange} />
            <Button.Ripple className='btn-icon' color='primary' onClick={handleAddState}>
              <PlusCircle size={16} />
            </Button.Ripple>
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='description'>Description</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='description' placeholder='Description' value={data.description} onChange={(event) => handleEditChange(event, 'description')} />
          </InputGroup>
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
