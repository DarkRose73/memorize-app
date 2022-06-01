import React, { useCallback, useEffect, useMemo, useState } from "react";
import List from "./components/List";

const initialUsers = [
  {
    id: 1,
    name: "Luis",
  },
  {
    id: 2,
    name: "Maria",
  },
  {
    id: 3,
    name: "Marcos",
  },
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    const newUser = { id: Date.now(), name: text };
    const changedUsers = [...users, newUser];
    setUsers(changedUsers);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  const handleDelete = useCallback(
    (userId) => {
      const changedUsers = users.filter((user) => user.id !== userId);
      setUsers(changedUsers);
    },
    [users]
  );

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search, users]
  );

  const printUsers = useCallback(() => {
    console.log("changed users", users);
  }, [users]);

  useEffect(() => {
    printUsers();
  }, [users, printUsers]);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAdd}>Add</button>
      <List users={filteredUsers} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
