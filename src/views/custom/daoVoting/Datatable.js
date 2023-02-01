// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
import axios from 'axios'

// ** Store & Actions
import { getData, addEvent, updateEvent, deleteEvent } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { Plus, Edit, MoreVertical, Trash, ChevronDown, ChevronUp } from 'react-feather'

// ** Reactstrap Imports
import {
  Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, Table
} from 'reactstrap'
import { isUserLoggedIn } from '@utils'

import EditDaoVoting from './edit/editDaoVoting'
import DeletePage from './edit/delete'
import './edit/edit.scss'

import { BACKEND_URL } from '../../../configs'

const Datatable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.daoVotings)

  // ** States
  const [open, setOpen] = useState(false)
  // edit and view
  const [mode, setMode] = useState(0)
  // delete
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [filter, setFilter] = useState({
    currentPage: 1,
    column: 'key',
    direction: 'asc',
    rowsPerPage: 7,
    searchValue: ''
  })

  const [userData, setUserData] = useState(null)
  const [hostedProjectName, setHostedProjectName] = useState()

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const [data, setData] = useState(
    {
      _id: "",
      agenda: '',
      hostedProjectId: '',
      // submittedUser: '',
      options: [],
      startDate: new Date(),
      endDate: new Date()
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
  const handleEditChange = (event, type, index) => {
    switch (type) {
      case "options":
        {
          const temp = [...data.options]
          const temp1 = { ...temp[index], option: event.target.value }

          temp[index] = temp1

          setData({
            ...data,
            options: temp
          })
          break
        }
      case "startDate":
        setData({
          ...data,
          startDate: event[0]
        })
        break
      case "endDate":
        setData({
          ...data,
          endDate: event[0]
        })
        break
      default:
        setData({
          ...data,
          [type]: event.target.value
        })
    }
  }

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleDateChange = (date, type) => {
    switch (type) {
      case 'startDate':
        setStartDate(date[0])
        break
      case 'endDate':
        setEndDate(date[0])
        break
      default:
        break
    }
  }

  const handleNewModal = () => {
    setData({
      _id: "",
      agenda: '',
      hostedProjectId: '',
      submittedUser: userData.username,
      options: [
        {
          option: '',
          voteNumber: []
        },
        {
          option: '',
          voteNumber: []
        },
        {
          option: '',
          voteNumber: []
        },
        {
          option: '',
          voteNumber: []
        }
      ],
      startDate: new Date(),
      endDate: new Date()
    })
    setStartDate(new Date())
    setEndDate(new Date())
    setMode(2)
    setOpen(true)
  }

  const handleEditRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setMode(0)
    setStartDate(store.data[id].startDate)
    setEndDate(store.data[id].endDate)
    setOpen(true)
    // handleModal()
  }

  const handleViewRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setMode(1)
    setOpen(true)
    // handleModal()
  }

  const handleDeleteRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setDeleteOpen(true)
  }

  const deleteRow = (id) => {
    dispatch(deleteEvent(id))
  }

  const handleSubmitModal = () => {
    if (mode === 2) {
      const temp = {
        agenda: data.agenda,
        option0: data.options[0].option,
        option1: data.options[1].option,
        option2: data.options[2].option,
        option3: data.options[3].option,
        startDate,
        endDate,
        submittedUser: userData.discordName
      }

      dispatch(
        addEvent(JSON.stringify(temp))
      )
      setOpen(false)
    } else {
      const temp = data
      temp.startDate = startDate
      temp.endDate = endDate

      dispatch(
        updateEvent((JSON.stringify(temp)))
      )
      setOpen(false)
    }
  }

  const getStatus = (start, end) => {
    const currentTime = new Date().getTime()
    if (currentTime >= new Date(start).getTime() && currentTime < new Date(end).getTime()) {
      return 'Ongoing'
    } else if (currentTime > new Date(end).getTime()) {
      return 'Ended'
    } else {
      return 'Not Started'
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
    if (store.data.length > 0) {
      const res = await axios.get(`${BACKEND_URL}/api/project/getProjectName?projectId=${store.data[0].hostedProjectId}`)
      if (res.data.success) {
        setHostedProjectName(res.data.data)
      }
    }
  }, [store.data])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Dao Voting</CardTitle>
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
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("agenda")} >
                Agenda {filter.column === "agenda" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th style={{ whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => handleSort("submittedUser")}>
                Submitted by {filter.column === "submittedUser" ? (filter.direction === "desc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />) : ""}
              </th>
              <th>Status</th>
              <th>Time Left</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              store.data.map((element, index) => (
                <tr key={index}>
                  <td>
                    <span className='align-middle font-weight-bold'>{element.agenda}</span>
                  </td>
                  <td> {element.submittedUser} </td>
                  <td> {getStatus(element.startDate, element.endDate)} </td>
                  <td> {getStatus(element.startDate, element.endDate) === 'Ongoing' ? getLeftTime(element.startDate, element.endDate) : getStatus(element.startDate, element.endDate) === 'Ended' ? '00:00:00' : 'N/A'} </td>
                  <td>
                    <div className='action-buttons'>
                      <button style={{ background: '#FBAD27' }} onClick={(event) => handleEditRow(event, index)}>Edit</button>
                      <button style={{ background: '#555555', color: 'white' }} onClick={(event) => handleDeleteRow(event, index)}>Delete</button>
                      <button style={{ background: '#DDDDDD' }} onClick={(event) => handleViewRow(event, index)}>View</button>
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

      <EditDaoVoting
        mode={mode}
        open={open}
        setOpen={setOpen}
        data={data}
        handleEditChange={handleEditChange}
        handleSubmitModal={handleSubmitModal}
        handleDateChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        hostedProjectName={hostedProjectName}
      />

      <DeletePage
        data={data}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        deleteRow={deleteRow}
      />
    </Fragment>
  )
}

export default memo(Datatable)
