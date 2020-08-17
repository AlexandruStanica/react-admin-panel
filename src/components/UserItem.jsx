import React from "react";

function UserItem(props) {
    const { deleteUser, id, name, email, isGoldClient, salary, photo } = props;

    return (
        <div>
            <h3>{name}</h3>
            <p>{email}</p>
            {isGoldClient ? <h3>Client GOLD</h3> : null}
            <p>{salary}</p>
            <img src={photo} alt="" />
            <div className="center">
                <button onClick={() => deleteUser(id)} className="button-small">
                    Sterge
                </button>
            </div>
        </div>
    );
}

export default UserItem;
