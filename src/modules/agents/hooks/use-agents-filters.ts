import { useQueryStates } from "nuqs";

import { agentsFiltersParsers } from "../filters";

export const useAgentsFilters = () => {
  return useQueryStates(agentsFiltersParsers);
};
