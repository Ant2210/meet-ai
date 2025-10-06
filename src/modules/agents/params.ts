import { createLoader } from "nuqs/server";

import { agentsFiltersParsers } from "./filters";

export const loadSearchParams = createLoader(agentsFiltersParsers);
