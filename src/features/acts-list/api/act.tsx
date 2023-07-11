import acts from "./acts.json";
import type { ActType } from "../types";

export async function getAllActs(): Promise<ActType[]> {
  const result = await new Promise<ActType[]>((resolve) => {
    setTimeout(() => {
      resolve(acts as ActType[]);
    }, 1000);
  });

  return result;
}

export async function getAct(id: string): Promise<ActType | undefined> {
  const result = await new Promise<ActType | undefined>((resolve) => {
    setTimeout(() => {
      const foundAct = acts.find((act) => act.id === id);
      resolve(foundAct as ActType);
    }, 1000);
  });

  return result;
}
