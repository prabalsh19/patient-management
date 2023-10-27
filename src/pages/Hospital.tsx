import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { updateHospitalStats } from "../redux/slicies/hospital";
import { getPatients } from "../redux/slicies/patient";
import { getWards } from "../redux/slicies/ward";

const Hospital = () => {
  const totalPatients = useSelector(
    (state: RootState) => state.hospital.totalPatients
  );
  const occupancyRate = useSelector(
    (state: RootState) => state.hospital.occupancyRate
  );
  const averageStay = useSelector(
    (state: RootState) => state.hospital.averageStay
  );
  const topWard = useSelector((state: RootState) => state.hospital.topWard);
  const patients = useSelector((state: RootState) => state.patient.patients);
  const wards = useSelector((state: RootState) => state.ward.wards);
  const patientStatus = useSelector((state: RootState) => state.patient.status);
  const wardStatus = useSelector((state: RootState) => state.ward.status);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      if (patientStatus === "idle") {
        await dispatch(getPatients());
      }
      if (wardStatus === "idle") {
        await dispatch(getWards());
      }
    })();
    const totalPatients = patients.length;
    if (wards.length > 0) {
      const totalCapacity = wards?.reduce(
        (total, ward) => total + ward.capacity,
        0
      );
      const occupancyRate = (totalPatients / totalCapacity) * 100;
      const averageStay = 15;
      const topWard = wards?.reduce((topWard, ward) =>
        ward.capacity > topWard.capacity ? ward : topWard
      );
      dispatch(
        updateHospitalStats({
          totalPatients,
          occupancyRate,
          averageStay,
          topWard: topWard.wardNumber,
        })
      );
    }
  }, [patientStatus, wardStatus, wards, patients]);

  return (
    <div className="hospital">
      <h1>Hospital</h1>

      <h3>Total Patients: {totalPatients}</h3>
      <h3>Occupancy Rate: {occupancyRate.toFixed(2)}%</h3>
      <h3>Average Stay: {averageStay} days</h3>
      <h3>Top Ward Number: {topWard}</h3>
    </div>
  );
};

export default Hospital;
