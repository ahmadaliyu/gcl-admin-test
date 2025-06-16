export const activeStep = (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="30" height="30" rx="15" fill="#F8F8F8" />
    <rect x="1.5" y="1.5" width="30" height="30" rx="15" stroke="#3788D1" strokeWidth="2" />
    <rect x="9" y="8.5" width="16" height="16" rx="8" fill="#0088DD" />
    <rect x="9" y="8.5" width="16" height="16" rx="8" stroke="#3788D1" />
  </svg>
);

export const inActiveStep = (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="30" height="30" rx="15" fill="#F8F8F8" />
    <rect x="1.5" y="1.5" width="30" height="30" rx="15" stroke="#3788D1" strokeWidth="2" />
    <rect x="9" y="8.5" width="16" height="16" rx="8" fill="white" />
    <rect x="9" y="8.5" width="16" height="16" rx="8" fill="white" />
  </svg>
);

export enum EStepIds {
  SampleQuote = 'sample-quote',
  Information = 'information',
  Review = 'review',
  Insurance = 'insurance',
  Checkout = 'checkout',
}

export const steps = [
  { id: EStepIds.SampleQuote, title: 'Sample Quote' },
  { id: EStepIds.Information, title: 'Information' },
  { id: EStepIds.Review, title: 'Review' },
  { id: EStepIds.Insurance, title: 'Insurance' },
  { id: EStepIds.Checkout, title: 'Checkout' },
];
