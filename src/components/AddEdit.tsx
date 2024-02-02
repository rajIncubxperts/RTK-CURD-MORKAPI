import { useState, useEffect } from "react";
import { Student } from "../models/student.model";
import {
  useAddStudentMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "../features/studentSlice";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEdit = () => {
  const [students, setStudents] = useState<Student>(Object);
  const [editMode, setEditMode] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const { data } = useGetStudentQuery(id!);

  useEffect(() => {
    if (id && data) {
      setEditMode(true);
      setStudents({ ...data });
    } else {
      setEditMode(false);
    }
  }, [id, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStudents({ ...students, [e.target.name]: e.target.value });
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setStudents({ ...students, [name]: value });
  // };

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? date.toISOString() : "";
    setStudents({ ...students, DateOfBirth: formattedDate });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editMode) {
      await updateStudent(students);
    } else {
      await addStudent(students);
    }
    navigate("/");
    setEditMode(false);
  };

  return (
    <div className="container mx-auto my-auto w-50">
      <h2>{editMode ? "Update Form" : "Create Form"} </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            name="StudentName"
            className="form-control"
            onChange={handleChange}
            value={students?.StudentName || ""}
            placeholder="Name..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Student Email</label>
          <input
            type="email"
            name="StudentEmail"
            className="form-control"
            onChange={handleChange}
            value={students?.StudentEmail || ""}
            placeholder="Email..."
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <DatePicker
            selected={
              students?.DateOfBirth ? new Date(students.DateOfBirth) : null
            }
            onChange={handleDateChange}
            className="form-control"
            customInput={
              <input style={{ width: "935px", cursor: "pointer" }} />
            }
            placeholderText="Select Date"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            name="StudentGender"
            className="form-control"
            onChange={handleChange}
            value={students?.StudentGender || ""}
          >
            <option value="" disabled>
              Select Student Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editMode ? "Update " : "Add "}
        </button>
      </form>
    </div>
  );
};

export default AddEdit;
