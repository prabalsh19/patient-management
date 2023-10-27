import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Patient from "./pages/Patient.tsx";
import Ward from "./pages/Ward.tsx";
import AddPatient from "./pages/AddPatient.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import PatientDetails from "./pages/PatientDetails.tsx";
import EditPatient from "./pages/EditPatient.tsx";
import AddWard from "./pages/AddWard.tsx";
import WardDetails from "./pages/WardDetails.tsx";
import EditWard from "./pages/EditWard.tsx";
import Hospital from "./pages/Hospital.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hospital />,
      },
      {
        path: "/ward",
        element: <Ward />,
      },
      {
        path: "/ward/add",
        element: <AddWard />,
      },
      {
        path: "/ward/edit",
        element: <EditWard />,
      },
      {
        path: "/ward/:id",
        element: <WardDetails />,
      },
      {
        path: "/patient",
        element: <Patient />,
      },
      {
        path: "/patient/:id",
        element: <PatientDetails />,
      },
      {
        path: "/patient/add",
        element: <AddPatient />,
      },
      {
        path: "/patient/edit",
        element: <EditPatient />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
