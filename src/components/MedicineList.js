// src/components/MedicineList.jsx
import React, { useState, useEffect } from "react";
import "./MedicineList.css";

const MedicineList = ({ onAddToCart }) => {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const medicinesPerPage = 8;

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => res.json())
      .then((data) => setMedicines(data.products))
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = medicines.slice(
    indexOfFirstMedicine,
    indexOfLastMedicine
  );

  const totalPages = Math.ceil(medicines.length / medicinesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="medicine-container">
      <h2 className="medicine-title">Medicines</h2>
      <div className="medicine-cards">
        {currentMedicines.map((medicine) => (
          <div key={medicine.id} className="medicine-card">
            <img src={medicine.thumbnail} alt={medicine.title} />
            <h3>{medicine.title}</h3>
            <p>{medicine.description.slice(0, 50)}...</p>
            <span className="price">₹{medicine.price}</span>
            <button
              className="add-to-cart-btn"
              onClick={() => onAddToCart(medicine)}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MedicineList;
