import React from 'react';
import { base_url } from '../config.js';
import axios from 'axios';
import $ from 'jquery';

export default class ModalPembayaran extends React.Component {
  constructor() {
    super();
    this.state = {
      siswa: [],
      tagihan: [],
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

  chtag = (ev) => {
    let url = base_url + '/tagihan/' + ev.target.value;
    axios
      .get(url)
      .then((response) => {
        this.setState({ tagihan: response.data });
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
      <div className="modal fade" id="modal_pembayaran">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h4>Form Pembayaran</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.props.savePemb}>
                Nama Siswa
                {this.props.status === 'update' ? (
                  <div className="input-group">
                    <select
                      className="form-control"
                      onChange={this.props.chsis}
                      onClickCapture={(ev) => this.chtag(ev)}
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
                      onClick={(ev) => this.chtag(ev)}
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
                Tagihan
                <div className="input-group">
                  <select className="form-control" onChange={this.props.chtag}>
                    <option selected>{this.props.id_tagihan}</option>
                    {this.state.tagihan.map((item, index) => (
                      <option value={item.id_tagihan} key={index}>
                        {item.id_tagihan} ({item.bulan}/{item.tahun})
                      </option>
                    ))}
                  </select>
                </div>
                Bulan Bayar
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.bulan}
                  onChange={this.props.chbul}
                  required
                />
                Tahun Bayar
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
