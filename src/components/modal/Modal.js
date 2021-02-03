import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {

  render() {
    let showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="grid-container">
            <div className="beer-name"><p>{this.props.item.name}</p></div>
            <div className="beer-img">
              <img className="modal-img" src={this.props.item.image_url} alt=""></img>
            </div>
            <div className="beer-tagline"><p>{this.props.item.tagline}</p></div>
            <div className="beer-brewed"><p>{this.props.item.first_brewed}</p></div>
            <div className="beer-description"><p>{this.props.item.description}</p></div>
            <div className="beer-tagline-header"><p>Tagline</p></div>
            <div className="beer-brewed-header"><p>First Brewed</p></div>
            <div className="beer-description-header"><p>Description</p></div>
          </div>
          <button className="button" type="button" onClick={this.props.handleClose}>
            Close
        </button>
        </section>
      </div>
    );
  }

}

export default Modal;