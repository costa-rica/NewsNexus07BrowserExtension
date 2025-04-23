import Login from "./Login";
import AddArticle from "./AddArticle";
import styles from "../styles/Popup.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStateArray } from "../reducers/user";
export default function Popup() {
  const userReducer = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchStateArray();
  }, []);
  const fetchStateArray = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/states`
      );

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text(); // Log response text for debugging
        throw new Error(`Server Error: ${errorText}`);
      }

      const result = await response.json();
      console.log("Fetched Data (states):", result);

      if (result.statesArray && Array.isArray(result.statesArray)) {
        const tempStatesArray = result.statesArray.map((stateObj) => ({
          ...stateObj,
          selected: false,
        }));
        dispatch(updateStateArray(tempStatesArray));
      } else {
        dispatch(updateStateArray([]));
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // dispatch(updateStateArray([]));
    }
  };

  return (
    <div className={styles.divMain}>
      {userReducer.stateArray.length > 0 && userReducer.token ? (
        <AddArticle />
      ) : (
        <Login />
      )}
    </div>
  );
}
