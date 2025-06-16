'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { TGetDesignFilter, useGetDesigns } from '@/hooks/api/designs';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react';
import { useDebounce } from '@/hooks/form/useDebounce';

const SearchComponent: React.FC<{ toggleSearch?: () => void; mobileSearch?: boolean }> = ({
  toggleSearch,
  mobileSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const { data, loading, onGetDesigns } = useGetDesigns({
    initalFetch: false,
    filter: {
      status: 'approved',
      name: searchTerm,
    },
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);

    if (typeof value === 'string' && value?.trim()) {
      setShowSuggestions(true);
    }
  };

  useDebounce({
    initialValue: searchTerm,
    onChange: (value) => {
      if (typeof value === 'string' && value?.trim()) {
        onGetDesigns({ name: value });
      }
    },
  });

  const router = useRouter();

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any): void => {
    const sitePageUrl = '/sites/' + suggestion?.id;
    router.push(sitePageUrl);
    setShowSuggestions(false);
    setSearchTerm(suggestion?.name);
  };

  // Handle click outside to close suggestions
  const handleClickOutside = (): void => {
    setShowSuggestions(false);
    toggleSearch ? toggleSearch() : '';
  };

  return (
    <div className="absolute inset-0 top-[20px] lg:top-[0px] mx-auto lg:relative w-[90%] lg:w-auto z-20">
      {/* Dark overlay */}
      {(showSuggestions || mobileSearch) && (
        <div className="fixed inset-0 bg-black/60 z-10 backdrop-blur-sm" onClick={handleClickOutside}></div>
      )}

      {/* Search Input and Suggestions */}
      <div
        className={cn(
          'relative z-20 ',
          showSuggestions
            ? 'bg-white p-[16px] rounded-[32px] h-[400px] md:w-[600px] darkremove:bg-[#111] overflow-y-hidden overflow-x-hidden flex flex-col gap-y-[16px] '
            : ''
        )}
      >
        <div className="relative min-h-[48px] h-[48px] w-full flex-1 shrink-0 grow-0">
          <input
            type="text"
            placeholder="Search websites"
            value={searchTerm}
            onChange={handleChange}
            className="relative w-full h-full bg-[#f3f3f3]   outline-none pl-[45px] rounded-full   placeholder:text-[16px] placeholder:leading-[26px] text-[16px] leading-[26px] text-[#4e4e4e] darkremove:text-[#fff] placeholder:text-[#4e4e4e] darkremove:placeholder:text-[#717171]"
          />
          <span className="absolute top-[3px] left-[2px] text-black  ">
            <svg
              className="stroke-current h-10 w-10"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21.5" cy="21.5" r="9.5" className="stroke-current" strokeWidth="1.5" />
              <path d="M28.5 28.5L32 32" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {showSuggestions && (
          <div className="w-full  pt-[16px]  flex-1 overflow-y-auto">
            <ul className="   w-full gap-[8px] ">
              {loading ? (
                <>
                  {[0, 1, 2, 3, 4, 5].map((num) => {
                    return (
                      <div key={num} className=" flex gap-[12px] mb-[12px]">
                        <Skeleton className="h-[40px] w-[40px] rounded-[6px] bg-[#E7E7E7] shrink-0 overflow-hidden" />
                        <div className="flex-1 flex flex-col  h-[40px] justify-around ">
                          <Skeleton className="w-[100px] h-[10px] bg-[#E7E7E790] overflow-hidden" />
                          <Skeleton className="w-[200px] h-[10px] bg-[#E7E7E790] overflow-hidden" />
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {data.length > 0 ? (
                    data.map((suggestion, index) => (
                      <a
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-[8px] rounded-[8px] gap-[12px] cursor-pointer hover:bg-[#f3f3f3] darkremove:hover:bg-[#a3a3a3] text-[#4e4e4e]   flex items-center"
                      >
                        <img
                          src={suggestion?.site_icon}
                          alt={suggestion?.name}
                          className="h-[40px] w-[40px] rounded-[6px]"
                        />
                        <div className="overflow-x-hidden">
                          <p className="text-[14px] leading-[22px] font-[500] text-[#111111]     ">
                            {suggestion?.name}
                          </p>

                          <p className="font-[400] text-[10px] leading-[18px]   text-[#4e4e4e] truncate text-ellipsis">
                            {suggestion?.description}
                          </p>
                        </div>
                      </a>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-[#999] text-center list-none">No suggestions found</li>
                  )}
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
