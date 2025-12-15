import { formatter } from '@validation/formatters';
import type { RegisterOptions } from 'react-hook-form';

type CourseFormData = {
  title: string;
  description?: string;
  instructorName: string;
  maxStudents: number;
  price: number;
};

export const courseCreateFormRules = {
  title: {
    required: '강의명을 입력해주세요',
    minLength: {
      value: 2,
      message: '강의명은 최소 2자 이상이어야 합니다',
    },
    maxLength: {
      value: 100,
      message: '강의명은 최대 100자까지 입력 가능합니다',
    },
  } satisfies RegisterOptions<CourseFormData, 'title'>,
  description: {
    maxLength: {
      value: 500,
      message: '강의 설명은 최대 500자까지 입력 가능합니다',
    },
  } satisfies RegisterOptions<CourseFormData, 'description'>,
  instructorName: {
    required: '강사명을 입력해주세요',
    minLength: {
      value: 2,
      message: '강사명은 최소 2자 이상이어야 합니다',
    },
    maxLength: {
      value: 10,
      message: '강사명은 최대 10자까지 입력 가능합니다',
    },
  } satisfies RegisterOptions<CourseFormData, 'instructorName'>,
  maxStudents: {
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
  } satisfies RegisterOptions<CourseFormData, 'maxStudents'>,
  price: {
    required: '가격을 입력해주세요',
    validate: value => {
      const numValue = Number(String(value).replace(/,/g, ''));
      if (isNaN(numValue)) return '올바른 가격을 입력해주세요';
      if (numValue < 0) return '가격은 0원 이상이어야 합니다';
      if (numValue > 10000000) return '가격은 1000만원 이하여야 합니다';

      return true;
    },
    onChange: e => {
      e.target.value = formatter.toCommaNumber(e.target.value);
    },
    setValueAs: value => {
      const numValue = String(value).replace(/,/g, '');
      return Number(numValue);
    },
  } satisfies RegisterOptions<CourseFormData, 'price'>,
};
