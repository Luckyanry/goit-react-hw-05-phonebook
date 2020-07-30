import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";
import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    this.setState((state) => ({
      animation: !state.animation,
    }));

    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  handleFilter = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addContact = (contactObj) => {
    this.setState((prev) => ({
      contacts: [...prev.contacts, contactObj],
    }));
  };

  deleteContact = ({ target }) => {
    const { id } = target;
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className="Container">
        <CSSTransition
          in={true}
          appear={true}
          classNames="Title-slideIn"
          timeout={500}
          unmountOnExit
        >
          <h1 className="AppTitle">Phonebook</h1>
        </CSSTransition>

        <ContactForm state={this.state} addContact={this.addContact} />

        {this.state.contacts.length === 0 && (
          <>
            <h2 className="ContactTitle">Contacts</h2>
            <p>Contacts list is empty. Please, create new cotnact!</p>
          </>
        )}

        <CSSTransition
          in={this.state.contacts.length > 1}
          classNames="FilterAnimation"
          timeout={250}
          unmountOnExit
        >
          <Filter state={this.state} handleFilter={this.handleFilter} />
        </CSSTransition>

        <ContactList
          filteredContacts={this.getFilteredContact()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
