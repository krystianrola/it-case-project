import axios from "axios";
import React, { useEffect, useState } from "react";

interface IUser {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    email: string,
    languageUse: string,
    hasAssingedSeat: boolean
}

interface props{
    handleChangeUser : React.ChangeEventHandler<HTMLSelectElement>
}

const Users = ({handleChangeUser} : props) => {
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        let data : IUser[]
        axios.get("https://reservation-api.azurewebsites.net/api/user/get").then((res) => {
        data = res.data
        setUsers(data);
        console.log(data)
        console.log(users)
    });
    },[]);

    return (
        <div>
          <p>Users:</p>
          <select name="Users" id="" onChange={handleChangeUser}>
              {users.map((user : IUser) => {
                console.log(user)
                return (
                  <option value={user.id} key={user.id}>
                    {user.userName} : {user.id}
                  </option>
                );
              })}
            </select>
        </div>
      );
}

export default Users;