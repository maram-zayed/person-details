import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonTable = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiUrl = 'http://localhost:5255/api/persons'; 

  const fetchPersons = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(apiUrl, {
        params: { filterByName: filter },
      });

      if (response.data && response.data.data) {
        setPersons(response.data.data);
      } else {
        setPersons([]);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [filter]);

  return (
    <div>
      <h1>Person Details</h1>
      <label htmlFor="filter">Filter by Name:</label>
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Enter name"
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Telephone Code</th>
            <th>Telephone Number</th>
            <th>Address</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {persons.length > 0 ? (
            persons.map((person, index) => (
              <tr key={index}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.telephoneCode}</td>
                <td>{person.telephoneNumber}</td>
                <td>{person.address}</td>
                <td>{person.country}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PersonTable;
