import { BaseButton, SharedButtonProps } from './BaseButton';

export interface SecondaryButtonProps extends SharedButtonProps {
  active?: boolean;
}

export function SecondaryButton({
  active = false,
  ...props
}: SecondaryButtonProps) {
  return (
    <BaseButton
      {...props}
      active={active}
      defaultType="button"
      variantClass="fikasio-secondarybutton"
    />
  );
}

export default SecondaryButton;
