import React from 'react';

export default class SiswaList extends React.Component {
  render() {
    return (
      <div>
        <div className="card cards ">
          <div className="card-body row align-items-center">
            <div className="col-2">
              <h5>{this.props.nisn}</h5>
            </div>
            <div className="col">
              <h5>Nama : {this.props.nama}</h5>
              <h6 className="font-weight-normal">Nis : {this.props.nis}</h6>
              <h6 className="font-weight-normal">
                Kelas : {this.props.kelas} / {this.props.jurusan}
              </h6>
              <h6 className="font-weight-normal">
                Alamat : {this.props.alamat}
              </h6>
            </div>
            <div className="col-5">
              {this.props.level === 'admin' ? (
                <div>
                  <button
                    className="btn btn-dark m-1 btn-block"
                    onClick={this.props.edits}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-dark m-1 btn-block"
                    onClick={this.props.drop}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div>
                  <button className="btn btn-dark btn-block m-1" disabled>
                    Edit (Admin)
                  </button>
                  <button className="btn btn-dark btn-block m-1" disabled>
                    Delete (Admin)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
