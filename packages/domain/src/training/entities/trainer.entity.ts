export interface TrainerGradeData {
  id: string;
  name: string;
}

export interface TrainerData {
  id: string;
  firstName: string;
  lastName: string;
  photo: string | null;
  grade: TrainerGradeData;
  exerciseDirections: Record<string, unknown>[];
  bio: string | null;
}
