// src/components/MedicineList.jsx
import React, { useState, useEffect } from "react";
import "./MedicineList.css";

const MedicineList = ({ onAddToCart }) => {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const medicinesPerPage = 8;

  useEffect(() => {
    // First fetch from dummy API and store in DB
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => res.json())
      .then((data) => {
        // Store in DB
        fetch("http://localhost/pharma_backend/store_medicines.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.products),
        })
          .then((res) => res.json())
          .then(() => {
            // After storing, fetch from DB
            fetch("http://localhost/pharma_backend/get_medicines.php")
              .then((res) => res.json())
              .then((dbData) => setMedicines(dbData));
          })
          .catch((error) => console.error("Error storing medicines:", error));
      })
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  const indexOfLastMedicine = currentPage * medicinesPerPage;
  const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
  const currentMedicines = medicines.slice(
    indexOfFirstMedicine,
    indexOfLastMedicine
  );

  const totalPages = Math.ceil(medicines.length / medicinesPerPage);

  return (
    <div className="medicine-container">
      <h2 className="medicine-title">Medicines</h2>
      <div className="medicine-cards">
        {currentMedicines.map((medicine) => (
          <div key={medicine.id} className="medicine-card">
            <img src={medicine.image} alt={medicine.name} />
            <h3>{medicine.name}</h3>
            <p>{medicine.composition.slice(0, 50)}...</p>
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
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MedicineList;
