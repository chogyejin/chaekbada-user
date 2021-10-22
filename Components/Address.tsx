import { useState } from 'react';
import { DaumPostcode, DaumPostcodeProps } from 'react-daum-postcode';
import { Address } from 'react-daum-postcode/lib/loadPostcode';

interface Props {
  getAddress: (fullAddress: string) => void;
}

export default function AddressComponent({ getAddress }: Props) {
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    getAddress(fullAddress);
    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <>
      <DaumPostcode onComplete={handleComplete} autoClose />
    </>
  );
}
