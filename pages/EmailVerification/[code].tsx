import { GetServerSidePropsContext } from 'next';
import { axiosFunction } from '../../common/utils';

interface Props {
  isSuccessed: boolean;
}

export default function EmailVerification({ isSuccessed }: Props) {
  return (
    <>
      <div>이메일 인증 페이지</div>
      <div>
        {isSuccessed === true ? (
          <div>이메일 인증 성공</div>
        ) : (
          <div>이메일 인증 실패</div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const verificationCode = context.params?.code;
  const result = await axiosFunction({
    url: '/signUp/verification',
    method: 'GET',
    params: {
      token: verificationCode,
    },
  });

  return {
    props: {
      isSuccessed: result,
    },
  };
}
