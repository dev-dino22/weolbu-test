import { apiClient } from './apiClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createQueryString } from '@utils/createUrl';

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

export type CourseSortType = 'recent' | 'popular' | 'rate';

export type CourseListParams = {
  page?: number;
  size?: number;
  sort?: CourseSortType;
};

export type CourseListResponse = {
  content: Course[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export const courses = {
  postCourse: async (courseData: CreateCourseRequest) => {
    const data = await apiClient.post<Course>(BASE_PATH, courseData);

    if (!data) throw new Error('강의 개설 응답이 없습니다');

    return data;
  },

  getCourses: async (params: CourseListParams = {}) => {
    const { page = 0, size = 10, sort = 'recent' } = params;

    const queryString = createQueryString({
      page: String(page),
      size: String(size),
      sort,
    });

    const data = await apiClient.get<CourseListResponse>(
      `${BASE_PATH}${queryString}`
    );

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

export const coursesQuery = {
  useCoursesQuery: () => {
    return useQuery({
      queryKey: courseKeys.lists(),
      queryFn: () => courses.getCourses(),
    });
  },
  useCreateCourseMutation: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: CreateCourseRequest) => courses.postCourse(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      },
    });
  },
};
