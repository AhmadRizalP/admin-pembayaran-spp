import React from 'react';

export default class ModalKelas extends React.Component {
  render() {
    return (
      <div className="modal fade" id="modal_kelas">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h4>Form Kelas</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.props.saveKelas}>
                Kelas
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.kelas}
                  onChange={this.props.chkelas}
                  required
                />
                Kompetensi Jurusan
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.jurusan}
                  onChange={this.props.chjurusan}
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
