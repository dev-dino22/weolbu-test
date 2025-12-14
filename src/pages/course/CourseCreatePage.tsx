import Button from '@components/actions/Button';
import UncontrolledInput from '@components/actions/Input/UncontrolledInput';
import styled from '@emotion/styled';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@routes/routePath';
import { useShowToast } from '@components/toast/ToastProvider';
import { ApiError } from '@apis/apiClient';
import { coursesQuery } from '@apis/courses';
import { courseCreateFormRules } from '@domains/course/validation';

type CourseFormData = {
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  price: number;
};

function CourseCreatePage() {
  const navigate = useNavigate();
  const showToast = useShowToast();
  const createCourseMutation = coursesQuery.useCreateCourseMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<CourseFormData> = async data => {
    try {
      await createCourseMutation.mutateAsync({
        title: data.title,
        description: data.description,
        instructorName: data.instructorName,
        maxStudents: Number(data.maxStudents),
        price: Number(data.price),
      });

      showToast({
        mode: 'SUCCESS',
        message: '강의가 개설되었습니다!',
      });
      navigate(ROUTE_PATH.COURSE_ENROLL);
    } catch (error) {
      if (error instanceof ApiError && error.body) {
        const errorMessage = (error.body as { message?: string }).message;
        showToast({
          mode: 'ERROR',
          message: errorMessage || '강의 개설에 실패했습니다.',
        });
      } else {
        showToast({
          mode: 'ERROR',
          message: '강의 개설에 실패했습니다. 다시 시도해주세요.',
        });
      }
    }
  };

  return (
    <S.Container>
      <S.Title>강의 개설</S.Title>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <UncontrolledInput
          label="강의명"
          placeholder="React 기초 마스터"
          required
          error={!!errors.title}
          feedbackMessage={errors.title?.message}
          {...register('title', courseCreateFormRules.title)}
        />
        <UncontrolledInput
          label="강의 설명"
          placeholder="React의 기본 개념부터 Hooks까지 배웁니다."
          error={!!errors.description}
          feedbackMessage={errors.description?.message}
          {...register('description', courseCreateFormRules.description)}
        />
        <UncontrolledInput
          label="강사명"
          placeholder="김강사"
          required
          error={!!errors.instructorName}
          feedbackMessage={errors.instructorName?.message}
          {...register('instructorName', courseCreateFormRules.instructorName)}
        />
        <UncontrolledInput
          label="최대 수강 인원"
          placeholder="30"
          type="number"
          required
          error={!!errors.maxStudents}
          feedbackMessage={errors.maxStudents?.message}
          {...register('maxStudents', courseCreateFormRules.maxStudents)}
        />
        <UncontrolledInput
          label="가격 (원)"
          placeholder="100,000"
          type="text"
          required
          error={!!errors.price}
          feedbackMessage={errors.price?.message}
          {...register('price', courseCreateFormRules.price)}
        />
        <S.ButtonGroup>
          <Button
            type="button"
            size="lg"
            variant="outlined"
            onClick={() => navigate(ROUTE_PATH.MAIN)}
          >
            취소
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={createCourseMutation.isPending}
          >
            {createCourseMutation.isPending ? '등록 중...' : '등록하기'}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
}

export default CourseCreatePage;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.LAYOUT.headerHeight}
      ${({ theme }) => theme.PADDING.p8};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  Form: styled.form`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level2};
  `,
  ButtonGroup: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level4};

    margin-top: ${({ theme }) => theme.GAP.level4};

    > button {
      flex: 1;
    }
  `,
};
