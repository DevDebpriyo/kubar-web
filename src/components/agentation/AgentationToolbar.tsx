"use client";

import { Agentation } from "agentation";

/**
 * Local-only visual feedback toolbar.
 *
 * The MCP server is deliberately bound to localhost so annotations never reach
 * production or a public deployment.
 */
export function AgentationToolbar() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return <Agentation endpoint="http://localhost:4747" />;
}
