import { BaseButton, SharedButtonProps } from './BaseButton';

export type LinkButtonProps = SharedButtonProps;

export function LinkButton(props: LinkButtonProps) {
  return (
    <BaseButton
      {...props}
      defaultType="button"
      variantClass="fikasio-linkbutton"
    />
  );
}

export default LinkButton;
