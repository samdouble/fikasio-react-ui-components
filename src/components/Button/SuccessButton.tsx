import { BaseButton, SharedButtonProps } from './BaseButton';

export type SuccessButtonProps = SharedButtonProps;

export function SuccessButton(props: SuccessButtonProps) {
  return (
    <BaseButton
      {...props}
      defaultType="submit"
      variantClass="fikasio-successbutton"
    />
  );
}

export default SuccessButton;
