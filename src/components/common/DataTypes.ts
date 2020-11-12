export interface CourseFormFields {
  title: string;
  authorId: string;
  category: string;
}

export interface CourseData {
  id: number;
  title: string;
  authorId: number;
  category: string;
  slug: string;
}

export const EmptyCourse: CourseData = {
  id: 0,
  title: '',
  authorId: 0,
  category: '',
  slug: '',
}

export interface AuthorData {
  id: number;
  name: string;
}

export const EmptyAuthor: AuthorData = {
    id: 0,
    name: ''
}
