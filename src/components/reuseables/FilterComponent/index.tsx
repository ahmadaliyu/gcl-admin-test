import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TGetCategoryFilter, useFetchCategories } from '@/hooks/api/categories';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { IDesignCategory, IFetchDesignCategoryQuery } from '@/types';
import { Cross1Icon } from '@radix-ui/react-icons';

interface Subcategory {
  name: string;
  quantity: number;
}

interface Category {
  id: number;
  name: string;
  iconLight: string;
  subcategories: Subcategory[];
  disabled: boolean;
}
function getCategoriesGroups(): Category[] {
  return [
    {
      id: 1,
      name: 'All',
      iconLight: '/icons/Checklist-Minimalistic.svg',
      subcategories: [],
      disabled: false,
    },

    {
      id: 2,
      name: 'Trending',
      iconLight: '/icons/Fire.svg',
      subcategories: [],
      disabled: true,
    },
    {
      id: 3,
      name: 'Recently Added',
      iconLight: '/icons/Vector.svg',
      subcategories: [],
      disabled: true,
    },

    {
      id: 4,
      name: 'Most Saved',
      iconLight: '/icons/Bookmark1.svg',
      subcategories: [],
      disabled: true,
    },
    {
      id: 5,
      name: 'Most Liked',
      iconLight: '/icons/Heart.svg',
      subcategories: [],
      disabled: true,
    },
  ];
}

interface FilterComponentProps {
  open: boolean;
  toggleTab: (index: boolean) => void;
  selectedCategoryFromSearch: IDesignCategory | undefined;
  setSelectedCategoryFromSearch: React.Dispatch<React.SetStateAction<IDesignCategory | undefined>>;
}
const PER_PAGE = 50;

