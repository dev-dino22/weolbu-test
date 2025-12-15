import { createQueryString, joinAsPath } from '@utils/createUrl';
import { apiClient } from './apiClient';

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
    const data = await apiClient.get<Course>(
      joinAsPath(BASE_PATH, courseId.toString())
    );

    if (!data) throw new Error('강의 상세 조회 응답이 없습니다');

    return data;
  },

  postEnroll: async (courseId: number) => {
    const data = await apiClient.post<EnrollResponse>(
      joinAsPath(BASE_PATH, courseId.toString(), 'enroll')
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
