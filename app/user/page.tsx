import React from 'react';

const user = 'eric';

let messesage = "you are not logged in bugger!";
if (user) {
  messesage = "you are logged in! horrary!"
}

const UserPage: React.FC = () => {
  return (
    <div>
      <h1>Timeventory</h1>
      <p>Welcome to the</p>
      <p className = 'orange'>USER PAGE</p>
      {
        user?(
          <p>welcome {user}!</p>
        ):(
          <p>welcome nobody!</p>
        )
      }
      <p className = 'orange'>{messesage}</p>
    </div>
  );
};

export default UserPage;