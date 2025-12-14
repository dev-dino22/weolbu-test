import { createContext, useCallback, useContext, useState } from 'react';

type CheckCoursesContextValue = {
  selectedCourseIds: Set<number>;
  toggleSelection: (courseId: number, checked: boolean) => void;
  clearSelection: () => void;
  setFailedCourses: (courseIds: number[]) => void;
};

const CheckCoursesContext = createContext<CheckCoursesContextValue | null>(
  null
);

export function CheckCoursesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<number>>(
    new Set()
  );

  const toggleSelection = useCallback((courseId: number, checked: boolean) => {
    setSelectedCourseIds(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(courseId);
      } else {
        newSet.delete(courseId);
      }
      return newSet;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCourseIds(new Set());
  }, []);

  const setFailedCourses = useCallback((courseIds: number[]) => {
    setSelectedCourseIds(new Set(courseIds));
  }, []);

  const value = {
    selectedCourseIds,
    toggleSelection,
    clearSelection,
    setFailedCourses,
  };

  return (
    <CheckCoursesContext.Provider value={value}>
      {children}
    </CheckCoursesContext.Provider>
  );
}

export function useCheckCourses() {
  const context = useContext(CheckCoursesContext);
  if (!context) {
    throw new Error(
      'useCheckCourses 훅은 CheckCoursesProvider 내부에서만 사용해주세요.'
    );
  }
  return context;
}
