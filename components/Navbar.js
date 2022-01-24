import Image from "next/image";
import { useState } from "react";
import Nav from "./Nav";

function Navbar() {
  const [direction, setDirection] = useState(true);
  const handleDirection = (e) => {
    e.preventDefault();
    setDirection(!direction);
    console.log("direction", direction);
  };

  return (
    <>
      <nav className="pb-3">
        {direction ? (
          <Nav handleDirection={handleDirection} setDirection={setDirection} />
        ) : (
          <div dir="rtl">
            <Nav />
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
