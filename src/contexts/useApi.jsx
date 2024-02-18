import { useContext } from "react";
import ApiContext from "./ApiContext";

function useApi() {
  return useContext(ApiContext);
}

export default useApi;
