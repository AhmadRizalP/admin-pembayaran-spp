import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      status: false,
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

  Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location = '/login';
  };

  render() {
    return (
      <div className="sidebar">
        <div className="vertical-nav" id="sidebar">
          <div className="py-4 px-3">
            <h3 className="text-white text-center">PEMBAYARAN</h3>
            <h3 className="text-white text-center">SPP</h3>
          </div>
          <div className="new"></div>
          <ul className="nav flex-column mb-0 ml-4 ">
            <li className="nav-item ">
              <Link to="/" className="nav-link ">
                <i className="fas fa-th-large fa-fw mr-4"></i>Dashboard
              </Link>
            </li>
          </ul>
          <div className="new"></div>
          <ul className="nav flex-column mb-0 ml-4 ">
            <li className="nav-item">
              <Link to="/siswa" className="nav-link ">
                <i className="fas fa-user-graduate fa-fw mr-4 "></i>Siswa -
                Kelas - SPP
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link ">
                <i className="fas fa-users fa-fw mr-4"></i>Admin / Petugas
              </Link>
            </li>
          </ul>
          <div className="new"></div>
          <ul className="nav flex-column mb-0 ml-4 ">
            <li className="nav-item ">
              <Link to="/tagihan" className="nav-link ">
                <i className="fas fa-bookmark fa-fw mr-4"></i>Tagihan
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/pembayaran" className="nav-link ">
                <i className="fas fa-money-check fa-fw mr-4"></i>Pembayaran
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to="/login"
                className="nav-link"
                onClick={() => this.Logout()}
              >
                <i className="fas fa-outdent fa-fw mr-4"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
