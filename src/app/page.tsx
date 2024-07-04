import UnauthWrapper from '../commonComponents/unauthWrapper';
import LoginPage from '../components/login';

export default function HomeScreen() {
  return (
    <>
      <UnauthWrapper>
        <LoginPage />
      </UnauthWrapper>
    </>
  );
}
