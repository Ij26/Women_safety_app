import React, { useState } from "react";

function AddContact({ toggleAddContact, saveContact }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    if (name && phone) {
      saveContact({ name, phone });
      toggleAddContact();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">Add Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex justify-end">
        <button
          onClick={toggleAddContact}
          className="bg-gray-300 text-gray-700 p-2 rounded mr-2"
        >
          Discard
        </button>
        <button
          onClick={handleSave}
          className="bg-pink-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddContact;
