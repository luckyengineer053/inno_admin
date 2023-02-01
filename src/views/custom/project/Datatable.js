// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Store & Actions
import { getData, addEvent, updateEvent, deleteEvent, getOneData } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Plus, Edit, MoreVertical, Trash, ChevronDown, ChevronUp, Upload, FileText } from 'react-feather'

// ** Reactstrap Imports
import {
  Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, Table
} from 'reactstrap'

// ** router
import { useNavigate } from 'react-router-dom'

// custom
import AddNewModal from './AddNewModal'
import UploadIcon from '@src/assets/images/icons/upload.png'

import { BACKEND_URL } from '@src/configs'

const Datatable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const store = useSelector(state => state.project)

  // ** States
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("NEW")
  const [filter, setFilter] = useState({
    currentPage: 1,
    column: 'name',
    direction: 'asc',
    rowsPerPage: 7,
    searchValue: ''
  })
  const [imageSrc, setImageSrc] = useState(UploadIcon)
  const [imageFile, setImageFile] = useState('')
  const [data, setData] = useState(
    {
      _id: "",
      name: "",
      subscriber: "",
      serverId: '',
      whitelistRoleIDs: [],
      walletSubmission: false,
      subscribeStatus: 0, // 0: not subscribed 1: subscribed
      description: "",
      status: 0, // 0: coming  1: minted
      mintDate: '',
      totalSupply: 0,
      mintPrice: 0,
      billingCycle: 0,
      mintAddress: "",
      wlManagement: false,
      daoHub: false,
      hashlist: "",
      creatorAddress: [],
      image: "",
      twitter: "",
      discord: "",
      website: "",
      receiverAddress: '',
      tokenAddress: '',
      tokenAmount: 0,
      tokenSymbol: '',
      whitelistActive: 0
    }
  )

  const count = Math.ceil(store.total / filter.rowsPerPage)

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData(filter)
    )
  }, [dispatch])

  // ** Function to handle filter
  const handleFilter = e => {
    const filterData = {
      ...filter,
      searchValue: e.target.value,
      currentPage: 1
    }
    setFilter(filterData)

    dispatch(
      getData(filterData)
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    const filterData = {
      ...filter,
      currentPage: page.selected + 1
    }
    setFilter(filterData)
    dispatch(
      getData(filterData)
    )
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    const filterData = {
      ...filter,
      currentPage: 1,
      rowsPerPage: parseInt(e.target.value)

    }
    setFilter(filterData)
    dispatch(
      getData(filterData)
    )
  }

  const handleSort = (column) => {
    if (filter.column === column) {
      const filterData = {
        ...filter,
        currentPage: 1,
        column,
        direction: filter.direction === "ASC" ? "DESC" : "ASC"
      }
      setFilter(filterData)
      dispatch(
        getData(filterData)
      )
    } else {
      const filterData = {
        ...filter,
        currentPage: 1,
        column,
        direction: "ASC"
      }
      setFilter(filterData)
      dispatch(
        getData(filterData)
      )
    }
  }

  // Custom Functions

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  const handleEditChange = (event) => {
    console.log('change', event.target.name, event.target.value)
    switch (event.target.name) {
      // Check Box
      case 'wlManagement':
        setData({
          ...data,
          [event.target.name]: event.target.checked
        })
        break
      case 'daoHub':
        setData({
          ...data,
          [event.target.name]: event.target.checked
        })
        break
      case 'walletSubmission':
        setData({
          ...data,
          [event.target.name]: event.target.checked
        })
        break
      // Input Box or SelectBox
      default:
        setData({
          ...data,
          [event.target.name]: event.target.value
        })
    }
  }

  const handleNewModal = () => {
    setData({
      _id: "",
      name: "",
      subscriber: "",
      serverId: '',
      whitelistRoleIDs: [],
      walletSubmission: false,
      subscribeStatus: 0, // 0: not subscribed 1: subscribed
      description: "",
      status: 0,
      mintDate: '',
      totalSupply: 0,
      mintPrice: 0,
      billingCycle: 0,
      mintAddress: "",
      wlManagement: false,
      daoHub: false,
      hashlist: "",
      creatorAddress: [],
      image: "",
      twitter: "",
      discord: "",
      website: "",
      receiverAddress: '',
      tokenAddress: '',
      tokenAmount: 0,
      tokenSymbol: '',
      whitelistActive: 0
    })
    setMode("NEW")
    setImageSrc(UploadIcon)
    setImageFile('')
    handleModal()
  }

  const handleEditRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setMode("EDIT")
    setImageSrc(BACKEND_URL + store.data[id].image)
    setImageFile('1')

    handleModal()
  }

  const handleViewRow = (event, id) => {
    event.preventDefault()
    dispatch(getOneData(id))

    navigate('/app/project_detail')
  }

  const handleDeleteRow = (event, id) => {
    event.preventDefault()

    if (confirm("Do you want to delete this row?")) {
      dispatch(
        deleteEvent(store.data[id]._id)
      )
    }
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    }
  }

  const handleAddressChange = (e, index) => {
    if (e === 'add') {
      const newCreators = [...data.creatorAddress]
      newCreators.push(index)

      setData({
        ...data,
        creatorAddress: newCreators
      })
      return
    }
    if (e === 'delete') {
      const newCreators = data.creatorAddress.filter((creator, key) => key !== index)

      setData({
        ...data,
        creatorAddress: newCreators
      })
      return
    }
    if (e.target.value) {
      const newCreators = [...data.creatorAddress]
      newCreators[index] = e.target.value

      setData({
        ...data,
        creatorAddress: newCreators
      })
    }
  }
  const handleRolesChange = (e, index) => {
    if (e === 'add') {
      const newRoles = [...data.whitelistRoleIDs]
      newRoles.push(index)

      setData({
        ...data,
        whitelistRoleIDs: newRoles
      })
      return
    }
    if (e === 'delete') {
      const newRoles = data.whitelistRoleIDs.filter((role, key) => key !== index)

      setData({
        ...data,
        whitelistRoleIDs: newRoles
      })
      return
    }
    if (e.target.value) {
      const newRoles = [...data.whitelistRoleIDs]
      newRoles[index] = e.target.value

      setData({
        ...data,
        whitelistRoleIDs: newRoles
      })
    }
  }

  const handleDateChange = (date) => {
    const d = new Date(date)
    console.log('date: ', d.toISOString())
    setData({
      ...data,
      mintDate: date[0]
    })
  }

  const handleSubmitModal = () => {
    const formData = new FormData()
    if (imageFile !== '') {
      formData.append('file', imageFile)
    }
    formData.append('data', JSON.stringify(data))

    if (mode === "NEW") {
      dispatch(
        addEvent(formData)
      )
    } else {
      dispatch(
        updateEvent(formData)
      )
    }
    handleModal()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Projects</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ml-2' color='primary' onClick={handleNewModal}>
              <Plus size={15} />
              <span className='align-middle ml-50'>Add</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={filter.rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                {/* <option value={7}>7</option> */}
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select'>entries</Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={filter.searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("name")} >
                Name {filter.column === "name" ? (filter.direction === "DESC" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("subscriber")} >
                Contact {filter.column === "subscriber" ? (filter.direction === "DESC" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("status")} >
                Status {filter.column === "status" ? (filter.direction === "DESC" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("billingCycle")} >
                Subscription {filter.column === "billingCycle" ? (filter.direction === "DESC" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap" }}>
                {/* Next Bill  {filter.column === "name" ? (filter.direction === "DESC" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""} */}
                Next Bill
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              store.data.map((element, index) => (
                <tr key={index}>
                  <td> {element.name} </td>
                  <td> {element.subscriber} </td>
                  <td> {element.status === 0 ? 'Upcoming' : 'Minted'} </td>
                  <td> {element.billingCycle === 0 ? 'Monthly' : 'Yearly'} </td>
                  <td> {new Date(element.mintDate).toDateString()} </td>
                  <td>
                    <FileText style={{ color: '#333333', cursor: 'pointer', marginRight: '10px' }} onClick={(event) => handleViewRow(event, element._id)} className='mr-100' size={15} />
                    <Edit style={{ color: '#333333', cursor: 'pointer', marginRight: '10px' }} onClick={(event) => handleEditRow(event, index)} className='mr-100' size={15} />
                    <Trash style={{ color: '#D75454', cursor: 'pointer' }} onClick={(event) => handleDeleteRow(event, index)} className='ml-50' size={15} />
                  </td>
                </tr>
              )
              )
            }
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          breakLabel='...'
          pageCount={count || 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName='active'
          forcePage={filter.currentPage !== 0 ? filter.currentPage - 1 : 0}
          onPageChange={page => handlePagination(page)}
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          containerClassName={
            'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
          }
        />
      </Card>
      <AddNewModal
        open={modal}
        handleModal={handleModal}
        mode={mode}
        data={data}
        imageSrc={imageSrc}
        imageFile={imageFile}
        handleImageChange={handleImageChange}
        handleEditChange={handleEditChange}
        handleDateChange={handleDateChange}
        handleSubmitModal={handleSubmitModal}
        handleAddressChange={handleAddressChange}
        handleRolesChange={handleRolesChange}
      />
    </Fragment>
  )
}

export default memo(Datatable)
