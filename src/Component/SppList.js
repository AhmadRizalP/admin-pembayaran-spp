import React from 'react';

export default class SppList extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body p-2 row align-items-center">
          <div className="col-2 ml-3">
            <h6 className="font-weight-normal">Tahun</h6>
            <h5>{this.props.tahun}</h5>
          </div>
          <div className="col">
            <h6 className="font-weight-normal">Nominal</h6>
            <h5>{this.props.nominal}</h5>
          </div>
          <div className="col-5">
            {this.props.level === 'admin' ? (
              <div>
                <button
                  className="btn btn-dark m-1 btn-block"
                  onClick={this.props.edit}
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
    );
  }
}
