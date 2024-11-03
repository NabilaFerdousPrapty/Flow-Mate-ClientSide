import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowModal from "../showModal/ShowModal";

const ModalPage = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000); // Show modal after 10 seconds

    return () => clearTimeout(timer); // Clear the timer when component unmounts
  }, []);

  const handleCloseModal = () => {
    setShowModal(false); // Set showModal to false to close the modal
  };

  const handleSubscribe = () => {
    setShowModal(false); // Close the modal on subscribe (optional)
    // navigate('/'); // Redirect if needed
  };

  return (
    <div className="relative"> {/* Ensures no z-index conflicts */}
      {showModal && (
        <ShowModal onClose={handleCloseModal} onSubscribe={handleSubscribe} />
      )}
    </div>
  );
};

export default ModalPage;
