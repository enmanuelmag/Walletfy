import { $ } from '@utils/styles';

type VerifiedProps = {
  verified?: boolean;
};

const Verified = ({ verified }: VerifiedProps) => {
  console.log('Rendering Verified');

  return (
    <div
      className={$(
        'cd-flex cd-items-center cd-gap-4 cd-p-4 cd-rounded-md',
        verified ? 'cd-bg-green-100' : 'cd-bg-red-100'
      )}
    >
      <p className={verified ? 'cd-text-green-600' : 'cd-text-red-600'}>
        {verified
          ? 'User will be marked as verified but required double check'
          : 'User will be marked as not verified'}
      </p>
    </div>
  );
};

export default Verified;
