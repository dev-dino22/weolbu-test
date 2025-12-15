import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { ThemeProvider } from '@emotion/react';
import { THEME } from '@styles/global';
import { BrowserRouter } from 'react-router';

const mockLogin = vi.fn();
const mockNavigate = vi.fn();
const mockShowToast = vi.fn();

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

describe('LoginForm - 유효한 입력', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLoginForm = () => {
    return render(
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  it('유효한 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭하면 로그인이 성공한다', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce(undefined);

    renderLoginForm();

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'test@weolbu.com');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@weolbu.com',
        password: 'password123',
      });
    });
  });

  it('로그인 성공 시 강의 신청 페이지로 이동한다', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce(undefined);

    renderLoginForm();

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'test@weolbu.com');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/courses/enroll');
    });
  });

  it('올바른 이메일 형식을 입력하면 에러가 표시되지 않는다', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const emailInput = screen.getByLabelText('이메일');
    await user.type(emailInput, 'valid@weolbu.com');
    await user.tab();

    expect(
      screen.queryByText('올바른 이메일 형식이 아닙니다')
    ).not.toBeInTheDocument();
  });

  it('비밀번호를 입력하면 에러가 표시되지 않는다', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const passwordInput = screen.getByLabelText('비밀번호');
    await user.type(passwordInput, 'password123');
    await user.tab();

    expect(
      screen.queryByText('비밀번호를 입력해주세요')
    ).not.toBeInTheDocument();
  });

  it('모든 필드가 유효하면 로그인 버튼이 활성화된다', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'test@weolbu.com');
    await user.type(passwordInput, 'password123');

    expect(loginButton).not.toBeDisabled();
  });
});

describe('LoginForm - 유효하지 않은 입력', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLoginForm = () => {
    return render(
      <ThemeProvider theme={THEME}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  it('이메일을 입력하지 않으면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const loginButton = screen.getByRole('button', { name: '로그인' });
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
    });
  });

  it('올바르지 않은 이메일 형식을 입력하면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const emailInput = screen.getByLabelText('이메일');
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('올바른 이메일 형식이 아닙니다')
      ).toBeInTheDocument();
    });
  });

  it('비밀번호를 입력하지 않으면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const loginButton = screen.getByRole('button', { name: '로그인' });
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('비밀번호를 입력해주세요')).toBeInTheDocument();
    });
  });
});
