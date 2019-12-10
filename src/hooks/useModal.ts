/**
 *  useModal
 *
 *  @type Custom Hook
 *  @desc handles modal state
 */

import { useState } from "react";

export default () => {
  const [show, setShow] = useState(false) as any;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* 
    Return data for component consumption
  */
  return { show, handleShow, handleClose, setShow };
};
