import React from 'react';

export default class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body cardbd">
          <h4 className="text-white">{this.props.judul}</h4>
          <h1 className="textc">
            <strong>{this.props.nilai}</strong>
          </h1>
        </div>
      </div>
    );
  }
}
