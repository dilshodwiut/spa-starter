import inspectors from "./inspectors.json";
import type { InspectorType } from "../types";

export async function getAllInspectors(): Promise<InspectorType[]> {
  const result = await new Promise<InspectorType[]>((resolve) => {
    setTimeout(() => {
      resolve(inspectors as InspectorType[]);
    }, 0);
  });

  return result;
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
