import React, { Fragment } from 'react';
import Navbar from '../Component/Navbar';
import Navbar2 from '../Component/Navbar2';
import axios from 'axios';
import { base_url } from '../config.js';
import $ from 'jquery';
import ModalPembayaran from '../Component/ModalPembayaran';

export default class Pembayaran extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      pembayaran: [],
      petugas: [],
      id_pembayaran: '',
      nisn: '',
      id_tagihan: '',
      bulan_bayar: '',
      tahun_bayar: '',
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
    $('#modal_pembayaran').modal('show');
    this.setState({
      action: 'insert',
      nisn: 'Pilih Siswa',
      bulan_bayar: '',
      tahun_bayar: '',
      id_tagihan: 'Pilih Siswa Dahulu',
    });
  };

  Edit = (item) => {
    $('#modal_pembayaran').modal('show');
    this.setState({
      action: 'update',
      nisn: item.nisn,
      bulan_bayar: item.bulan_bayar,
      id_pembayaran: item.id_pembayaran,
      tahun_bayar: item.tahun_bayar,
      id_tagihan: item.id_tagihan,
    });
  };
  Confirm = (item) => {
    if (window.confirm('are you sure will Confirm this item?')) {
      let sendData = {
        id_petugas: this.state.petugas.id_petugas,
      };
      let url = base_url + '/pembayaran/konfirmasi/' + item.id_pembayaran;
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getPembayaran();
        })
        .catch((error) => console.log(error));
    }
  };

  Drop = (item) => {
    if (window.confirm('are you sure will Delete this item?')) {
      let url = base_url + '/pembayaran/' + item.id_pembayaran;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getPembayaran();
        })
        .catch((error) => console.log(error));
    }
  };

  savePemb = (event) => {
    event.preventDefault();
    $('#modal_pembayaran').modal('hide');
    let sendData = {
      id_tagihan: this.state.id_tagihan,
      id_petugas: this.state.petugas.id_petugas,
      nisn: this.state.nisn,
      bulan_bayar: this.state.bulan_bayar,
      tahun_bayar: this.state.tahun_bayar,
      id_pembayaran: this.state.id_pembayaran,
    };
    let url = base_url + '/pembayaran';
    if (this.state.action === 'insert') {
      axios
        .post(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getPembayaran();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === 'update') {
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getPembayaran();
        })
        .catch((error) => console.log(error));
    }
  };

  getPetugas = () => {
    let temp = JSON.parse(localStorage.getItem('admin'));
    this.setState({
      petugas: temp,
    });
  };

  getPembayaran = () => {
    let url = base_url + '/pembayaran';
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({ pembayaran: response.data });
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
    this.getPembayaran();
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
              Pembayaran
              <button
                className="btn btn-outline-info btn-sm ml-4"
                onClick={() => this.Add()}
              >
                Tambah data
              </button>
            </h3>
            <div className="mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama Siswa</th>
                    <th>ID Tagihan</th>
                    <th>Tanggal Bayar</th>
                    <th>Nominal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.pembayaran.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.siswa.nama}</td>
                      <td>
                        {item.tagihan.id_tagihan} ({item.tagihan.bulan}/
                        {item.tagihan.tahun})
                      </td>
                      <td>{item.tgl_bayar}</td>
                      <td>{item.jumlah_bayar}</td>
                      <td>
                        {item.konfirmasi === true ? (
                          <span className="badge bg-success text-white">
                            Done
                          </span>
                        ) : (
                          <span className="badge bg-secondary text-white">
                            Waiting
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-dark btn-sm ml-1"
                          onClick={() => this.Edit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-dark btn-sm ml-2"
                          onClick={() => this.Drop(item)}
                        >
                          Delete
                        </button>
                        {item.konfirmasi === false ? (
                          <button
                            className="btn btn-warning btn-sm ml-2"
                            onClick={() => this.Confirm(item)}
                          >
                            Konfirmasi
                          </button>
                        ) : (
                          <div></div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ModalPembayaran
              savePemb={(ev) => this.savePemb(ev)}
              nisn={this.state.nisn}
              chsis={(ev) => this.setState({ nisn: ev.target.value })}
              bulan={this.state.bulan_bayar}
              chbul={(ev) => this.setState({ bulan_bayar: ev.target.value })}
              tahun={this.state.tahun_bayar}
              chtah={(ev) => this.setState({ tahun_bayar: ev.target.value })}
              id_tagihan={this.state.id_tagihan}
              chtag={(ev) => this.setState({ id_tagihan: ev.target.value })}
              status={this.state.action}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
