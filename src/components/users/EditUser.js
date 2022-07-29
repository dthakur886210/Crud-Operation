import React, { useState, useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

const EditUser = () => {
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
    return (
        <div className='container'>
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
        </div>
    )
}

export default EditUser;