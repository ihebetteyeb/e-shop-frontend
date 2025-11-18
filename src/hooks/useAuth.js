import { useSelector } from "react-redux";

function useAuth() {
  const userReducer = useSelector((state) => state.auth);

  console.log("this is token from useAuth " + userReducer.token);

  return { token: userReducer.token };
}

export default useAuth;
