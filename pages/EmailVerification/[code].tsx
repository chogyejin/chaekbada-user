import { GetServerSidePropsContext } from 'next';
import { axiosFunction } from '../../common/utils';

interface Props {
  isSuccessed: boolean;
}

export default function EmailVerification({ isSuccessed }: Props) {
  return (
    <div style={{ textAlign: 'center', padding: '200px', fontSize: '40px' }}>
      {isSuccessed === true ? (
        <div>이메일이 인증되었습니다.</div>
      ) : (
        <div>이메일 인증 실패되었습니다.</div>
      )}
    </div>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const verificationCode = context.params?.code;
//   const result = await axiosFunction({
//     url: '/signUp/verification',
//     method: 'POST',
//     params: {
//       token: verificationCode,
//     },
//   });

//   return {
//     props: {
//       isSuccessed: result?.data,
//     },
//   };
// }
