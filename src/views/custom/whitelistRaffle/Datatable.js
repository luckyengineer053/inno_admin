// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
import axios from 'axios'

// ** Store & Actions
import { getData, addEvent, updateEvent, deleteEvent, getProjectNameByDiscordId } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Plus, Edit, MoreVertical, Trash, ChevronDown, ChevronUp } from 'react-feather'

// ** Reactstrap Imports
import {
  Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, Table
} from 'reactstrap'

import UploadIcon from '@src/assets/images/icons/upload.png'
import './index.scss'

// custom component
import EditWhitelistOpp from './edit/edit'

import { BACKEND_URL } from '../../../configs'

const Datatable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.wlRaffle)

  // ** States
  const [open, setOpen] = useState(false)

  const [mode, setMode] = useState(0) // 0: new 1: edit 2: view
  const [filter, setFilter] = useState({
    currentPage: 1,
    column: 'key',
    direction: 'asc',
    rowsPerPage: 7,
    searchValue: ''
  })

  const [imageSrc, setImageSrc] = useState(UploadIcon)
  const [imageFile, setImageFile] = useState('')
  const [hostedProjectName, setHostedProjectName] = useState()

  const [data, setData] = useState(
    {
      _id: "",
      projectName: '',
      hostedProjectId: '',
      submittedUser: '',
      wlSpots: 0,
      // totalEntries: 0,
      requirement: 0,
      description: '',
      detail: '',
      supply: 0,
      mintDate: '',
      mintPrice: 0,
      startDate: new Date(),
      endDate: new Date(),
      twitter: '',
      discord: '',
      website: '',
      image: '',
      serverId: '',
      roleId: '',
      role: '',
      timeStatus: 0,
      whitelistActive: 0
    }
  )

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [mintDate, setMintDate] = useState('')

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
        direction: filter.direction === "asc" ? "desc" : "asc"
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
        direction: "asc"
      }
      setFilter(filterData)
      dispatch(
        getData(filterData)
      )
    }
  }

  // Custom Functions

  // ** Function to handle Modal toggle

  const handleEditChange = (event, type) => {
    switch (type) {
      case "key":
      case "value":
      case "description":
      default:
        setData({
          ...data,
          [type]: event.target.value
        })
    }
  }

  const handleDateChange = (date, type) => {
    switch (type) {
      case 'startDate':
        setStartDate(date[0])
        break
      case 'endDate':
        setEndDate(date[0])
        break
      case 'mintDate':
        setMintDate(date[0])
        break
      default:
        break
    }
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    }
  }

  const handleNewModal = () => {
    setData({
      _id: "",
      projectName: '',
      hostedProject: '',
      submittedUser: '',
      wlSpots: 0,
      // totalEntries: 0,
      requirement: 0,
      description: '',
      detail: '',
      supply: 0,
      mintDate: '',
      mintPrice: 0,
      startDate: new Date(),
      endDate: new Date(),
      twitter: '',
      discord: '',
      website: '',
      image: '',
      serverId: '',
      roleId: '',
      role: '',
      timeStatus: 0,
      whitelistActive: 0
    })
    setMode(0)
    setImageSrc(UploadIcon)
    setImageFile('')
    setStartDate(new Date())
    setEndDate(new Date())
    setMintDate()
    setOpen(true)
  }

  const handleEditRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setMode(1)
    setImageSrc(BACKEND_URL + store.data[id].image)
    setStartDate(store.data[id].startDate)
    setEndDate(store.data[id].endDate)
    setMintDate(store.data[id].mintDate)
    setImageFile('1')
    setOpen(true)
  }

  const handleDeleteRow = (event, id) => {
    event.preventDefault()

    if (confirm("Do you want to delete this row?")) {
      dispatch(
        deleteEvent(store.data[id]._id)
      )
    }
  }

  const handleSubmitModal = async () => {
    const user = JSON.parse(localStorage.getItem('userData'))
    const hostedProject = await getProjectNameByDiscordId(user.discordId)
    const temp1 = data
    temp1.submittedUser = user.discordName
    temp1.hostedProjectId = hostedProject._id
    temp1.startDate = startDate
    temp1.endDate = endDate
    temp1.mintDate = mintDate

    const temp = JSON.stringify(temp1)
    const formData = new FormData()
    if (imageFile !== '') {
      formData.append('file', imageFile)
    }
    formData.append('data', temp)
    if (mode === 0) {
      dispatch(
        addEvent(formData)
      )

      setOpen(false)
    } else {
      dispatch(
        updateEvent(formData)
      )
      setOpen(false)
    }
  }

  const getLeftTime = (start, end) => {
    const a = new Date().getTime()
    const b = new Date(end).getTime()
    const c = (b - a) / 1000
    const hours = Math.floor(c / 3600)
    const mins = Math.floor((c % 3600) / 60)
    const sec = Math.floor(c % 60)

    return `${hours}:${mins}:${sec}`
  }

  useEffect(async () => {
    if (store.data.rows) {
      const res = await axios.get(`${BACKEND_URL}/api/project/getProjectName?projectId=${store.data.rows[0].hostedProjectId}`)
      if (res.data.success) {
        setHostedProjectName(res.data.data)
      }
    }
  }, [store.data])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Whitelist Raffles</CardTitle>
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
                <option value={7}>7</option>
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
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("projectName")} >
                Name {filter.column === "projectName" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th >Winners</th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("timeStatus")}>
                Status {filter.column === "timeStatus" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th>Time Left</th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("requirement")}>
                Requirement {filter.column === "requirement" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              store.data.map((element, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', alignItems: 'center' }}>
                      <img src={BACKEND_URL + element.image} alt={element.name} style={{ width: '40px', height: '40px', radius: '3px' }} />
                      <span className='align-middle font-weight-bold' style={{ wordBreak: 'break-all' }}>{element.projectName}</span>
                    </div>

                  </td>
                  <td> {element.wlSpots} </td>
                  <td> {element.timeStatus === 0 ? 'Not started' : element.timeStatus === 1 ? 'Ongoing' : 'Ended'} </td>
                  <td> {element.timeStatus === 1 ? getLeftTime(element.startDate, element.endDate) : element.timeStatus === 2 ? '00:00:00' : 'N/A'} </td>
                  <td> {element.requirement === 0 ? "Twitter" : "Discord"} Following </td>
                  <td>
                    <div className='action-buttons'>
                      <button onClick={(event) => handleEditRow(event, index)} style={{ background: '#FBAD27' }}>Edit</button>
                      <button onClick={(event) => handleDeleteRow(event, index)} style={{ background: '#555555', color: 'white' }}>Delete</button>
                    </div>
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

      <EditWhitelistOpp
        mode={mode}
        open={open}
        setOpen={setOpen}
        data={data}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        imageFile={imageFile}
        handleEditChange={handleEditChange}
        handleSubmitModal={handleSubmitModal}
        handleDateChange={handleDateChange}
        handleImageChange={handleImageChange}
        startDate={startDate}
        endDate={endDate}
        mintDate={mintDate}
        hostedProjectName={hostedProjectName}
      />
    </Fragment>
  )
}

export default memo(Datatable)
