export type TopicStatus = "OPEN" | "CLOSED";
export type RegistrationStatus = "NEW" | "CONTACTED";

export interface Lecturer {
  id: number;
  fullName: string;
  title: string;
  department: string;
  email: string;
}

export interface Topic {
  id: number;
  lecturerId: number;
  title: string;
  description: string;
  objectives: string;
  requirements: string;
  technologies: string[];
  maxStudents: number;
  status: TopicStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Registration {
  id: number;
  topicId: number;
  studentName: string;
  studentCode: string;
  studentEmail: string;
  studentPhone: string;
  studentClass: string;
  message: string;
  status: RegistrationStatus;
  createdAt: string;
}

export type TopicInput = Pick<
  Topic,
  "title" | "description" | "objectives" | "requirements" | "technologies" | "maxStudents" | "status"
>;

export type RegistrationInput = Omit<Registration, "id" | "topicId" | "status" | "createdAt">;
