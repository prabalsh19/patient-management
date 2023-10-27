import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../redux/slicies/patient";
import { AppDispatch, RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { Patient } from "../utils/types";

const PatientDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.patient.status);
  const patients = useSelector((state: RootState) => state.patient.patients);

  const { id } = useParams();
  const patient: Patient | undefined = patients.find((p) => p._id === id);

  useEffect(() => {
    if (status === "idle") dispatch(getPatients());
  }, [status]);

  return (
    <div>
      {patient ? (
        <>
          <h1>Patient Details</h1>
          <p>
            <b> Name:</b> {patient?.name}
          </p>
          <p>
            <b> Age:</b> {patient?.age}
          </p>
          <p>
            <b> Gender:</b> {patient?.gender}
          </p>
          <p>
            <b> Assigned Ward:</b> {patient?.assignedWard}
          </p>
          <p>
            <b> Email:</b> {patient?.email}
          </p>
          <p>
            <b> Phone:</b> {patient?.phone}
          </p>
          <p>
            <b> Medical History:</b> {patient?.medicalHistory}
          </p>
        </>
      ) : (
        status !== "loading" && <p>Patient Not Found.</p>
      )}
    </div>
  );
};

export default PatientDetails;
