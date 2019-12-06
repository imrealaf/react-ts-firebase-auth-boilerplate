/**
 *  useModal
 *
 *  @type Custom Hook
 *  @desc handles modal state
 */

import { useState } from "react";

export default () => {
  const [showModal, setShowModal] = useState(false) as any;

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  /* 
    Return data for component consumption
  */
  return [showModal, handleShowModal, handleCloseModal, setShowModal];
};
