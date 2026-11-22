import { BaseButton, SharedButtonProps } from './BaseButton';

export type ActionButtonProps = SharedButtonProps;

export function ActionButton(props: ActionButtonProps) {
  return (
    <BaseButton
      {...props}
      defaultType="submit"
      variantClass="fikasio-actionbutton"
    />
  );
}

export default ActionButton;
