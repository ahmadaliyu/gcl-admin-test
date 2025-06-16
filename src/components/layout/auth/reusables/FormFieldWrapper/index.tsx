const FormFieldWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex-1">{children}</div>;
};

export { FormFieldWrapper };
