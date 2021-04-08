import React, { Fragment } from 'react';
import Navbar from '../Component/Navbar';
import Navbar2 from '../Component/Navbar2';
import { base_url } from '../config.js';
import axios from 'axios';
import ModalTagihan from '../Component/ModalTagihan';
import $ from 'jquery';

export default class Tagihan extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      tagihan: [],
      petugas: [],
      nisn: '',
      id_tagihan: '',
      bulan: '',
      tahun: '',
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
    $('#modal_tagihan').modal('show');
    this.setState({
      action: 'insert',
      nisn: 'Pilih Siswa',
      bulan: '',
      tahun: '',
    });
  };

  Edit = (item) => {
    $('#modal_tagihan').modal('show');
    this.setState({
      action: 'update',
      id_tagihan: item.id_tagihan,
      id_petugas: item.id_petugas,
      nisn: item.nisn,
      bulan: item.bulan,
      tahun: item.tahun,
    });
  };

  saveTag = (event) => {
    event.preventDefault();
    $('#modal_tagihan').modal('hide');
    let sendData = {
      id_tagihan: this.state.id_tagihan,
      id_petugas: this.state.petugas.id_petugas,
      nisn: this.state.nisn,
      bulan: this.state.bulan,
      tahun: this.state.tahun,
    };
    let url = base_url + '/tagihan';
    if (this.state.action === 'insert') {
      axios
        .post(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getTagihan();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === 'update') {
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getTagihan();
        })
        .catch((error) => console.log(error));
    }
  };

  Drop = (item) => {
    if (window.confirm('are you sure will delete this item?')) {
      let url = base_url + '/tagihan/' + item.id_tagihan;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getTagihan();
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

  getTagihan = () => {
    let url = base_url + '/tagihan';
    axios
      .get(url, this.headerConfig())
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

  componentDidMount() {
    this.getTagihan();
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
              Tagihan
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
                    <th className="text-center">#</th>
                    <th>Nama Siswa</th>
                    <th>Bulan</th>
                    <th>Tahun</th>
                    <th>Nominal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tagihan.map((item, index) => (
                    <tr key={index}>
                      <th className="text-center">{index + 1}</th>
                      <td>{item.siswa.nama}</td>
                      <td>{item.bulan}</td>
                      <td>{item.tahun}</td>
                      <td>{item.siswa.spp.nominal}</td>
                      <td>
                        {item.konfirmasi === true ? (
                          <span className="badge bg-success text-white">
                            Sudah Dibayar
                          </span>
                        ) : (
                          <span className="badge bg-secondary text-white">
                            Belum Dibayar
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ModalTagihan
              saveTag={(ev) => this.saveTag(ev)}
              chsis={(ev) => this.setState({ nisn: ev.target.value })}
              nisn={this.state.nisn}
              chbul={(ev) => this.setState({ bulan: ev.target.value })}
              bulan={this.state.bulan}
              chtah={(ev) => this.setState({ tahun: ev.target.value })}
              tahun={this.state.tahun}
              status={this.state.action}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
