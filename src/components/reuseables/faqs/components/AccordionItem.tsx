export const AccordionItem = () => {
  return (
    <div className="w-full">
      <button className="inline-flex items-center justify-between w-full">
        <div>How can I submit my site?</div>
        <svg
          className="stroke-current text-primary-dark darkremove:text-[#838383]"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
        >
          <circle cx="24.9974" cy="25" r="20.8333" strokeWidth="1.5" />
          <path d="M31.25 25H18.75" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div className="mt-8">
        <div className="text-[#111111] darkremove:text-[#838383]   leading-[26px] text-lg font-normal">
          To submit your website design, create an account, navigate to the upload section, and follow the instructions
          to submit your design along with any relevant details.
        </div>
      </div>
      <div className="my-8 h-px bg-[#e7e7e7] darkremove:bg-[#838383]" />
    </div>
  );
};
