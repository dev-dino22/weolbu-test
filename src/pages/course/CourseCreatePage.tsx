import Button from '@components/actions/Button';
import UncontrolledInput from '@components/actions/Input/UncontrolledInput';
import styled from '@emotion/styled';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ROUTE_PATH } from '@routes/routePath';
import { useShowToast } from '@components/toast/ToastProvider';
import { ApiError } from '@apis/apiClient';
import { coursesQuery } from '@apis/courses';

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

  const formatNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
          {...register('title', {
            required: '강의명을 입력해주세요',
            minLength: {
              value: 2,
              message: '강의명은 최소 2자 이상이어야 합니다',
            },
            maxLength: {
              value: 100,
              message: '강의명은 최대 100자까지 입력 가능합니다',
            },
          })}
        />
        <UncontrolledInput
          label="강의 설명"
          placeholder="React의 기본 개념부터 Hooks까지 배웁니다."
          error={!!errors.description}
          feedbackMessage={errors.description?.message}
          {...register('description', {
            maxLength: {
              value: 500,
              message: '강의 설명은 최대 500자까지 입력 가능합니다',
            },
          })}
        />
        <UncontrolledInput
          label="강사명"
          placeholder="김강사"
          required
          error={!!errors.instructorName}
          feedbackMessage={errors.instructorName?.message}
          {...register('instructorName', {
            required: '강사명을 입력해주세요',
            minLength: {
              value: 2,
              message: '강사명은 최소 2자 이상이어야 합니다',
            },
          })}
        />
        <UncontrolledInput
          label="최대 수강 인원"
          placeholder="30"
          type="number"
          required
          error={!!errors.maxStudents}
          feedbackMessage={errors.maxStudents?.message}
          {...register('maxStudents', {
            required: '최대 수강 인원을 입력해주세요',
            min: {
              value: 1,
              message: '최소 1명 이상이어야 합니다',
            },
            max: {
              value: 1000,
              message: '최대 1000명까지 가능합니다',
            },
            valueAsNumber: true,
          })}
        />
        <UncontrolledInput
          label="가격 (원)"
          placeholder="100,000"
          type="text"
          required
          error={!!errors.price}
          feedbackMessage={errors.price?.message}
          {...register('price', {
            required: '가격을 입력해주세요',
            validate: value => {
              const numValue = Number(String(value).replace(/,/g, ''));
              if (isNaN(numValue)) return '올바른 가격을 입력해주세요';
              if (numValue < 0) return '가격은 0원 이상이어야 합니다';
              if (numValue > 10000000) return '가격은 1000만원 이하여야 합니다';

              return true;
            },
            onChange: e => {
              const formatted = formatNumber(e.target.value);
              e.target.value = formatted;
            },
            setValueAs: value => {
              const numValue = String(value).replace(/,/g, '');
              return Number(numValue);
            },
          })}
        />
        <S.ButtonGroup>
          <Button
            type="button"
            size="lg"
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
