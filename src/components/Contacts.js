import React, { useState, useEffect } from "react";
import AddContact from "./AddContact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Contacts() {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const maxContacts = 10;
  const userId = localStorage.getItem("userId"); // Fetch userId from localStorage

  useEffect(() => {
    // Fetch stored contacts from the database when the component loads
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/user/get-contacts/${userId}`);
        if (response.data.contacts) {
          setContacts(response.data.contacts);
        } else {
          toast.error("No contacts found");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to fetch contacts");
      }
    };

    if (userId) {
      fetchContacts();
    }
  }, [userId]);

  const toggleAddContact = () => {
    setIsAddContactOpen(!isAddContactOpen);
  };

  const saveContact = async (newContact) => {
    if (contacts.length >= maxContacts) {
      toast.error("Maximum number of contacts reached!");
      return;
    }

    try {
      // API call to save the new contact in the database
      const response = await axios.post("http://localhost:5000/api/v1/user/add-contact", {
        userId,  // Send userId from localStorage
        name: newContact.name,
        number: newContact.phone,
      });

      // Check if the response contains the success message
      if (response.data.message === "Contacts updated successfully") {
        // Update contacts state
        const updatedContacts = [...contacts, { name: newContact.name, contact: newContact.phone }];
        setContacts(updatedContacts);

        // Close add contact modal
        toggleAddContact();

        // Show success message
        const remainingContacts = maxContacts - updatedContacts.length;
        toast.success(`Contact saved! ${remainingContacts} ${remainingContacts === 1 ? 'slot' : 'slots'} remaining.`);
      } else {
        // Handle unexpected response
        toast.error("Failed to save contact. Please try again.");
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      toast.error("Failed to save contact.");
    }
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDelete = async (index) => {
    try {
      // Here you can make an API call to delete the contact if needed

      const updatedContacts = contacts.filter((_, i) => i !== index);
      setContacts(updatedContacts);

      // Show success message
      const remainingContacts = maxContacts - updatedContacts.length;
      toast.success(`Contact deleted! ${remainingContacts} ${remainingContacts === 1 ? 'slot' : 'slots'} remaining.`);
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact.");
    }
  };

  return (
    <div className="relative min-h-screen bg-pink-200 flex items-center justify-center">
      <div className="bg-white rounded-tl-3xl rounded-br-3xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-pink-700 mb-4">Contacts</h1>

        {/* Display number of saved contacts */}
        <p className="text-gray-700 mb-2">
          {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} saved.{" "}
          {maxContacts - contacts.length} {maxContacts - contacts.length === 1 ? "slot" : "slots"} remaining.
        </p>

        {/* Button to Add Contact */}
        <button
          className="bg-pink-500 text-white p-2 rounded mt-4 flex items-center"
          onClick={toggleAddContact}
          disabled={contacts.length >= maxContacts}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          {contacts.length >= maxContacts ? "Max Contacts Reached" : "Add Contact"}
        </button>

        {/* Display saved contacts */}
        <ul className="mt-4 space-y-4">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="bg-green-100 p-4 rounded-lg shadow-md text-gray-700 text-lg flex justify-between items-center"
            >
              <div>
                <div>{contact.name}</div>
                <div>{contact.contact}</div> {/* Display contact number */}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCall(contact.contact)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faPhone} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add contact modal */}
      {isAddContactOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddContact toggleAddContact={toggleAddContact} saveContact={saveContact} />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Contacts;