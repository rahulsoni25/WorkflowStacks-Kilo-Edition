import { getPlaybooks } from "@/lib/playbooks";
import { ToolsClient } from "./ToolsClient";

export const metadata = {
  title: "Tools Repository | WorkflowStacks Pro",
  description: "Browse and bundle marketing tools to create your perfect workflow stack",
};

export default function ToolsPage() {
  const playbooks = getPlaybooks();
  return <ToolsClient playbooks={playbooks} />;
}
