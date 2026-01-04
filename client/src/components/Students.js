import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", branch: "", CGPA: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  

  // Fetch students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/students`,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      setStudents(res.data.data);

    } catch (error) {
      setStatus(error.response?.data?.message);
    } setTimeout(() => { setStatus("") }, 3000);
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let res;
      if (editingId) {
       res= await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/student/${editingId}`, form,
                             {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        res=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/student`, form,
                              {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setStatus(res.data.message);
      setForm({ name: "", branch: "", CGPA: "" });
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
      setStatus(error.response?.data?.message || "Error saving student");
    }
    setTimeout(() => { setStatus("") }, 3000);
  };

  // Edit student
  const editStudent = (student) => {
    setForm({ name: student.name, branch: student.branch, CGPA: student.CGPA });
    setEditingId(student._id);
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/student/${id}`,
                                      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setStatus(res.data.message);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      setStatus(error.response?.data?.message || "Failed to delete student.")
      }
      setTimeout(() => { setStatus("") }, 3000);
    }
  };

  return (  
    <div>
   {/* Student Table */}

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
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Branch</th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>CGPA</th>
      <th style={{ padding: "12px", border: "1px solid #ffffff" }}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {students.map((std) => (
      <tr
        key={std._id}
        style={{
          textAlign: "center",
          borderBottom: "1px solid #cfead3",
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
          {std.name}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {std.branch}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          {std.CGPA}
        </td>

        <td style={{ padding: "12px", border: "1px solid #cfead3" }}>
          <button
            onClick={() => editStudent(std)}
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
            onClick={() => deleteStudent(std._id)}
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

export default StudentList;

