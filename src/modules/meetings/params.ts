import { createLoader } from "nuqs/server";

import { meetingsFiltersParsers } from "./filters";

export const loadSearchParams = createLoader(meetingsFiltersParsers);
