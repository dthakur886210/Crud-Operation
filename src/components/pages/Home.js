import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams} from 'react-router-dom'

const Home = () => {
  const {id}  = useParams();
    let history = useNavigate()
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        website: ""
    });
    const onSubmit = e  => {
        e.preventDefault();
         axios.put(`http://localhost:3003/users/${id}`, user);
       history("/");
    }
    const {name, username, email, phone, website} = user;
    const onInputChange = e => {
   setUser ({...user,[e.target.name] : e.target.value })
    }

    const loadUser = async () =>{
        const result = await axios.get(`http://localhost:3003/users/${id}`);
        setUser(result.data)
    }
    useEffect(()=> {
        loadUser();
    },[])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const result =await axios.get("http://localhost:3003/users")
    setUsers(result.data.reverse());
  }
  const deleteUser = async id =>{
    const result = await axios.delete (`http://localhost:3003/users/${id}`);
    loadUsers();
  }
  return (<>

    <div className='container'>
      <div className='py-4'>
        <h1>Home Page</h1>
        <table className="table border shadow">
          <thead className="thead-dark table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           {
            users.map((user, index) => (
              <tr>
              <th scope='row'>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
             
                <Link to={`/user/${user.id}`} class='btn btn-primary me-2' >View</Link>
                <button onClick={handleShow} class='btn btn-outline-primary me-2'>Edit</button>
                <Link to=" " class='btn btn-danger me-2'  onClick={()=> deleteUser(user.id)}>Delete</Link>
                
              </td>
              </tr>
             
              
           ))
            }
          </tbody>
        </table>
      </div>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className='container'>
            <div className='w-75 mx-auto shadow p-5'>
                <h2 className='text-center mb-4'> Edit a User</h2>
                <form onSubmit={ e => onSubmit(e)}>
                    <div className='form-group'>
                        <input type="text" className='form-control-lg' placeholder='Enter Your Name' name='name' value={name} onChange={e => onInputChange(e)} />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control-lg' placeholder='Enter Your Username' name='username' value={username} onChange={e => onInputChange(e)} />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control-lg' placeholder='Enter Your E-mail Address' name='email' value={email} onChange={e => onInputChange(e)} />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control-lg' placeholder='Enter Your Phone Number' name='phone' value={phone} onChange={e => onInputChange(e)} />
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control-lg' placeholder="Enter Your Website Name" name="website" value={website} onChange={e => onInputChange(e)} />
                    </div>

                    <button className='btn btn-warning btn-block'>Update User</button>
                </form>
            </div>
        </div></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home;