const FilterComponent: React.FC<FilterComponentProps> = ({
  open,
  toggleTab,
  selectedCategoryFromSearch,
  setSelectedCategoryFromSearch,
}) => {
  const categoryGroups = getCategoriesGroups();

  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<Category>(categoryGroups[0]); // Default to "Trending"
  const [expandedCategory, setExpandedCategory] = useState<number | null>(categoryGroups[0]?.id);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategoryGroup(category);
    setExpandedCategory(category.id === expandedCategory ? null : category.id);
  };

  const handleClose = () => {
    toggleTab(false);
    setSelectedCategoryGroup(categoryGroups[0]); // Reset to "Trending" on close
    setExpandedCategory(null);
  };

  const [categoriesQueryObject, setcategoriesQueryObject] = React.useState<IFetchDesignCategoryQuery>({
    name: '',
    page: 1,
  });

  const { categories, loading, fetchCategories, meta } = useFetchCategories();

  const refresh = () => {
    fetchCategories({
      name: categoriesQueryObject?.name,
      page: categoriesQueryObject?.page,
      limit: PER_PAGE,
    });
  };

  useEffect(() => {
    refresh();
  }, [categoriesQueryObject]);

  const onSelectCategory = (category: IDesignCategory) => {
    setSelectedCategoryFromSearch(category);
    toggleTab?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className=" lg:min-w-[704px] lg:rounded-[32px]  p-0 border-none   " hideCloseIcon>
        <div
          className="rounded-[32px] overflow-hidden w-full p-4 bg-white   space-y-[16px]"
          onClick={(e) => e.stopPropagation()} // Prevents modal content clicks from closing the modal
        >
          <div className="w-full flex  justify-end lg:hidden ">
            <button className="ml-auto" onClick={handleClose}>
              <Cross1Icon />
            </button>
          </div>
          <div className=" lg:block hidden w-full relative h-[48px]">
            <input
              value={categoriesQueryObject?.name}
              onChange={(e) => setcategoriesQueryObject((x) => ({ ...x, name: e.target.value }))}
              type="text"
              placeholder="Search categories"
              className="relative w-full h-full bg-[#f3f3f3] outline-none pl-[45px] rounded-full   placeholder:text-[16px] placeholder:leading-[26px] text-[16px] leading-[26px] text-[#4e4e4e] placeholder:text-[#4e4e4e]"
            />
            <span className="absolute top-[3px] left-[2px] text-black">
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
                {categoryGroups.map((item) => (
                  <div
                    className={cn(
                      `p-2 flex gap-x-2 rounded-[4px] hover:bg-[#f3f3f3] darkremove:hover:bg-[#838383] cursor-pointer ${
                        selectedCategoryGroup.id === item.id ? 'bg-[#f3f3f3]  ' : ''
                      }`,

                      item?.disabled ? 'opacity-20 cursor-not-allowed' : ''
                    )}
                    key={item.id}
                    onClick={item?.disabled ? undefined : () => handleCategorySelect(item)}
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
              <div className="flex gap-y-4 flex-col">
                <span className="">
                  <p className="font-[500] text-[12px] text-[#838383] leading-[20px]">All Categories</p>
                </span>
                <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
                  {loading ? (
                    <div>
                      <Skeleton className="w-[100%] h-[30px] bg-[#E7E7E790] overflow-hidden" />

                      <Skeleton className="w-[100%] h-[30px] bg-[#E7E7E790] overflow-hidden mt-[13px]" />

                      <Skeleton className="w-[100%] h-[30px] bg-[#E7E7E790] overflow-hidden mt-[13px]" />

                      <Skeleton className="w-[100%] h-[30px] bg-[#E7E7E790] overflow-hidden mt-[13px]" />

                      <Skeleton className="w-[100%] h-[30px] bg-[#E7E7E790] overflow-hidden mt-[13px]" />
                    </div>
                  ) : (
                    <>
                      {(categories || []).map((category, index) => (
                        <button
                          key={index}
                          onClick={() => onSelectCategory(category)}
                          className={cn(
                            'w-full flex justify-between border-[#4E4E4E] rounded-[4px] py-2 hover:bg-[#f3f3f3] darkremove:hover:bg-[#1D1D1D] cursor-pointer px-2'
                          )}
                        >
                          <span className="text-[14px] leading-[22px] font-[500]   text-[#111111] darkremove:text-[#ffffff]">
                            {category?.name}
                          </span>
                          <span className="text-[14px] leading-[22px] font-[400]   text-[#838383]">
                            {category?.number_of_designs || 0}
                          </span>
                        </button>
                      ))}
                      {!categories?.length ? (
                        <div className="flex flex-1 mt-4 flex-col items-center justify-center">
                          <img src="/icons/folder-gray.svg" alt="Empty icon" className=" w-[30px] h-[30px]" />

                          <div className="px-4 pt-2 text-[14px] text-center">No categories found</div>
                          {categoriesQueryObject?.name?.trim() ? (
                            <div className="px-4 py-1 text-[12px] max-w-[400px] mx-auto text-[#999] text-center">
                              Please try adjusting your search criteria or explore other categories.
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dropdown layout for small screens */}
          <div className="lg:hidden  space-y-1 w-full ">
            {categoryGroups.map((item) => (
              <div key={item.id} className="z-30">
                <div
                  className={`w-full p-2 flex gap-x-2 rounded-[4px] cursor-pointer justify-between ${
                    selectedCategoryGroup.id === item.id ? 'bg-[#f3f3f3] darkremove:bg-[#838383]' : ''
                  }`}
                  onClick={item?.disabled ? undefined : () => handleCategorySelect(item)}
                >
                  <span
                    className={`font-[500] text-[14px] leading-[22px]   text-[#111111] darkremove:text-[#ffffff] ${
                      item.disabled ? 'text-[#7e7e7e]' : ''
                    }`}
                  >
                    {item.name}
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
                  <>
                    <div className="max-h-[340px] overflow-auto p-4 pb-[10px] ">
                      {(categories || []).map((category, index) => (
                        <button
                          key={index}
                          onClick={() => onSelectCategory(category)}
                          className={cn(
                            'w-full flex justify-between border-[#4E4E4E] rounded-[4px] py-2 hover:bg-[#f3f3f3] darkremove:hover:bg-none cursor-pointer'
                          )}
                        >
                          <span className="text-[14px] leading-[22px] font-[500]   text-[#111111] darkremove:text-[#ffffff]">
                            {category?.name}
                          </span>
                          <span className="text-[14px] leading-[22px] font-[400]   text-[#838383]">
                            {category?.number_of_designs}
                          </span>
                        </button>
                      ))}
                      {!categories?.length ? (
                        <div className="flex flex-1 mt-4 flex-col items-center justify-center">
                          <img src="/icons/folder-gray.svg" alt="Empty icon" className=" w-[30px] h-[30px]" />

                          <div className="px-4 pt-2 text-[14px] text-center">No categories found</div>
                          {categoriesQueryObject?.name?.trim() ? (
                            <div className="px-4 py-1 text-[12px] max-w-[400px] mx-auto text-[#999] text-center">
                              Please try adjusting your search criteria or explore other categories.
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </>
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
