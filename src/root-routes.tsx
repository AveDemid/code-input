import React from "react";
import { renderRoutes } from "react-router-config";
import { routes } from "@pages/index";

export const RootRoutes = () => <>{renderRoutes(routes())}</>;
