import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar2 extends React.Component {
  constructor() {
    super();
    this.state = {
      admin: [],
    };
  }

  getAdmin = () => {
    let temp = JSON.parse(localStorage.getItem('admin'));
    this.setState({
      admin: temp,
    });
  };

  componentDidMount() {
    this.getAdmin();
  }
  render() {
    return (
      <div className="nav2">
        <div className="navbar2">
          <div className="searching">
            <input placeholder="Search..." disabled />
          </div>
          <div className="user">
            <img
              src="/image/avatar.svg"
              className="rounded-circle shadow-sm"
              width="40"
              height="40"
            />
            <h6>{this.state.admin.nama_petugas}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar2;
