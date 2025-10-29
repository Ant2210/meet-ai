import { useQueryStates } from "nuqs";

import { meetingsFiltersParsers } from "../filters";

export const useMeetingsFilters = () => {
  return useQueryStates(meetingsFiltersParsers);
};
