import React from 'react';
import { base_url } from '../config.js';
import axios from 'axios';

export default class ModalSiswa extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      kelas: [],
      spp: [],
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

  getKelas = () => {
    let url = base_url + '/kelas';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ kelas: response.data });
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

  getSpp = () => {
    let url = base_url + '/spp';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ spp: response.data });
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
    this.getKelas();
    this.getSpp();
  }
  render() {
    return (
      <div className="modal fade" id="modal_siswa">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h4>Form Siswa</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.props.saveSiswa}>
                NISN
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.nisn}
                  onChange={this.props.chnisn}
                  required
                />
                NIS
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.nis}
                  onChange={this.props.chnis}
                  required
                />
                Nama
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.nama}
                  onChange={this.props.chnama}
                  required
                />
                Id Kelas
                <div className="input-group">
                  <select className="form-control" onChange={this.props.chidk}>
                    <option selected>{this.props.idk}</option>
                    {this.state.kelas.map((item, index) => (
                      <option value={item.id_kelas}>
                        {item.id_kelas} - {item.nama_kelas} -{' '}
                        {item.kompetensi_keahlian}
                      </option>
                    ))}
                  </select>
                </div>
                Alamat
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.alamat}
                  onChange={this.props.chalamat}
                  required
                />
                No Telepon
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.notelp}
                  onChange={this.props.chnotelp}
                  required
                />
                Username
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.username}
                  onChange={this.props.chusern}
                  required
                />
                Password
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.password}
                  onChange={this.props.chpass}
                  required
                />
                Id SPP
                <div className="input-group">
                  <select className="form-control" onChange={this.props.chids}>
                    <option selected>{this.props.ids}</option>
                    {this.state.spp.map((item, index) => (
                      <option value={item.id_spp}>
                        {item.id_spp} - {item.nominal} - {item.tahun}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-block btn-dark mt-3">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
