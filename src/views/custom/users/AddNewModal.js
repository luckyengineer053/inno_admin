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
  Label,
  FormFeedback
} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import styles from './index.module.scss'

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

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
  const [errors, setErrors] = useState({})
  const handleValidation = () => {
    const fields = data
    const errors = {}
    let formIsValid = true
    console.log('fields: ', fields)
    for (const key in fields) {
      if (key !== 'avatar' && key !== '_id' && fields[key] === '') {
        errors[key] = true
        formIsValid = false
      }
    }
    console.log('error')
    setErrors(errors)
    return formIsValid
  }

  const handleSubmit = () => {
    console.log('submit data: ', data)
    const isValid = handleValidation()
    // if (isValid) {
    // }
    handleSubmitModal()
  }

  const handleClose = () => {
    setErrors({})
    handleModal()
  }
  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleClose} />

  return (
    <Modal
      isOpen={open}
      toggle={handleClose}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{mode === 'NEW' ? 'New Record' : 'Edit Record'}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label for='username'>* User Name</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='username' required placeholder='username' value={data.username} onChange={(event) => handleEditChange(event, 'username')} />
          </InputGroup>
          {errors.username && <p className={styles.error}>Please enter a valid fullName</p>}
        </div>
        <div className='mb-1'>
          <Label for='discordId'>* Discord Id</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='discordId' required placeholder='discordId' value={data.discordId} onChange={(event) => handleEditChange(event, 'discordId')} />
          </InputGroup>
          {errors.discordName && <p className={styles.error}>Please enter a valid Discord Id</p>}
        </div>
        <div className='mb-1'>
          <Label for='discordName'>* Discord Name</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='discordName' required placeholder='discordName' value={data.discordName} onChange={(event) => handleEditChange(event, 'discordName')} />
          </InputGroup>
          {errors.discordName && <p className={styles.error}>Please enter a valid Discord Name</p>}
        </div>
        {/* <div className='mb-1'>
          <Label for='email'>* Email</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='email' placeholder='email' required value={data.email} onChange={(event) => handleEditChange(event, 'email')} />
          </InputGroup>
          {errors.email && <p className={styles.error}>Please enter a valid Email</p>}
        </div> */}
        <div className='mb-1'>
          <Label for='password'>* Password</Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input id='password' placeholder='password' required value={data.password} onChange={(event) => handleEditChange(event, 'password')} />
          </InputGroup>
          {errors.password && <p className={styles.error}>Please enter a valid Password</p>}
        </div>

        {
          mode === 'MEW' && (
            <div className='mb-1'>
              <Label for='passconf'>* Confirm Password</Label>
              <InputGroup>
                <InputGroupText>
                  <User size={15} />
                </InputGroupText>
                <Input id='passconf' required placeholder='passconf' value={data.passconf} onChange={(event) => handleEditChange(event, 'passconf')} />
              </InputGroup>
            </div>
          )
        }

        <div className='mb-1'>
          <div className={styles.collection_icon}>
            <div className={styles.icon_header}>Avatar <span className='text-danger'>*</span></div>
            <div className={styles.icon_content}>
              <img src={imageSrc} />
              <input type='file' onChange={handleImageChange} />
            </div>
          </div>
          {errors.avatar && <p className={styles.error}>Upload your avatar.</p>}
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='role'>
            Role <span className='text-danger'>*</span>
          </Label>
          <Input type='select' name='role' value={data.role} onChange={(e) => handleEditChange(e, 'role')}>
            <option value={'admin'}>Admin</option>
            <option value={'subscriber'}>Subscriber</option>
          </Input>
        </div>

        {
          data.role === 'subscriber' && (
            <>
              <Label className='form-label' for='role'>
                Subscriber Permission
              </Label>

              <div className='mb-1 form-check'>
                <Input type='checkbox' id='hasWlRaffle' name='hasWlRaffle' checked={data.hasWlRaffle} value={data.hasWlRaffle} onChange={(e) => handleEditChange(e, 'hasWlRaffle')} />
                <Label className='form-check-label' for='hasWlRaffle'>
                  Whitelist Raffle
                </Label>
              </div>

              <div className='mb-1 form-check'>
                <Input type='checkbox' id='hasDaoVoting' name='hasDaoVoting' checked={data.hasDaoVoting} value={data.hasDaoVoting} onChange={(e) => handleEditChange(e, 'hasDaoVoting')} />
                <Label className='form-check-label' for='hasDaoVoting'>
                  Dao Voting
                </Label>
              </div>
            </>

          )
        }

        <Button className='mr-1' color='primary' onClick={handleSubmit} style={{ marginRight: '10px' }}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleClose} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
