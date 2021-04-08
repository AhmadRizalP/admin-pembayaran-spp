import React from 'react';

export default class ModalSpp extends React.Component {
  render() {
    return (
      <div className="modal fade" id="modal_spp">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h4>Form SPP</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.props.saveSpp}>
                Tahun
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.tahun}
                  onChange={this.props.chtahun}
                  required
                />
                Nominal
                <input
                  type="text"
                  className="form-control mb-1"
                  value={this.props.nominal}
                  onChange={this.props.chnominal}
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
