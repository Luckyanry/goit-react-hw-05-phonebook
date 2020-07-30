import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import "./ContactForm.css";

class ContactForm extends Component {
  formInitialState = {
    name: "",
    number: "",
  };

  state = {
    ...this.formInitialState,
    alert: false,
  };

  inputHandler = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  submitHandler = (e) => {
    const { name, number, alert } = this.state;
    e.preventDefault();

    const { contacts } = this.props.state;
    const isExists = contacts.find((contact) => contact.name === name);

    if (isExists) {
      this.toggleAlert(alert);
      return this.reset();
    }

    const singleContact = {
      name,
      number,
      id: uuidv4(),
    };

    this.props.addContact(singleContact);
    this.reset();
  };

  reset = () => {
    this.setState({ ...this.formInitialState });
  };

  toggleAlert = (status) => {
    this.setState({ alert: !status });
  };

  render() {
    const { name, number, alert } = this.state;

    return (
      <>
        <CSSTransition
          in={alert}
          classNames="Alert"
          timeout={500}
          mountOnEnter
          unmountOnExit
        >
          <button
            onClick={this.toggleAlert}
            className="AlertBtn"
          >{`Contact already exists!`}</button>
        </CSSTransition>
        <form className="ContactsForm" onSubmit={this.submitHandler}>
          <label className="InputName">
            Name
            <br />
            <input
              className="InputForm"
              type="text"
              name="name"
              placeholder="Add name"
              value={name}
              onChange={this.inputHandler}
            />
          </label>
          <br />
          <label className="InputName">
            Number
            <br />
            <input
              className="InputForm"
              type="text"
              name="number"
              placeholder="Add phone number"
              value={number}
              onChange={this.inputHandler}
            />
          </label>
          <br />
          <button type="submit" className="SubmitBtn">
            Create contact
          </button>
        </form>
      </>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  state: PropTypes.shape({
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        namber: PropTypes.string,
      })
    ),
    filter: PropTypes.string,
  }).isRequired,
  addContact: PropTypes.func.isRequired,
};
