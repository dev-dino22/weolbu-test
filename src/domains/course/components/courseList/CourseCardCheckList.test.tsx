import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CourseCardCheckList from './CourseCardCheckList';
import { CheckCoursesProvider } from '../../context/CheckCoursesContext';
import type { CourseListResponse } from '@apis/courses';
import { ThemeProvider } from '@emotion/react';
import userEvent from '@testing-library/user-event';
import { THEME } from '@styles/global';

vi.mock('./courseCard/CourseCard', () => ({
  default: ({ course }: { course: { id: number; title: string } }) => (
    <div data-testid={`course-card-${course.id}`}>{course.title}</div>
  ),
}));

describe('CourseCardCheckList', () => {
  const mockPages: CourseListResponse[] = [
    {
      content: [
        {
          id: 1,
          title: '강의 1',
          description: '설명 1',
          instructorName: '강사 1',
          price: 10000,
          maxStudents: 30,
          currentStudents: 10,
          availableSeats: 20,
          isFull: false,
          createdAt: '2025-01-01',
        },
        {
          id: 2,
          title: '강의 2',
          description: '설명 2',
          instructorName: '강사 2',
          price: 20000,
          maxStudents: 20,
          currentStudents: 15,
          availableSeats: 5,
          isFull: false,
          createdAt: '2025-01-02',
        },
        {
          id: 3,
          title: '강의 3 (마감)',
          description: '설명 3',
          instructorName: '강사 3',
          price: 30000,
          maxStudents: 10,
          currentStudents: 10,
          availableSeats: 0,
          isFull: true,
          createdAt: '2025-01-03',
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 10,
      },
      totalElements: 3,
      totalPages: 1,
      first: true,
      last: true,
    },
  ];

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={THEME}>
        <CheckCoursesProvider>{component}</CheckCoursesProvider>
      </ThemeProvider>
    );
  };

  it('체크박스를 클릭하면 체크 상태가 변경된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CourseCardCheckList pages={mockPages} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const checkbox1 = checkboxes[0];
    expect(checkbox1).not.toBeChecked();

    await user.click(checkbox1);
    expect(checkbox1).toBeChecked();

    await user.click(checkbox1);
    expect(checkbox1).not.toBeChecked();
  });

  it('여러 강의를 체크하면 모두 체크 상태가 유지된다', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CourseCardCheckList pages={mockPages} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const checkbox1 = checkboxes[0];
    const checkbox2 = checkboxes[1];

    await user.click(checkbox1);
    await user.click(checkbox2);

    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
  });

  it('마감된 강의의 체크박스는 비활성화된다', () => {
    renderWithProviders(<CourseCardCheckList pages={mockPages} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const checkbox3 = checkboxes[2];
    expect(checkbox3).toBeDisabled();
  });

  it('페이지에 있는 모든 강의가 렌더링된다', () => {
    renderWithProviders(<CourseCardCheckList pages={mockPages} />);

    expect(screen.getByTestId('course-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('course-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('course-card-3')).toBeInTheDocument();
    expect(screen.getByText('강의 1')).toBeInTheDocument();
    expect(screen.getByText('강의 2')).toBeInTheDocument();
    expect(screen.getByText('강의 3 (마감)')).toBeInTheDocument();
  });
});
