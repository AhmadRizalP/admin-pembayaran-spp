import React, { Fragment } from 'react';
import Navbar from '../Component/Navbar';
import Navbar2 from '../Component/Navbar2';
import SiswaList from '../Component/SiswaList';
import './One.css';
import { base_url } from '../config.js';
import axios from 'axios';
import $ from 'jquery';
import KelasList from '../Component/KelasList';
import SppList from '../Component/SppList';
import ModalSiswa from '../Component/ModalSiswa';
import ModalKelas from '../Component/ModalKelas';
import ModalSpp from '../Component/ModalSpp';

export default class Siswa extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      siswa: [],
      kelas: [],
      spp: [],
      petugas: [],
      nisn: '',
      nis: '',
      nama: '',
      id_kelas: 'Pilih ID Kelas',
      alamat: '',
      no_telp: '',
      username: '',
      password: '',
      id_spp: 'Pilih ID SPP',
      nama_kelas: '',
      jurusan: '',
      tahun: '',
      nominal: '',
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

  getPetugas = () => {
    let temp = JSON.parse(localStorage.getItem('admin'));
    this.setState({
      petugas: temp,
    });
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

  Adds = () => {
    $('#modal_siswa').modal('show');
    this.setState({
      action: 'insert',
      nisn: '',
      nis: '',
      nama: '',
      id_kelas: 'Pilih ID Kelas',
      alamat: '',
      no_telp: '',
      username: '',
      password: '',
      id_spp: 'Pilih ID SPP',
    });
  };

  Addk = () => {
    $('#modal_kelas').modal('show');
    this.setState({
      action: 'insert',
      id_kelas: '',
      nama_kelas: '',
      jurusan: '',
    });
  };

  Addp = () => {
    $('#modal_spp').modal('show');
    this.setState({
      action: 'insert',
      id_spp: '',
      tahun: '',
      nominal: '',
    });
  };

  Edits = (item) => {
    $('#modal_siswa').modal('show');
    this.setState({
      action: 'update',
      nisn: item.nisn,
      nis: item.nis,
      nama: item.nama,
      id_kelas: item.id_kelas,
      alamat: item.alamat,
      no_telp: item.no_telp,
      username: item.username,
      password: '',
      id_spp: item.id_spp,
    });
  };

  Editk = (item) => {
    $('#modal_kelas').modal('show');
    this.setState({
      action: 'update',
      id_kelas: item.id_kelas,
      nama_kelas: item.nama_kelas,
      jurusan: item.kompetensi_keahlian,
    });
  };

  Editp = (item) => {
    $('#modal_spp').modal('show');
    this.setState({
      action: 'update',
      id_spp: item.id_spp,
      tahun: item.tahun,
      nominal: item.nominal,
    });
  };

  saveSiswa = (event) => {
    event.preventDefault();
    $('#modal_siswa').modal('hide');
    let sendData = {
      nisn: this.state.nisn,
      nis: this.state.nis,
      nama: this.state.nama,
      id_kelas: this.state.id_kelas,
      alamat: this.state.alamat,
      no_telp: this.state.no_telp,
      username: this.state.username,
      password: this.state.password,
      id_spp: this.state.id_spp,
    };
    let url = base_url + '/siswa';
    if (this.state.action === 'insert') {
      axios
        .post(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getSiswa();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === 'update') {
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getSiswa();
        })
        .catch((error) => console.log(error));
    }
  };

  saveKelas = (event) => {
    event.preventDefault();
    $('#modal_kelas').modal('hide');
    let sendData = {
      id_kelas: this.state.id_kelas,
      nama_kelas: this.state.nama_kelas,
      kompetensi_keahlian: this.state.jurusan,
    };
    let url = base_url + '/kelas';
    if (this.state.action === 'insert') {
      axios
        .post(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getKelas();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === 'update') {
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getKelas();
        })
        .catch((error) => console.log(error));
    }
  };

  saveSpp = (event) => {
    event.preventDefault();
    $('#modal_spp').modal('hide');
    let sendData = {
      id_spp: this.state.id_spp,
      tahun: this.state.tahun,
      nominal: this.state.nominal,
    };
    let url = base_url + '/spp';
    if (this.state.action === 'insert') {
      axios
        .post(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getSpp();
        })
        .catch((error) => console.log(error));
    } else if (this.state.action === 'update') {
      axios
        .put(url, sendData, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getSpp();
        })
        .catch((error) => console.log(error));
    }
  };

  Drops = (item) => {
    if (window.confirm('are you sure will delete this item?')) {
      let url = base_url + '/siswa/' + item.nisn;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getSiswa();
        })
        .catch((error) => console.log(error));
    }
  };

  Dropk = (item) => {
    if (window.confirm('are you sure will delete this item?')) {
      let url = base_url + '/kelas/' + item.id_kelas;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getKelas();
        })
        .catch((error) => console.log(error));
    }
  };

  Dropp = (item) => {
    if (window.confirm('are you sure will delete this item?')) {
      let url = base_url + '/spp/' + item.id_spp;
      axios
        .delete(url, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getSpp();
        })
        .catch((error) => console.log(error));
    }
  };

  componentDidMount() {
    this.getSiswa();
    this.getKelas();
    this.getSpp();
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
              Siswa
              {this.state.petugas.level === 'admin' ? (
                <button
                  className="btn btn-outline-info btn-sm ml-4"
                  onClick={() => this.Adds()}
                >
                  Tambah data
                </button>
              ) : (
                <button className="btn btn-danger btn-sm ml-4" disabled>
                  Tambah data (Only Admin)
                </button>
              )}
            </h3>
            <div className="mt-3">
              <div className="m-1 row">
                {this.state.siswa.map((item) => (
                  <SiswaList
                    nisn={item.nisn}
                    nama={item.nama}
                    nis={item.nis}
                    kelas={item.kelas.nama_kelas}
                    alamat={item.alamat}
                    jurusan={item.kelas.kompetensi_keahlian}
                    edits={() => this.Edits(item)}
                    drop={() => this.Drops(item)}
                    level={this.state.petugas.level}
                  />
                ))}
              </div>
              <hr></hr>
              <div className="m-1 row">
                <div className="col">
                  <h5 className="font-weight-light">
                    Kelas
                    {this.state.petugas.level === 'admin' ? (
                      <button
                        className="btn btn-outline-info btn-sm ml-4"
                        onClick={() => this.Addk()}
                      >
                        Tambah data
                      </button>
                    ) : (
                      <button className="btn btn-danger btn-sm ml-4" disabled>
                        Tambah data (Only Admin)
                      </button>
                    )}
                  </h5>
                  <div className="mt-3">
                    {this.state.kelas.map((item) => (
                      <KelasList
                        kelas={item.nama_kelas}
                        jurusan={item.kompetensi_keahlian}
                        edit={() => this.Editk(item)}
                        drop={() => this.Dropk(item)}
                        level={this.state.petugas.level}
                      />
                    ))}
                  </div>
                </div>
                <div className="col">
                  <h5 className="font-weight-light">
                    SPP
                    {this.state.petugas.level === 'admin' ? (
                      <button
                        className="btn btn-outline-info btn-sm ml-4"
                        onClick={() => this.Addp()}
                      >
                        Tambah data
                      </button>
                    ) : (
                      <button className="btn btn-danger btn-sm ml-4" disabled>
                        Tambah data (Only Admin)
                      </button>
                    )}
                  </h5>
                  <div className="mt-3">
                    {this.state.spp.map((item) => (
                      <SppList
                        tahun={item.tahun}
                        nominal={item.nominal}
                        edit={() => this.Editp(item)}
                        drop={() => this.Dropp(item)}
                        level={this.state.petugas.level}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <ModalSiswa
              saveSiswa={(ev) => this.saveSiswa(ev)}
              action={this.state.action}
              chnisn={(ev) => this.setState({ nisn: ev.target.value })}
              nisn={this.state.nisn}
              chnis={(ev) => this.setState({ nis: ev.target.value })}
              nis={this.state.nis}
              chnama={(ev) => this.setState({ nama: ev.target.value })}
              nama={this.state.nama}
              chidk={(ev) => this.setState({ id_kelas: ev.target.value })}
              idk={this.state.id_kelas}
              chalamat={(ev) => this.setState({ alamat: ev.target.value })}
              alamat={this.state.alamat}
              chnotelp={(ev) => this.setState({ no_telp: ev.target.value })}
              notelp={this.state.no_telp}
              chusern={(ev) => this.setState({ username: ev.target.value })}
              username={this.state.username}
              chpass={(ev) => this.setState({ password: ev.target.value })}
              password={this.state.password}
              chids={(ev) => this.setState({ id_spp: ev.target.value })}
              ids={this.state.id_spp}
            />
            <ModalKelas
              saveKelas={(ev) => this.saveKelas(ev)}
              chkelas={(ev) => this.setState({ nama_kelas: ev.target.value })}
              kelas={this.state.nama_kelas}
              jurusan={this.state.jurusan}
              chjurusan={(ev) => this.setState({ jurusan: ev.target.value })}
            />
            <ModalSpp
              saveSpp={(ev) => this.saveSpp(ev)}
              chtahun={(ev) => this.setState({ tahun: ev.target.value })}
              tahun={this.state.tahun}
              chnominal={(ev) => this.setState({ nominal: ev.target.value })}
              nominal={this.state.nominal}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
