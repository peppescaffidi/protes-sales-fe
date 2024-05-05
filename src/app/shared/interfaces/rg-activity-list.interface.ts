// TODO: Creare un'interfaccia ad hoc per gli ospedali con onekey, name e cluster
export interface RgActivityList {
  activityId: number;
  onekey: string;
  cluster: string;
  name: string;
  selected?: boolean;
}
