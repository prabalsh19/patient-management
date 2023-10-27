import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { Ward } from "../utils/types";
import { useEffect } from "react";
import { deleteWard, getWards } from "../redux/slicies/ward";

const Ward = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.ward.status);

  const wards = useSelector((state: RootState) => state.ward.wards);
  useEffect(() => {
    if (status === "idle") dispatch(getWards());
  }, [status]);

  const handleDelete = (id: string) => {
    dispatch(deleteWard(id));
  };
  console.log(wards);
  return (
    <div className="ward">
      <h1> Ward</h1>
      <button className="btn" onClick={() => navigate("add")}>
        Add Ward
      </button>
      {wards.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Ward Number</th>
              <th>Specializations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wards.map((ward: Ward) => (
              <tr key={ward._id}>
                <td>{ward.wardNumber}</td>

                <td>{ward.specializations}</td>

                <td>
                  <button
                    className="btn"
                    onClick={() => navigate(ward._id!, { state: ward })}
                  >
                    View
                  </button>
                  <button
                    className="btn"
                    onClick={() => navigate("edit", { state: ward })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleDelete(ward._id!)}
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

export default Ward;
