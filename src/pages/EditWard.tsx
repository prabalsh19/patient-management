import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editWard,
  handleFormInputChange,
  resetForm,
} from "../redux/slicies/ward";
import { AppDispatch, RootState } from "../redux/store";
import { useLocation, useNavigate } from "react-router-dom";

const EditWard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ward = useLocation().state;
  const navigate = useNavigate();

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
    const response = await dispatch(
      editWard({
        id: ward._id,
        newWard: {
          wardNumber,
          capacity,
          specializations,
        },
      })
    );

    if (response.payload.success) {
      alert("Ward updated");
      dispatch(resetForm());
      navigate("/ward");
    }
  };

  useEffect(() => {
    const wardInfo = {
      wardNumber: ward.wardNumber,
      capacity: ward.capacity,
      specializations: ward.specializations,
    };
    const value = Object.entries(wardInfo);

    value.forEach((v) => {
      dispatch(handleFormInputChange({ name: v[0], value: v[1] }));
    });

    return () => {
      dispatch(resetForm());
    };
  }, []);

  return (
    <div className="addPatient">
      <h1>Edit Ward</h1>
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
        <button className="btn">Update</button>
      </form>
    </div>
  );
};

export default EditWard;
