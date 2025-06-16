import React, { ChangeEvent, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useGetDesigns } from '@/hooks/api/designs';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

interface Subcategory {
  name: string;
  quantity: number;
}

interface Category {
  id: number;
  name: string;
  iconLight: string;
  subcategories: Subcategory[];
}

const data: Category[] = [
  {
    id: 1,
    name: 'Trending',
    iconLight: '/icons/Fire.svg',
    subcategories: [
      { name: 'Business', quantity: 300 },
      { name: 'Finance', quantity: 100 },
      { name: 'CRM', quantity: 70 },
    ],
  },
  {
    id: 2,
    name: 'Recently Added',
    iconLight: '/icons/Vector.svg',
    subcategories: [
      { name: 'Business', quantity: 400 },
      { name: 'Shopping', quantity: 250 },
      { name: 'Artificial Intelligence', quantity: 122 },
    ],
  },
  {
    id: 3,
    name: 'Category',
    iconLight: '/icons/Checklist-Minimalistic.svg',
    subcategories: [
      { name: 'Education', quantity: 299 },
      { name: 'Food & Drink', quantity: 56 },
      { name: 'Products', quantity: 49 },
    ],
  },
  {
    id: 4,
    name: 'Most Saved',
    iconLight: '/icons/Bookmark1.svg',
    subcategories: [
      { name: 'Business', quantity: 300 },
      { name: 'Finance', quantity: 100 },
      { name: 'CRM', quantity: 70 },
    ],
  },
  {
    id: 5,
    name: 'Most Liked',
    iconLight: '/icons/Heart.svg',
    subcategories: [
      { name: 'Education', quantity: 299 },
      { name: 'Food & Drink', quantity: 56 },
      { name: 'Products', quantity: 49 },
    ],
  },
];

interface FilterComponentProps {
  open: boolean;
  toggleTab: (index: boolean) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ open, toggleTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(data[0]); // Default to "Trending"
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setExpandedCategory(category.id === expandedCategory ? null : category.id);
  };

  const handleClose = () => {
    toggleTab(false);
    setSelectedCategory(data[0]); // Reset to "Trending" on close
    setExpandedCategory(null);
  };

  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    data: designs,
    loading,
    onGetDesigns,
  } = useGetDesigns({
    initalFetch: false,
    filter: {
      status: 'approved',
      name: searchTerm,
    },
  });

  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);

    if (e?.target?.value?.trim()) {
      onGetDesigns({ name: value });
      setShowSuggestions(true);
    }
  };

  const router = useRouter();
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any): void => {
    const sitePageUrl = '/sites/' + suggestion?.id;
    router.push(sitePageUrl);
    setShowSuggestions(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-[704px] lg:rounded-[32px] p-0" hideCloseIcon>
        <div
          className="lg:rounded-[32px] sm:rounded-[4px] overflow-hidden w-full p-4 bg-white   space-y-[16px]"
          onClick={(e) => e.stopPropagation()} // Prevents modal content clicks from closing the modal
        >
          <div className=" lg:block hidden w-full relative h-[48px]">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search websites"
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
          <div className="lg:flex gap-5 hidden">
            <div className="lg:w-[180px]">
              <div className="flex flex-col gap-y-1">
                {data.map((item) => (
                  <div
                    className={`p-2 flex gap-x-2 rounded-[4px] hover:bg-[#f3f3f3] darkremove:hover:bg-[#838383] cursor-pointer ${
                      selectedCategory.id === item.id ? 'bg-[#f3f3f3] darkremove:bg-[#838383]' : ''
                    }`}
                    key={item.id}
                    onClick={() => handleCategorySelect(item)}
                  >
                    <span>
                      <img src={item.iconLight} alt={item.name} />
                    </span>
                    <span className="font-[500] text-[14px] leading-[22px]   text-[#111111] darkremove:text-[#ffffff]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-[474px]">
              {showSuggestions && searchTerm?.trim()?.length ? (
                <div className="w-full  flex-1 overflow-y-auto">
                  <ul className="   w-full gap-[8px] ">
                    {loading ? (
                      <>
                        {[0, 1, 2, 3].map((num) => {
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
                        {designs.length > 0 ? (
                          designs.map((suggestion, index) => (
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
                          <div className="flex flex-col items-center justify-center mt-[20px]">
                            <img src="/icons/folder-gray.svg" alt="Empty icon" className="mb-[0px] w-[60px] h-[60px]" />

                            <li className="px-4 py-2 text-[#999] text-center">No suggestions found</li>
                          </div>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              ) : (
                <>{selectedCategory && <div className="flex gap-y-4 flex-col"></div>}</>
              )}
            </div>
          </div>

          {/* Dropdown layout for small screens */}
          <div className="lg:hidden w-[365px] space-y-1 ">
            {data.map((item) => (
              <div key={item.id}>
                <div
                  className="p-2 flex gap-x-2 rounded-[4px] cursor-pointer justify-between"
                  onClick={() => handleCategorySelect(item)}
                >
                  <span className="flex items-center gap-x-2">
                    <span className="font-[500] text-[14px] leading-[22px]   text-[#111111] darkremove:text-[#ffffff]">
                      {item.name}
                    </span>
                  </span>
                  <span className="text-[#111111] darkremove:text-[#ffffff]">
                    {expandedCategory === item.id ? (
                      <span className="">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-400 darkremove:text-gray-200"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.7803 11.7803C14.4874 12.0732 14.0126 12.0732 13.7197 11.7803L9 7.06066L4.28033 11.7803C3.98744 12.0732 3.51256 12.0732 3.21967 11.7803C2.92678 11.4874 2.92678 11.0126 3.21967 10.7197L8.46967 5.46967C8.76256 5.17678 9.23744 5.17678 9.53033 5.46967L14.7803 10.7197C15.0732 11.0126 15.0732 11.4874 14.7803 11.7803Z"
                            className="fill-current"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-400 darkremove:text-gray-200"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.21967 6.21967C3.51256 5.92678 3.98744 5.92678 4.28033 6.21967L9 10.9393L13.7197 6.21967C14.0126 5.92678 14.4874 5.92678 14.7803 6.21967C15.0732 6.51256 15.0732 6.98744 14.7803 7.28033L9.53033 12.5303C9.23744 12.8232 8.76256 12.8232 8.46967 12.5303L3.21967 7.28033C2.92678 6.98744 2.92678 6.51256 3.21967 6.21967Z"
                            className="fill-current"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </div>
                {expandedCategory === item.id && (
                  <div className="">
                    {item.subcategories.map((subcategory, index) => (
                      <div
                        key={index}
                        className="flex justify-between rounded-[4px] p-2 hover:bg-[#f3f3f3] darkremove:hover:bg-none"
                      >
                        <p className="text-[14px] leading-[22px] font-[500]   text-[#111111] darkremove:text-[#ffffff]">
                          {subcategory.name}
                        </p>
                        <span className="text-[14px] leading-[22px] font-[400]   text-[#838383]">
                          {subcategory.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterComponent;
