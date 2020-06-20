import React, { useState } from "react";
import "./styles.css";
import Form from "./component/Form";
import List from "./component/List";
import AddForm from "./component/AddForm";

export default function App() {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <div className="App">
      <List />
      {add && <AddForm />}
      {edit && <Form />}
    </div>
  );
}
