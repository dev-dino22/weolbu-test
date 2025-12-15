import { apiClient } from './apiClient';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
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

export type BatchEnrollRequest = {
  courseIds: number[];
};

export type EnrollResponse = {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
};

export type EnrollmentSuccess = {
  enrollmentId: number;
  courseId: number;
  courseTitle: string;
};

export type EnrollmentFailed = {
  courseId: number;
  reason: string;
};

export type BatchEnrollResponse = {
  success: EnrollmentSuccess[];
  failed: EnrollmentFailed[];
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

  getCourseDetail: async (courseId: number) => {
    const data = await apiClient.get<Course>(`${BASE_PATH}/${courseId}`);

    if (!data) throw new Error('강의 상세 조회 응답이 없습니다');

    return data;
  },

  postEnroll: async (courseId: number) => {
    const data = await apiClient.post<EnrollResponse>(
      `${BASE_PATH}/${courseId}/enroll`,
      {}
    );

    if (!data) throw new Error('수강 신청 응답이 없습니다');

    return data;
  },

  postBatchEnroll: async (enrollData: BatchEnrollRequest) => {
    const data = await apiClient.post<BatchEnrollResponse>(
      'enrollments/batch',
      enrollData
    );

    if (!data) throw new Error('수강 신청 응답이 없습니다');

    return data;
  },
};

export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...courseKeys.lists(), filters] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: number) => [...courseKeys.details(), id] as const,
};

export const coursesQuery = {
  useCoursesSuspenseQuery: () => {
    return useSuspenseQuery({
      queryKey: courseKeys.lists(),
      queryFn: () => courses.getCourses(),
    });
  },
  useCourseDetailSuspenseQuery: (courseId: number) => {
    return useSuspenseQuery({
      queryKey: courseKeys.detail(courseId),
      queryFn: () => courses.getCourseDetail(courseId),
    });
  },
  useCoursesInfiniteQuery: (params?: CourseListParams) => {
    const { size = 10, sort = 'recent' } = params || {};

    return useSuspenseInfiniteQuery({
      queryKey: courseKeys.list({ size, sort }),
      queryFn: ({ pageParam = 0 }) =>
        courses.getCourses({ page: pageParam, size, sort }),
      getNextPageParam: lastPage => {
        if (lastPage.last) return undefined;
        return lastPage.pageable.pageNumber + 1;
      },
      initialPageParam: 0,
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
  useEnrollMutation: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (courseId: number) => courses.postEnroll(courseId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      },
    });
  },
  useBatchEnrollMutation: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: BatchEnrollRequest) => courses.postBatchEnroll(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      },
    });
  },
};
