import React from 'react';

function Navbar({ brandName, navItems }) {
  return (
    <nav className="navbar navbar-light navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">{brandName}</a>
          <div className="order-last">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0" id="pages">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <a className="nav-link" href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
