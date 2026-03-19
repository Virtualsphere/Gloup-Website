import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css"; // Tailwind must be imported here
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();


// Optional providers (kept commented as requested)
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./redux/store";

const root = createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  <StrictMode>
    {/* Uncomment below when needed */}
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}

      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
          <App />
        {/* </PersistGate>
      </Provider> */}

    {/* </GoogleOAuthProvider> */}
  </StrictMode>
  </BrowserRouter>
  </QueryClientProvider>
);
