import React from 'react';

const navBar: React.FC = () => {
  return (
    <div>
        <h1>NAV BAR</h1>
        <nav>
            <a href = "/">Home</a>
            <a href = "/user">User</a>
            <a href = "/error">404</a>
            <a href = "/login">login</a>
        </nav>
    </div>
  );
};

export default navBar;