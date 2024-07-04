'use client';
import UnauthWrapper from '../../commonComponents/unauthWrapper';
import SignUpPage from '../../components/signup';

export default function SignUp() {
  return (
    <UnauthWrapper>
      <SignUpPage />
    </UnauthWrapper>
  );
}
