import Button from '@components/actions/Button';
import { ROUTE_PATH } from '@routes/routePath';
import { useNavigate } from 'react-router';

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>수강신청 사이트</h1>
      <Button onClick={() => navigate(ROUTE_PATH.SIGN_UP)}>
        회원가입 하기
      </Button>
    </>
  );
}

export default MainPage;
