import { createBrowserRouter } from "react-router-dom";
import { RecordAnalysis } from "../features/record";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/sessions",
    element: <div>Session List</div>,
  },
  {
    path: "/sessions/:sessionId/records",
    element: <div>Record List</div>,
  },
  {
    path: "/sessions/:sessionId/records/:recordId",
    element: <RecordAnalysis />,
  },
]);
