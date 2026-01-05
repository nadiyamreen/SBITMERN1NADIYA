import React, { useState, useEffect } from "react";
import axios from "axios";

const SStaffList = () => {
  const [sstaffs, setSStaffs] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", salary: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  

  // Fetch support staff on mount
  useEffect(() => {
    fetchSStaffs();
  }, []);

  const fetchSStaffs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/sstaffs`,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      setSStaffs(res.data.data);
    } catch (error) {
      setStatus(error.response?.data?.message);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (add/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const token = localStorage.getItem("token");
      let res;
      if (editingId) {
       res =  await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/sstaff/${editingId}`, form,
                               {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/sstaff`, form ,
                                {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setStatus(res.data.message);
      setForm({ name: "", role: "", salary: "" });
      setEditingId(null);
      fetchSStaffs();
    } catch (error) {
      console.error("Error saving support staff:", error);
      setStatus(error.response?.data?.message ||"Failed to save support staff. Try again.");
    }
    setTimeout(() => { setStatus("") }, 3000);
  };

  // Edit staff
  const editSStaff = (staff) => {
    setForm({ name: staff.name, role: staff.role, salary: staff.salary });
    setEditingId(staff._id);
  };

  // Delete staff
  const deleteSStaff = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        const token = localStorage.getItem("token");
       const res= await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/sstaff/${id}`,
                                         {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       setStatus(res.data.message);
        fetchSStaffs();
      } catch (error) {
        console.error("Error deleting support staff:", error);
        setStatus(error.response?.data?.message || "Failed to delete support staff.");
      }
    }   setTimeout(() => { setStatus("") }, 3000);
  };

  return (
    <div>
    {/* Support Staff Table */}
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
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Role</th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Salary</th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {sstaffs.map((ssf) => (
      <tr
        key={ssf._id}
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
          {ssf.name}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {ssf.role}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {ssf.salary}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          <button
            onClick={() => editSStaff(ssf)}
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
            onClick={() => deleteSStaff(ssf._id)}
            style={{
              backgroundColor: "#4caf50",
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

export default SStaffList;
