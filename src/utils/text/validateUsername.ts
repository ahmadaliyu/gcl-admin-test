const validateUsername = ({ value }: { value: string }) => {
  const regex = /^[a-z0-9_-]*$/i;
  // Test the string against the regular expression
  return regex.test(value);
};

export default validateUsername;
