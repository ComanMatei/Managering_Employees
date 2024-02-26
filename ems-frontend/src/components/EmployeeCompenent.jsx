import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeCompenent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const {id} = useParams();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const navigator = useNavigate();

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  useEffect(() => {
    if(id){
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error =>{
        console.error(error);
      })
    }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if(valideteForm()){

      const employee = {firstName, lastName, email}
      console.log(employee)

      if(id){
        updateEmployee(id, employee).then((response) =>{
          console.error(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      }
      else{
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees')
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  function valideteForm(){
    let valid = true;

    const errorsCopy = {... errors} 

    if(firstName.trim()){
      errorsCopy.firstName = '';
    }
    else{
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if(lastName.trim()){
      errorsCopy.lastName = '';
    }
    else{
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    if(email.trim()){
      errorsCopy.email = '';
    }
    else{
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle(){
    if(id){
      return <h2 className='text-center'>Update Employee</h2>
    }
    else{
      return <h2 className='text-center'>Add Employee</h2>
    }
  }

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>

              <div className='form-group mb-2'>
                <label className='form-laber'>First Name:</label>
                <input 
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                  onChange={handleFirstName}
                >
                </input>
                {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-laber'>Last Name:</label>
                <input 
                  type='text'
                  placeholder='Enter Employee Last Name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                  onChange={handleLastName}
                >
                </input>
                {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-laber'>Email:</label>
                <input 
                  type='text'
                  placeholder='Enter Employee Email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid': ''}`}
                  onChange={handleEmail}
                >
                </input>
                {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
              </div>

                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCompenent