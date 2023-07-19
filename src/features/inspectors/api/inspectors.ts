import inspectors from "./inspectors.json";
import type { InspectorType } from "../types";

export function getAllInspectors(): InspectorType[] {
  return inspectors as InspectorType[];
}

export async function getInspector(
  id: string,
): Promise<InspectorType | undefined> {
  const result = await new Promise<InspectorType | undefined>((resolve) => {
    setTimeout(() => {
      const foundAct = inspectors.find((act) => act.id === id);
      resolve(foundAct as InspectorType);
    }, 1000);
  });

  return result;
}
