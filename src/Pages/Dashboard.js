import React, { Fragment } from 'react';
import Navbar from '../Component/Navbar';
import Navbar2 from '../Component/Navbar2';
import axios from 'axios';
import { base_url } from '../config.js';
import Card from '../Component/Card';
import './One.css';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      adminName: '',
      siswaCount: 0,
      adminCount: 0,
      tagihanCount: 0,
      pembayaranCount: 0,
    };
    if (localStorage.getItem('token')) {
      this.state.token = localStorage.getItem('token');
    } else {
      window.location = '/login';
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getSiswa = () => {
    let url = base_url + '/siswa';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ siswaCount: response.data.length });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            this.props.history.push('/login');
          }
        } else {
          console.log(error);
        }
      });
  };

  getAdmin = () => {
    let url = base_url + '/petugas';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ adminCount: response.data.length });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            this.props.history.push('/login');
          }
        } else {
          console.log(error);
        }
      });
  };

  getTagihan = () => {
    let url = base_url + '/tagihan';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ tagihanCount: response.data.length });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            this.props.history.push('/login');
          }
        } else {
          console.log(error);
        }
      });
  };

  getPemabayarn = () => {
    let url = base_url + '/pembayaran';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ pembayaranCount: response.data.length });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message);
            this.props.history.push('/login');
          }
        } else {
          console.log(error);
        }
      });
  };

  componentDidMount() {
    this.getAdmin();
    this.getPemabayarn();
    this.getSiswa();
    this.getTagihan();
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <Navbar2 />
        <div className="page-content">
          <div className="p-4">
            <h3 className="font-weight-light">Dashboard</h3>
            <div className="mt-3">
              <div className="dash">
                <Card judul="Siswa Count" nilai={this.state.siswaCount} />
                <Card judul="Admin Count" nilai={this.state.adminCount} />
              </div>
              <div className="dash">
                <Card judul="Tagihan Count" nilai={this.state.tagihanCount} />
              </div>
              <div className="dash">
                <Card
                  judul="Pembayaran Count"
                  nilai={this.state.pembayaranCount}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
