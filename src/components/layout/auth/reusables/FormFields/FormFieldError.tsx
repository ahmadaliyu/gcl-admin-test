import { FieldMetaProps } from 'formik/dist/types';

interface props {
  error?: string;
  touched: boolean;
  value: any;
  initialError?: string;
  initialTouched: boolean;
  initialValue?: string;
}

const FormFieldError = ({ meta }: { meta: FieldMetaProps<props> }) => {
  if (meta.touched && meta.error) {
    return <div className="mt-1   text-xs leading-5 font-normal text-[#FF0000]">{meta.error}</div>;
  }
  return null;
};

export { FormFieldError };
