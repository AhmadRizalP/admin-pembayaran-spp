import React, { Fragment } from 'react';
import Navbar from '../Component/Navbar';
import Navbar2 from '../Component/Navbar2';
import { base_url } from '../config.js';
import axios from 'axios';
import $ from 'jquery';

export default class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      petugas: [],
      petugas1: [],
      username: '',
      id_petugas: '',
      password: '',
      nama_petugas: '',
      level: '',
      action: '',
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

  Add = () => {
    $('#modal_admin').modal('show');
    this.setState({
      action: 'insert',
      username: '',
      password: '',
      nama_petugas: '',
      level: 'Pilih Level',
    });
  };

  Edit = (item) => {
    $('#modal_admin').modal('show');
    this.setState({
      action: 'update',
      username: item.username,
      id_petugas: item.id_petugas,
      password: '',
      nama_petugas: item.nama_petugas,
      level: item.level,
    });
  };

  Drop = (item) => {
    if (window.confirm('are you sure will delete this item?')) {
      let url = base_url + '/petugas/' + item.id_petugas;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getAdmin();
        })
        .catch((error) => console.log(error));
    }
  };

  saveAdmin = (event) => {
    event.preventDefault();
    $('#modal_admin').modal('hide');
    let sendData = {
      id_petugas: this.state.id_petugas,
      username: this.state.username,
      password: this.state.password,
      nama_petugas: this.state.nama_petugas,
      level: this.state.level,
    };
    let url = base_url + '/petugas';
    if (this.state.action === 'insert') {
      axios
        .post(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getAdmin();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === 'update') {
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getAdmin();
        })
        .catch((error) => console.log(error));
    }
  };

  getPetugas = () => {
    let temp = JSON.parse(localStorage.getItem('admin'));
    this.setState({
      petugas1: temp,
    });
  };

  getAdmin = () => {
    let url = base_url + '/petugas';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ petugas: response.data });
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
    this.getPetugas();
  }
  render() {
    return (
      <Fragment>
        <Navbar />
        <Navbar2 />
        <div className="page-content">
          <div className="p-4">
            <h3 className="font-weight-light">
              Petugas
              {this.state.petugas1.level === 'admin' ? (
                <button
                  className="btn btn-outline-info btn-sm ml-4"
                  onClick={() => this.Add()}
                >
                  Tambah data
                </button>
              ) : (
                <button className="btn btn-danger btn-sm ml-4" disabled>
                  Tambah data (Only Admin)
                </button>
              )}
            </h3>
            <div className="mt-3 p-2">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.petugas.map((item, index) => (
                    <tr key={index}>
                      <th className="text-center align-items-center align-middle">
                        {index + 1}
                      </th>
                      <td className="align-middle">{item.nama_petugas}</td>
                      <td className="align-middle">{item.username}</td>
                      <td className="align-middle">{item.level}</td>
                      <td className="ble">
                        {this.state.petugas1.level === 'admin' ? (
                          <div>
                            <button
                              className="btn btn-dark btn-sm btn-block"
                              onClick={() => this.Edit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-dark btn-sm btn-block"
                              onClick={() => this.Drop(item)}
                            >
                              Delete
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="btn btn-dark btn-sm btn-block"
                              disabled
                            >
                              Edit (Admin)
                            </button>
                            <button
                              className="btn btn-dark btn-sm btn-block"
                              disabled
                            >
                              Delete (Admin)
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal fade" id="modal_admin">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-dark text-white">
                    <h4>Form Petugas</h4>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(ev) => this.saveAdmin(ev)}>
                      Nama
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={this.state.nama_petugas}
                        onChange={(ev) =>
                          this.setState({ nama_petugas: ev.target.value })
                        }
                        required
                      />
                      Username
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={this.state.username}
                        onChange={(ev) =>
                          this.setState({ username: ev.target.value })
                        }
                        required
                      />
                      Password
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={this.state.password}
                        onChange={(ev) =>
                          this.setState({ password: ev.target.value })
                        }
                        placeholder="Masukan Password!"
                        required
                      />
                      Level
                      <select
                        className="form-control"
                        onChange={(ev) =>
                          this.setState({ level: ev.target.value })
                        }
                      >
                        <option>{this.state.level}</option>
                        <option value="admin">Admin</option>
                        <option value="petugas">Petugas</option>
                      </select>
                      <button
                        type="submit"
                        className="btn btn-block btn-dark mt-3"
                      >
                        Simpan
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
