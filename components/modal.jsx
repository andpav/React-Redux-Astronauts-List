import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      date: '',
      days: '',
      mission: '',
      isMultiple: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    if (this.refs.name.value !== '') {
      this.props.addItem({
        name: this.refs.name.value,
        date: this.refs.date.value,
        days: this.refs.days.value,
        mission: this.refs.mission.value,
        isMultiple: this.refs.isMultiple.value,
      });
      this.props.toggleModal();
    }
  }

  render() {
    if (!this.props.isShowModal) return null;

    return (
      <div className="modal">
        <div className="modal__background">
          <div className="modal__window">
            <div className="modal__header">
              <h2>New Astronaut</h2>
            </div>
            <div className="modal__section">
              <span className="modal__section_text">Name:</span>
              <input className="modal__section_input" ref="name" />
            </div>
            <div className="modal__section">
              <span className="modal__section_text">Date:</span>
              <input className="modal__section_input" ref="date" />
            </div>
            <div className="modal__section">
              <span className="modal__section_text">Days:</span>
              <input className="modal__section_input" ref="days" />
            </div>
            <div className="modal__section">
              <span className="modal__section_text">Mission:</span>
              <input className="modal__section_input" ref="mission" />
            </div>
            <div className="modal__section">
              <span className="modal__section_text">IsMultiple:</span>
              <input className="modal__section_input" ref="isMultiple" />
            </div>
            <div className="modal__footer">
              <button className="submit-button" onClick={this.onSubmit}>Submit</button>
              <button className="close-button" onClick={this.props.toggleModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  addItem: React.PropTypes.func.isRequired,
  toggleModal: React.PropTypes.func.isRequired,
  isShowModal: React.PropTypes.bool.isRequired,
};

export default Modal;
