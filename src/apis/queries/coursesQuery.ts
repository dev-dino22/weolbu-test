import {
  courses,
  type BatchEnrollRequest,
  type CourseListParams,
  type CreateCourseRequest,
} from '@apis/courses';
import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (filters?: CourseListParams) =>
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
