import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isStarFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isStarFilterActive} = this.state
    this.setState({isStarFilterActive: !isStarFilterActive})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    // console.log(formatDate)
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  gettingFilteredList = () => {
    const {appointmentsList, isStarFilterActive} = this.state
    if (isStarFilterActive) {
      return appointmentsList.filter(eachApp => eachApp.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isStarFilterActive} = this.state
    const filteredClassName = isStarFilterActive
      ? 'filter-filled'
      : 'filter-empty'
    const filteredList = this.gettingFilteredList()
    // console.log(dateInput)

    return (
      <div className="main-container">
        <div className="second-container">
          <form
            className="adding-appointments-container"
            onSubmit={this.onAddAppointment}
          >
            <div className="inputs-container">
              <h1 className="heading">Add Appointment</h1>
              <div className="each-input-cont">
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input-style"
                  id="title"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                />
              </div>
              <div className="each-input-cont">
                <label className="label" htmlFor="dateInputValue">
                  DATE
                </label>
                <input
                  type="date"
                  className="input-style"
                  id="dateInputValue"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
              </div>

              <button className="add-btn" type="submit">
                Add
              </button>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </form>
          <hr className="line" />

          <div className="aptmnt-header-container">
            <h1 className="heading">Appointments</h1>
            <button
              className={`starred-btn ${filteredClassName}`}
              type="button"
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>

          <ul className="aptmnt-list">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
