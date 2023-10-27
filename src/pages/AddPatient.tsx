import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatient,
  handleFormInputChange,
  resetForm,
} from "../redux/slicies/patient";
import { AppDispatch, RootState } from "../redux/store";

const AddPatient = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formData = useSelector((state: RootState) => state.patient.formData);
  const { name, age, gender, medicalHistory, assignedWard, phone, email } =
    formData;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    dispatch(handleFormInputChange({ name, value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(
      addPatient({
        name,
        age,
        gender,
        medicalHistory,
        assignedWard: Number(assignedWard),
        phone,
        email,
      })
    );
    if (response.payload.success) {
      alert("Patient registered");
      dispatch(resetForm());
    }
  };
  return (
    <div className="addPatient">
      <h1>Add Patient</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Name <br />
          <input
            type="text"
            name="name"
            onChange={(e) => handleInputChange(e)}
            value={name}
          />
        </label>{" "}
        <label htmlFor="">
          Age <br />
          <input
            type="number"
            name="age"
            onChange={(e) => handleInputChange(e)}
            value={age}
          />
        </label>
        <label htmlFor="">
          Gender <br />
          <select
            name="gender"
            onChange={(e) => handleInputChange(e)}
            value={gender}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="trans">Trans</option>
          </select>
        </label>
        <label htmlFor="">
          Medical History <br />
          <input
            type="text"
            name="medicalHistory"
            value={medicalHistory}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label htmlFor="">
          Email <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label htmlFor="">
          Phone <br />
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label htmlFor="">
          Ward Assigned <br />
          <input
            type="number"
            name="assignedWard"
            value={assignedWard}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <button className="btn">Register</button>
      </form>
    </div>
  );
};

export default AddPatient;
