import React, { useContext, useEffect } from "react";
import { DrugContext } from "../../context/DrugContext"; // ✅ use DrugContext

const DrugsList = () => {
  const { drugs, getAllDrugs, updateDrugField, aToken } =
    useContext(DrugContext); // ✅ not AdminContext

  useEffect(() => {
    if (aToken) {
      getAllDrugs();
    }
  }, [aToken]);

  const handleCheckboxChange = (drugId, field, value) => {
    updateDrugField(drugId, field, value);
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium mb-4">All Drugs</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {drugs.map((drug, index) => (
          <div
            key={index}
            className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden p-4"
          >
            <img
              className="bg-[#EAEFFF] mb-2"
              src={drug.image}
              alt={drug.name}
            />
            <p className="text-[#262626] text-lg font-medium">{drug.name}</p>
            <p className="text-[#5C5C5C] text-sm">{drug.category}</p>
            <p className="text-[#5C5C5C] text-sm">
              Manufacturer: {drug.manufacturer}
            </p>
            <p className="text-[#5C5C5C] text-sm">Price: {drug.price}</p>
            <p className="text-[#5C5C5C] text-sm">Stock: {drug.stock}</p>

            <div className="mt-2 flex flex-col gap-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={drug.prescriptionRequired}
                  onChange={(e) =>
                    handleCheckboxChange(
                      drug._id,
                      "prescriptionRequired",
                      e.target.checked
                    )
                  }
                />
                Prescription Required
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={drug.stock > 0} // reflects DB value
                  onChange={
                    (e) =>
                      updateDrugField(
                        drug._id,
                        "inStock",
                        e.target.checked ? drug.stock || 1 : 0
                      )
                  }
                />
                <span className={drug.stock === 0 ? "text-red-500" : ""}>In Stock</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrugsList;
