import { useParams } from "react-router-dom";
import { useGetPersonByIdQuery } from "../api/PixemaAPI";
import "./SelectedPerson.scss";

const SelectedPerson = () => {
  const params = useParams();
  const { data, isFetching } = useGetPersonByIdQuery(params.id);
  const { name } = { ...data };
  return <>{!isFetching && <div style={{ color: "white" }}>{name}</div>}</>;
};

export default SelectedPerson;
