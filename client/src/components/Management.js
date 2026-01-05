import React, { useState, useEffect } from "react";
import axios from "axios";
//import { set } from "mongoose";

const ManagementList = () => {
  const [managements, setManagements] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    qualification: "",
    salary: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

   

  // Fetch managements on mount
  useEffect(() => {
    fetchManagements();
  }, []);

  const fetchManagements = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/managements`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  
      setManagements(res.data.data);
    } catch (error) {
      setStatus(error.response?.data?.message);
    } setTimeout(() => { setStatus("") }, 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let res;
      if (editingId) {
       res= await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/management/${editingId}`, form,
                             {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/management`, form,
                                {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setStatus(res.data.message);
      setForm({ name: "", designation: "", qualification: "", salary: "" });
      setEditingId(null);
      fetchManagements();
    } catch (error) {
      console.error("Error saving management:", error);
      setStatus( error.response?.data?.message ||"Failed to save management. Try again.");
    } setTimeout(() => { setStatus("") }, 3000);
  };

  const editManagement = (mag) => {
    setForm({
      name: mag.name,
      designation: mag.designation,
      qualification: mag.qualification,
      salary: mag.salary,
    });
    setEditingId(mag._id);
  };

  const deleteManagement = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        const token = localStorage.getItem("token");
      const res =  await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/management/${id}`,
                                          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setStatus(res.data.message);
        fetchManagements();
      } catch (error) {
        console.error("Error deleting management:", error);
      setStatus(error.response?.data?.message || "Failed to delete management." );
      }
    } setTimeout(() => { setStatus("") }, 3000);
  };

  return (
    <div>
   {/* Management Table */}
   
<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    border: "2px solid #7bc47f", // pista green
  }}
>
  <thead>
    <tr style={{ backgroundColor: "#7bc47f", color: "#ffffff" }}>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Name</th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>
        Designation
      </th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>
        Qualification
      </th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Salary</th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {managements.map((mag) => (
      <tr
        key={mag._id}
        style={{
          textAlign: "center",
          borderBottom: "1px solid #7bc47f",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f1faf2")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ffffff")
        }
      >
        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {mag.name}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {mag.designation}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {mag.qualification}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {mag.salary}
        </td>

        <td style={{ padding: "12px", border: "1px solid #7bc47f" }}>
          <button
            onClick={() => editManagement(mag)}
            style={{
              backgroundColor: "#7bc47f",
              color: "#ffffff",
              border: "none",
              padding: "6px 10px",
              marginRight: "8px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteManagement(mag._id)}
            style={{
              backgroundColor: "#7bc47f",
              color: "#ffffff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

  );
};

export default ManagementList;
