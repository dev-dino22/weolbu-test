import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { THEME } from '@styles/global';
import { BrowserRouter } from 'react-router';
import SignUpForm from './SignUpForm';

const mockPostSignUp = vi.fn();
const mockLogin = vi.fn();
const mockNavigate = vi.fn();
const mockShowToast = vi.fn();

vi.mock('@apis/users', () => ({
  users: {
    postSignUp: (...args: unknown[]) => mockPostSignUp(...args),
  },
}));

vi.mock('@domains/auth/context/AuthProvider', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@components/toast/ToastProvider', () => ({
  useShowToast: () => mockShowToast,
}));

describe('SignUpForm - 유효한 입력', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSignUpForm = () => {
    return render(
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <SignUpForm />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
    const nameInput = screen.getByLabelText('이름');
    const emailInput = screen.getByLabelText('이메일');
    const phoneInput = screen.getByLabelText('휴대폰 번호');
    const passwordInput = screen.getByLabelText('비밀번호');
    const studentRadio = screen.getByLabelText('수강생');

    await user.type(nameInput, '김월부');
    await user.type(emailInput, 'test@weolbu.com');
    await user.type(phoneInput, '010-1234-5678');
    await user.type(passwordInput, 'pass1234');
    await user.click(studentRadio);
  };

  it('유효한 모든 필드를 입력하고 회원 가입 버튼을 클릭하면 회원가입이 성공한다', async () => {
    const user = userEvent.setup();
    mockPostSignUp.mockResolvedValueOnce({});
    mockLogin.mockResolvedValueOnce(undefined);

    renderSignUpForm();

    await fillValidForm(user);

    const signUpButton = screen.getByRole('button', { name: '회원 가입' });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(mockPostSignUp).toHaveBeenCalledWith({
        email: 'test@weolbu.com',
        password: 'pass1234',
        name: '김월부',
        phone: '010-1234-5678',
        role: 'STUDENT',
      });
    });
  });

  it('회원가입 성공 후 자동 로그인된다', async () => {
    const user = userEvent.setup();
    mockPostSignUp.mockResolvedValueOnce({});
    mockLogin.mockResolvedValueOnce(undefined);

    renderSignUpForm();

    await fillValidForm(user);

    const signUpButton = screen.getByRole('button', { name: '회원 가입' });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@weolbu.com',
        password: 'pass1234',
      });
    });
  });

  it('회원가입 성공 후 강의 신청 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    mockPostSignUp.mockResolvedValueOnce({});
    mockLogin.mockResolvedValueOnce(undefined);

    renderSignUpForm();

    await fillValidForm(user);

    const signUpButton = screen.getByRole('button', { name: '회원 가입' });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/courses/enroll');
    });
  });

  it('회원가입 성공 시 성공 토스트가 표시된다', async () => {
    const user = userEvent.setup();
    mockPostSignUp.mockResolvedValueOnce({});
    mockLogin.mockResolvedValueOnce(undefined);

    renderSignUpForm();

    await fillValidForm(user);

    const signUpButton = screen.getByRole('button', { name: '회원 가입' });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith({
        mode: 'SUCCESS',
        message: '회원가입이 완료되었습니다!',
      });
    });
  });

  it('강사 유형을 선택하면 INSTRUCTOR로 회원가입된다', async () => {
    const user = userEvent.setup();
    mockPostSignUp.mockResolvedValueOnce({});
    mockLogin.mockResolvedValueOnce(undefined);

    renderSignUpForm();

    const nameInput = screen.getByLabelText('이름');
    const emailInput = screen.getByLabelText('이메일');
    const phoneInput = screen.getByLabelText('휴대폰 번호');
    const passwordInput = screen.getByLabelText('비밀번호');
    const instructorRadio = screen.getByLabelText('강사');

    await user.type(nameInput, '김강사');
    await user.type(emailInput, 'instructor@weolbu.com');
    await user.type(phoneInput, '010-9999-8888');
    await user.type(passwordInput, 'pass1234');
    await user.click(instructorRadio);

    const signUpButton = screen.getByRole('button', { name: '회원 가입' });
    await user.click(signUpButton);

    await waitFor(() => {
      expect(mockPostSignUp).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'INSTRUCTOR',
        })
      );
    });
  });
});

describe('SignUpForm - 유효하지 않은 입력', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSignUpForm = () => {
    return render(
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <SignUpForm />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  it('이름이 2자 미만이면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderSignUpForm();

    const nameInput = screen.getByLabelText('이름');
    await user.type(nameInput, '김');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('이름은 최소 2자 이상이어야 합니다')
      ).toBeInTheDocument();
    });
  });

  it('올바르지 않은 이메일 형식을 입력하면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderSignUpForm();

    const emailInput = screen.getByLabelText('이메일');
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('올바른 이메일 형식이 아닙니다')
      ).toBeInTheDocument();
    });
  });

  it('올바르지 않은 휴대폰 번호 형식을 입력하면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderSignUpForm();

    const phoneInput = screen.getByLabelText('휴대폰 번호');
    await user.type(phoneInput, '123');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(
          '올바른 휴대폰 번호 형식이 아닙니다 (예: 010-1234-5678)'
        )
      ).toBeInTheDocument();
    });
  });

  it('비밀번호가 6자 미만이면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderSignUpForm();

    const passwordInput = screen.getByLabelText('비밀번호');
    await user.type(passwordInput, 'abc12');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('비밀번호는 6자 이상 10자 이하여야 합니다')
      ).toBeInTheDocument();
    });
  });

  it('비밀번호에 특수문자가 포함되면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderSignUpForm();

    const passwordInput = screen.getByLabelText('비밀번호');
    await user.type(passwordInput, 'abc123!@#');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('비밀번호는 영문과 숫자만 사용할 수 있습니다')
      ).toBeInTheDocument();
    });
  });

  it('비밀번호가 영문과 숫자 조합이 아니면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderSignUpForm();

    const passwordInput = screen.getByLabelText('비밀번호');
    await user.type(passwordInput, 'abcdefgh');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(
          '영문 소문자, 대문자, 숫자 중 최소 2가지 이상 조합이 필요합니다'
        )
      ).toBeInTheDocument();
    });
  });
});
