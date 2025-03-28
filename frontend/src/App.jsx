import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);


  const [subjectDescription, setSubjectDescription] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");




  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);




  const addItem = () => {
    axios
      .post(API_URL, { Subject_Description: subjectDescription, Day: day, Time: time, Room: room })

      .then((response) => {
        
        setItems([...items, response.data])
          setSubjectDescription("");
          setDay("");
          setTime("");
          setRoom("");
      })
      
        .catch((error) => console.error("Error Adding items:", error));
  };








  // update item

  const updateItem = (id, field, value) => {

    const updateItem = items.find(item => item.id === id);
    if(!updateItem) return;

      const updateData = {
        Subject_Description: updateItem.Subject_Description,
        Day: updateItem.Day,
        Time: updateItem.Time,
        Room: updateItem.Room,
        [field]: value // update the field dynamically
      };

    axios.put(`${API_URL}/${id}`, updateData)
        .then(response => {
            setItems(items.map(item => (item.id === id ? response.data : item)));
        })
        .catch(error => console.error("Error updating item:", error));
};



  const deleteItem = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div>
      <center>
        <h1>Assignment</h1>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            style={{ width: "500px" }}
            type="text"
            value={subjectDescription}
            onChange={(e) => setSubjectDescription(e.target.value)}
            placeholder="Subject Description"
          />
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="Day"
          />
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Time"
          />
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem();
              }
            }}
            placeholder="Room"
          />
          <input type="button" value="Add Subject" onClick={addItem} />
        </div>
        <table border="1px">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Day</th>
              <th>Time</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    style={{ width: "500px", textAlign: "center" }}
                    type="text"
                    value={item.Subject_Description}
                    onChange={(e) =>
                      updateItem(item.id, "Subject_Description", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.Day}
                    onChange={(e) => updateItem(item.id, "Day", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.Time}
                    onChange={(e) => updateItem(item.id, "Time", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.Room}
                    onChange={(e) => updateItem(item.id, "Room", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => deleteItem(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default App;
