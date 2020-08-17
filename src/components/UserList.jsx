import React from "react";
import UserItem from "./UserItem";

function UserList(props) {
    const { deleteUser, users } = props;

    return (
        <div>
            <h2>Lista utilizatorilor:</h2>
            {users.map((user, index) => {
                return (
                    <UserItem
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        isGoldClient={user.isGoldClient}
                        salary={user.salary}
                        photo={user.photo}
                        key={index}
                        deleteUser={deleteUser}
                    />
                );
            })}
        </div>
    );
}

export default UserList;
