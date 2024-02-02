import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "../features/studentSlice";
import moment from "moment";
import { NavLink } from "react-router-dom";


const Read = () => {
  const {
    data: students,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetStudentsQuery();

  console.log("data", students);

  const [deleteStudent] = useDeleteStudentMutation();

  return (
    <div className="container mx-auto">
      <h2>Read Operation</h2>
      <div className="row">
        {isLoading && <span>Loading..</span>}
        {isError && <span>Something went wrong</span>}
        {isSuccess &&
          students?.map((student: any) => (
            <div key={student?.id} className="col-4">
              <div className="card">
                <div className="card-body" style={{ display: "flex" }}>
                  <div className="col-3">
                    <h5 className="card-title">{student?.StudentName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {student?.StudentEmail}
                    </h6>
                  </div>
                  <div
                    className="col-1"
                    style={{ borderRight: "1px solid #ccc", margin: "0 10px" }}
                  ></div>
                  <div className="col-3">
                    <p>{moment(student?.DateOfBirth).format("DD/MM/YYYY")}</p>
                    <p>{student?.StudentGender}</p>
                  </div>
                  <div
                    className="col-1"
                    style={{ borderRight: "1px solid #ccc", margin: "0 10px" }}
                  ></div>
                  <div className="col-2 " style={{ margin: "0 10px" }}>
                    <button
                      className="card-link"
                      onClick={() => deleteStudent(student?.id)}
                    >
                      Delete
                    </button>
                    <button className="card-link mt-2">
                      <NavLink to={`edit/${student?.id}`}>Edit</NavLink>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Read;
