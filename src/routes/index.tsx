import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/sessions",
    element: <div>Session List</div>,
    children: [
      {
        path: "/:sessionId",
        element: <div>Session</div>,
        children: [
          {
            path: "records",
            element: <div>Record List</div>,
            children: [
              {
                path: "/:recordId",
                element: <div>Record</div>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
