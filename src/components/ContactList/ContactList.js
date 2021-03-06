import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SingleContact from "../SingleContact/SingleContact";
import "./ContactList.css";

const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <TransitionGroup component="ul" className="ContactList">
      {filteredContacts.map((contact, id) => (
        <CSSTransition key={id} classNames="ListItem" timeout={250}>
          <SingleContact contact={contact} deleteContact={deleteContact} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ContactList;

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      namber: PropTypes.string,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
