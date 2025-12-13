import { apiClient } from './apiClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const BASE_PATH = 'courses';

export type CreateCourseRequest = {
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  price: number;
};

export type Course = {
  id: number;
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  currentStudents: number;
  availableSeats: number;
  isFull: boolean;
  price: number;
  createdAt: string;
};

export const courses = {
  postCourse: async (courseData: CreateCourseRequest) => {
    const data = await apiClient.post<Course>(BASE_PATH, courseData);

    if (!data) throw new Error('강의 개설 응답이 없습니다');

    return data;
  },

  getCourses: async () => {
    const data = await apiClient.get<Course[]>(BASE_PATH);

    if (!data) throw new Error('강의 목록 조회 응답이 없습니다');

    return data;
  },
};

export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...courseKeys.lists(), filters] as const,
};

export const useCoursesQuery = () => {
  return useQuery({
    queryKey: courseKeys.lists(),
    queryFn: () => courses.getCourses(),
  });
};

export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseRequest) => courses.postCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
    },
  });
};
