// import { Routes, Route } from "react-router-dom";
// import React, { lazy, Suspense } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// const routesConfig = [
//     { path: "/", component: lazy(() => import("../pages/Home")) },
//     { path: "*", component: lazy(() => import("../pages/NotFound")) },
// ];

// const RoutesList = () => (
//     <Suspense
//         fallback={
//             <div className="loading-icon">
//                 <FontAwesomeIcon icon={faSpinner} spin />
//             </div>
//         }
//     >
//         <Routes>
//             {routesConfig.map((route) => (
//                 <Route
//                     key={route.path}
//                     path={route.path}
//                     element={<route.component />}
//                 />
//             ))}
//         </Routes>
//     </Suspense>
// );

// export default RoutesList;
