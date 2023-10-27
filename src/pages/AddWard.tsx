import axios from "axios";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFormInputChange, resetForm } from "../redux/slicies/ward";
import { RootState } from "../redux/store";

const AddWard = () => {
  const dispatch = useDispatch();

  const formData = useSelector((state: RootState) => state.ward.formData);
  const { wardNumber, capacity, specializations } = formData;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    dispatch(handleFormInputChange({ name, value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(baseUrl + "ward", { ...formData });
    if (response.status === 200) {
      alert("Ward registered");
      dispatch(resetForm());
    }
  };
  return (
    <div className="addPatient">
      <h1>Add Ward</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Ward Number <br />
          <input
            type="number"
            name="wardNumber"
            onChange={(e) => handleInputChange(e)}
            value={wardNumber}
          />
        </label>{" "}
        <label htmlFor="">
          Capacity <br />
          <input
            type="number"
            name="capacity"
            onChange={(e) => handleInputChange(e)}
            value={capacity}
          />
        </label>
        <label htmlFor="">
          Specializations <br />
          <input
            type="text"
            name="specializations"
            onChange={(e) => handleInputChange(e)}
            value={specializations}
          />
        </label>
        <button className="btn">Register</button>
      </form>
    </div>
  );
};

export default AddWard;
