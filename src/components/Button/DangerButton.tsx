import { BaseButton, SharedButtonProps } from './BaseButton';

export interface DangerButtonProps extends SharedButtonProps {
  outline?: boolean;
}

export function DangerButton({
  outline = false,
  ...props
}: DangerButtonProps) {
  return (
    <BaseButton
      {...props}
      defaultType="button"
      outline={outline}
      variantClass="fikasio-dangerbutton"
    />
  );
}

export default DangerButton;
