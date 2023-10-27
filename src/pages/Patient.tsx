import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePatient, getPatients } from "../redux/slicies/patient";
import { AppDispatch, RootState } from "../redux/store";
import { Patient } from "../utils/types";

const Patient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.patient.status);
  const patients = useSelector((state: RootState) => state.patient.patients);

  useEffect(() => {
    if (status === "idle") dispatch(getPatients());
  }, [status]);

  const handleDelete = (id: string) => {
    dispatch(deletePatient(id));
  };

  return (
    <div className="patient">
      <h1>Patients</h1>
      <button className="btn" onClick={() => navigate("add")}>
        Add Patient
      </button>
      {patients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Ward</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient: Patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.assignedWard}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => navigate(patient._id!, { state: patient })}
                  >
                    View
                  </button>
                  <button
                    className="btn"
                    onClick={() => navigate("edit", { state: patient })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleDelete(patient._id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Patient;
