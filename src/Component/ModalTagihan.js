import React from 'react';
import { base_url } from '../config.js';
import axios from 'axios';

export default class ModalTagihan extends React.Component {
  constructor() {
    super();
    this.state = {
      siswa: [],
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
        this.setState({ siswa: response.data });
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
    this.getSiswa();
  }
  render() {
    return (
      <div className="modal fade" id="modal_tagihan">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h4>Form Tagihan</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.props.saveTag}>
                Nama Siswa
                {this.props.status === 'update' ? (
                  <div className="input-group">
                    <select
                      className="form-control"
                      onChange={this.props.chsis}
                      disabled
                    >
                      <option selected>{this.props.nisn}</option>
                      {this.state.siswa.map((item, index) => (
                        <option value={item.nisn} key={index}>
                          {item.nama} - {item.nisn}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="input-group">
                    <select
                      className="form-control"
                      onChange={this.props.chsis}
                    >
                      <option selected>{this.props.nisn}</option>
                      {this.state.siswa.map((item, index) => (
                        <option value={item.nisn} key={index}>
                          {item.nama} - {item.nisn}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                Bulan
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.bulan}
                  onChange={this.props.chbul}
                  required
                />
                Tahun
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.tahun}
                  onChange={this.props.chtah}
                  required
                />
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
