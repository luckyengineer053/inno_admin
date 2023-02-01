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
// import styles from './index.module.scss'
import './index.scss'

const AddNewModal = ({
  open,
  handleModal,
  mode,
  data,
  handleSubmitModal,
  handleEditChange,
  handleImageChange,
  imageSrc
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
          <Label for='name'>* Project Name</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='name' placeholder='name' value={data.name} onChange={(event) => handleEditChange(event, 'name')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='hostedProject'>* Hosted By</Label>
          <InputGroup>
            <InputGroupText>
              <Info size={15} />
            </InputGroupText>
            <Input id='hostedProject' placeholder='hostedProject' value={data.hostedProject} onChange={(event) => handleEditChange(event, 'hostedProject')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='submittedUser'>submittedUser</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='submittedUser' placeholder='submittedUser' value={data.submittedUser} onChange={(event) => handleEditChange(event, 'submittedUser')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <div className={'collection_icon'}>
            <div className={'icon_header'}>Image <span className='text-danger'>*</span></div>
            <div className={'icon_content'}>
              <img src={imageSrc} />
              <input type='file' onChange={handleImageChange} />
            </div>
          </div>
        </div>
        <div className='mb-1'>
          <Label for='wlSpots'>wlSpots</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='wlSpots' placeholder='wlSpots' value={data.wlSpots} onChange={(event) => handleEditChange(event, 'wlSpots')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='requirement'>requirement</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='requirement' placeholder='requirement' value={data.requirement} onChange={(event) => handleEditChange(event, 'requirement')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='description'>description</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='description' placeholder='description' value={data.description} onChange={(event) => handleEditChange(event, 'description')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='startDate'>startDate</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='startDate' placeholder='startDate' value={data.startDate} onChange={(event) => handleEditChange(event, 'startDate')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='endDate'>endDate</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='endDate' placeholder='endDate' value={data.endDate} onChange={(event) => handleEditChange(event, 'endDate')} />
          </InputGroup>
        </div>

        <div className='mb-1'>
          <Label for='twitter'>twitter</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='twitter' placeholder='twitter' value={data.twitter} onChange={(event) => handleEditChange(event, 'twitter')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='discord'>discord</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='discord' placeholder='discord' value={data.discord} onChange={(event) => handleEditChange(event, 'discord')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='website'>website</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='website' placeholder='website' value={data.website} onChange={(event) => handleEditChange(event, 'website')} />
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
