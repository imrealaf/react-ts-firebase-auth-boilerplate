import React, { useEffect, useState } from "react";

const Preload: React.FC = ({ children }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);

  return show ? <div className="preload">{children}</div> : null;
};

export default Preload;
