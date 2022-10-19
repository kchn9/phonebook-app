import { AddContact, Header, PhonebookViewer } from "./components";
import { useState } from "react";

export default function App() {
  const [change, setChange] = useState(false);

  return (
    <div>
      <Header />
      <PhonebookViewer change={change} setChange={setChange} />
      <AddContact setChange={setChange} />
    </div>
  );
}
