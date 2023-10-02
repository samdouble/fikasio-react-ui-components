export function convertClassNameToObj(className?: string) {
  return className
    ? className
      .split(' ')
      .reduce((acc, curr) => ({
        ...acc,
        [curr]: true,
      }), {})
    : {};
}

export default convertClassNameToObj;
