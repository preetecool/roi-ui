"use client";

import * as React from "react";
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@/registry/brook/ui/otp-field/otp-field";

const OTP_LENGTH = 6;

export default function OTPFieldDemo() {
  const id = React.useId();

  return (
    <OTPField id={id} length={OTP_LENGTH}>
      {Array.from({ length: OTP_LENGTH }, (_, i) => (
        <React.Fragment key={i}>
          <OTPFieldInput aria-label={`Character ${i + 1} of ${OTP_LENGTH}`} />
          {i === 2 ? <OTPFieldSeparator /> : null}
        </React.Fragment>
      ))}
    </OTPField>
  );
}
