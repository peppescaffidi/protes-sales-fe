export interface RgActivityPlanInterface {
  id: number;
  name: string;
  inclusionStepsInvolved: string;
  expectedDate: string;
  criticalIssue: string;
  owner: string;
  stakeholder: string;
  notes: RgActivityPlanNotes[];
  notesLength: number,
  status: string;
  isNational: boolean;
}

interface RgActivityPlanNotes {
  title: string;
  description: string;
  date: string;
}
