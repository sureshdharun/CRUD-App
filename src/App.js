import { useState } from 'react';
import './App.css';
import {v4 as uuid} from 'uuid';
function App() {

  const [users,setUsers] = useState([]);

  const [buttonState , setButtonState] = useState("add")
  const [userInfo,setUserInfo] = useState({
    id:uuid(),
    name:"",
    age:"",
    email:"",
    phone:"",
  });

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setUserInfo((currInfo)=>{
      return{
        ...currInfo,[name]:value,
      };
    });
  }

  const addData = ()=>{
    setUsers((currUsers)=>
      [...currUsers,userInfo]
    );
    setUserInfo({
      id:uuid(),
      name:"",
      age:"",
      email:"",
      phone:"",
    });
  }
  console.log(users);
  
  const deleteData = (id)=>{
    setUsers((currUsers)=>{
      return currUsers.filter((user)=>{
        return user.id!==id;
      })
    })
  }

  const startEditing = (user)=>{
    setUserInfo(user);
    setButtonState("edit")
  }

  const updateData = () => {
    setUsers((currUsers) => {
      return currUsers.map((user)=>{
        if(user.id === userInfo.id){
          return userInfo;
        }
        return user;
      })
    })
  }

  return (
    <div className='container'>
      <div className="form">
      <input type="text" placeholder='Enter your name' name='name' value={userInfo.name} onChange={handleChange}/><br />
      <input type="number" placeholder='Enter your age' name='age' onChange={handleChange} value={userInfo.age} /><br />
      <input type="email" placeholder='Enter your email' name='email' onChange={handleChange} value={userInfo.email}/><br />
      <input type="number" placeholder='Enter your number' name='phone' onChange={handleChange} value={userInfo.phone}/><br />
      
      {buttonState=== "add" ? (<button onClick={addData}>Add</button>) : (<button onClick={updateData}>Update</button>)}
      </div>

      <div className="dataTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index)=>{
              return(
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={()=> startEditing(user)}>Edit</button>
                  <button onClick={()=> deleteData(user.id)}>Delete</button>
                </td>
              </tr>)})}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default App;
