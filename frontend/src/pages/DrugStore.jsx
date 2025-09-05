import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DrugStore = () => {
  const { category } = useParams();
  const [filterDrug, setFilterDrug] = useState([]);
  const navigate = useNavigate();

  const { drugs } = useContext(AppContext);

  const applyFilter = () => {
    if (category) {
      setFilterDrug(drugs.filter((drug) => drug.category === category));
    } else {
      setFilterDrug(drugs);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [drugs, category]);

  return (
    <div>
      <p className="text-gray-600">Browse medicines by category.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Sidebar Categories */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <p
            onClick={() =>
              category === "Pain Relief"
                ? navigate("/drugstore")
                : navigate("/drugstore/Pain Relief")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Pain Relief" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pain Relief
          </p>
          <p
            onClick={() =>
              category === "Allergy"
                ? navigate("/drugstore")
                : navigate("/drugstore/Allergy")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Allergy" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Allergy
          </p>
          <p
            onClick={() =>
              category === "Antibiotic"
                ? navigate("/drugstore")
                : navigate("/drugstore/Antibiotic")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Antibiotic" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Antibiotic
          </p>
          <p
            onClick={() =>
              category === "Antacid"
                ? navigate("/drugstore")
                : navigate("/drugstore/Antacid")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Antacid" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Antacid
          </p>
          <p
            onClick={() =>
              category === "Diabetes"
                ? navigate("/drugstore")
                : navigate("/drugstore/Diabetes")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Diabetes" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Diabetes
          </p>
          <p
            onClick={() =>
              category === "Mental Health"
                ? navigate("/drugstore")
                : navigate("/drugstore/Mental Health")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              category === "Mental Health" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Mental Health
          </p>
        </div>

        {/* Main Drug Grid */}
        <div className="w-full grid grid-auto-fill gap-4 gap-y-6">
          {filterDrug.map((item, index) => (
            <div
              onClick={() => navigate(`/drug/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrugStore;
