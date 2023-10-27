import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWards } from "../redux/slicies/ward";
import { AppDispatch, RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { Ward } from "../utils/types";

const WardDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.ward.status);
  const wards = useSelector((state: RootState) => state.ward.wards);

  const { id } = useParams();
  const ward: Ward | undefined = wards.find((p) => p._id === id);

  useEffect(() => {
    if (status === "idle") dispatch(getWards());
  }, [status]);

  return (
    <div>
      {ward ? (
        <>
          <h1>Ward Details</h1>
          <p>
            <b> Ward Number:</b> {ward?.wardNumber}
          </p>
          <p>
            <b> Capacity:</b> {ward?.capacity}
          </p>
          <p>
            <b> Specializations:</b> {ward?.specializations}
          </p>
        </>
      ) : (
        status !== "loading" && <p>Ward Not Found.</p>
      )}
    </div>
  );
};

export default WardDetails;
