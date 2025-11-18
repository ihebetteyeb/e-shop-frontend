import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/routing";
import { useRefreshMutation } from "./store/state/userApiSlice";
import { setCredentials, setToken } from "./store/state/userSlice";

function App() {
  const [fun, { isLoading }] = useRefreshMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      fun().then((res) => {
        if (res.data) {
          console.log(res.data);
          dispatch(setCredentials(res.data.accessToken));
        }
      });
    }
  }, []);

  if (isLoading) {
    return <p> Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<p> Loading...</p>}>
        <Routing />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
