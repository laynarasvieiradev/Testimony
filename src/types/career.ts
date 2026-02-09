export interface Career {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

export interface CreateCareerPostRequest {
  username: string;
  title: string;
  content: string;
}

export interface updateCareerPostRequest {
  title: string;
  content: string;
}
