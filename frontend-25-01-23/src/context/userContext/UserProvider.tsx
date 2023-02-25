import {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { UserReducer } from "./UserReducer";
// import jwt_decode from "jwt-decode";
import { T } from "./Interfaces";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UserProvider = ({ children }: Props) => {
  let USER = "USER";


  const [oneUser, setOneUser] = useState({});

  const [state, dispatch] = useReducer(UserReducer, {
    datos: [],
    oneUser: null,
  });

  //* API call
  const fetchApi = useCallback(async () => {
    await fetch("http://localhost:4100/api/users")
      .then((response) => response.json())
      .then((data) => {
        // Envía la acción de carga de datos al reducer
        dispatch({
          type: "LOAD_DATA",
          payload: data,
        });
      });
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  //* View User info
  const loadUser = useCallback(async (id: T) => {
    try {
      //* const userIdObject = new mongoose.Types.ObjectId(id);

      const result = await axios.get(`http://localhost:4100/api/users/${id}`);
      console.log(result);
      const userData = JSON.parse(JSON.stringify(result.data));
      localStorage.setItem("userData", JSON.stringify(userData));
      setOneUser(userData);
    } catch (error) {
      console.log(error);
      alert("User with this code is not in the database");
    };
  }, []);

  //* DeactivateUser
  const deactivateUser = useCallback(async (id: T, password: string) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios
        .patch(
          `http://localhost:4100/api/users/${id}`,
          { active: false, password },
          {
            headers: {
              // "Content-Type": "application/json",
              authtoken: token,
            },
          }
        )
        .then((res) => {
          //  window.localStorage.setItem(USER, JSON.stringify(res.data));
          window.localStorage.removeItem(USER);
          window.localStorage.removeItem("authToken");

          alert("User deleted!");
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          alert("An error has occurred!");
        });
    } catch (error) {
      console.error(error);
      alert("An error has occurred..");
    }
  }, []);

  //* Modify User
  const ModifyUser = useCallback(async (id: T, formData: any) => {

    try {
      const token = localStorage.getItem("authToken");
      await axios
        .put(`http://localhost:4100/api/users/${id}`, formData, {
          headers: {
            // "Content-Type": "application/json",
            authtoken: token,
          },
        })
        .then((response) => {
       
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      alert("An error has occurred..");
    }
  }, []);

  //* Delete a User
  const deleteUser = useCallback(async (idAdmin: T, idUser: T) => {
 
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4100/api/users/${idAdmin}/${idUser}`,
        {
          headers: {
            authtoken: token
          }
        }
      ).then((response) => {
    window.location.reload();
        // alert("Deleted the account successfully");
      }).catch((error) => {
              alert("There has been an error..");

        console.error(error);
      });
    } catch (error) {
      alert("There has been an error!");
      console.log(error);
    };
  }, []);


  return (
    <>
      <GlobalContext.Provider
        value={{ state, ModifyUser, loadUser, deactivateUser, deleteUser }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
};
