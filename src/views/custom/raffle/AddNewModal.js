// ** React Imports
import { useState } from 'react'
// ** Third Party Components

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
  setData,
  country,
  handleSubmitModal,
  handleEditChange
}) => {
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [currentCountry, setCurrentCountry] = useState(0)
  const handleCountryChange = (event) => {
    setCurrentCountry(event.target.value)
    setData({
      ...data,
      country: country[event.target.value].country,
      state: country[event.target.value].states[0]
    })
  }

  const handleStateChange = (event) => {
    setData({
      ...data,
      state: country[currentCountry].states[event.target.value]
    })
  }

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
          <Label for='first'>* First Name</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='first' placeholder='First Name' value={data.first} onChange={(event) => handleEditChange(event, 'first')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='last'>* Last Name</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='last' placeholder='Last Name' value={data.last} onChange={(event) => handleEditChange(event, 'last')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='company'>Company Name</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='company' placeholder='Company Name' value={data.company} onChange={(event) => handleEditChange(event, 'company')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='country'>* Country</Label>
          <Input type='select' name='select' onChange={handleCountryChange}>
            {
              country !== undefined ? country.map((temp, index) => <option key={index} value={index}>{temp.country}</option>) : ''
            }
          </Input>
        </div>
        <div className='mb-1'>
          <Label for='street1'>* Street Address</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='street1' placeholder='House Number and Street Name' value={data.street1} onChange={(event) => handleEditChange(event, 'street1')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='street2' placeholder='Apartment, Suite, Unit.(Optional)' value={data.street2} onChange={(event) => handleEditChange(event, 'street2')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='state'>* State</Label>
          <Input type='select' name='select' onChange={handleStateChange}>
            {
              country !== undefined ? country[currentCountry] === undefined ? [] : country[currentCountry].states.map((state, index) => <option key={index} value={index}>{state}</option>) : ''
            }
          </Input>
        </div>
        <div className='mb-1'>
          <Label for='zip'>* Zip</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='zip' placeholder='Zip' value={data.zip} onChange={(event) => handleEditChange(event, 'zip')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='city'>* Town/ City</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='city' placeholder='Town/ City' value={data.city} onChange={(event) => handleEditChange(event, 'city')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='phone'>* Phone</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='phone' placeholder='Phone' value={data.phone} onChange={(event) => handleEditChange(event, 'phone')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='email'>* Email</Label>
          <InputGroup>
            <InputGroupText>
              <Info size={15} />
            </InputGroupText>
            <Input id='email' placeholder='Email' value={data.email} onChange={(event) => handleEditChange(event, 'email')} />
          </InputGroup>
        </div>
        <div className='mb-1'>
          <Label for='mintAddress'>Mint Address</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='mintAddress' placeholder='Mint Address' value={data.mintAddress} onChange={(event) => handleEditChange(event, 'mintAddress')} />
          </InputGroup>
        </div>

        <div className='mb-1'>
          <Label for='size'>Size</Label>
          <InputGroup>
            <InputGroupText>
              <AlignCenter size={15} />
            </InputGroupText>
            <Input id='size' placeholder='Size' value={data.size} onChange={(event) => handleEditChange(event, 'size')} />
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
