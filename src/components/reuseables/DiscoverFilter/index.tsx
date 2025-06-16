import React, { useCallback, useEffect, useRef, useState } from 'react';
import FilterComponent from '../FilterComponent';
import Button from '@/components/reuseables/Button';
import { useFetchCategories } from '@/hooks/api/categories';
import { Skeleton } from '@/components/ui/skeleton';

import { IDesignCategory, IFetchDesignCategoryQuery } from '@/types';
import { cn } from '@/lib/utils';

import './discover-filter.css';

function DiscoverFilter({
  query,
  setquery,
  selectedCategoryFromSearch,
  setSelectedCategoryFromSearch,
  PER_PAGE,
}: {
  query?: any;
  setquery?: any;

  selectedCategoryFromSearch: IDesignCategory | undefined;
  setSelectedCategoryFromSearch: React.Dispatch<React.SetStateAction<IDesignCategory | undefined>>;
  PER_PAGE?: any;
}) {
  const [open, setOpen] = useState(false);

  const toggleTab = (index: boolean) => {
    setOpen(index);
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

  const scrollIntoTopView = () => {
    if (window?.document) {
      const targetDiv = window.document.getElementById('home-designs-container');
      targetDiv?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setSelected = (value?: string, clearSelectedFromSearch = true) => {
    scrollIntoTopView();
    setquery((x?: any) => {
      return { ...(x || {}), categories: value, limit: PER_PAGE };
    });
    if (clearSelectedFromSearch) setSelectedCategoryFromSearch(undefined);
  };

  useEffect(() => {
    if (selectedCategoryFromSearch?.name) setSelected(selectedCategoryFromSearch?.name, false);
  }, [selectedCategoryFromSearch]);

  // Add ref at top of component
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollShow, setScrollShow] = React.useState({
    atEnd: false,
    scrollLeft: 0,
  });

  // Add scroll function
  const scrollTo = ({ type }: { type?: 'end' | 'start' }) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: type === 'end' ? containerRef.current.scrollWidth : 0,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const checkScrollPosition = () => {
      if (container) {
        const scrollLeft = container.scrollLeft;
        const atEnd = scrollLeft + container.clientWidth >= container.scrollWidth;
        setScrollShow({
          atEnd,
          scrollLeft,
        });
      }
    };

    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const showLeftArrow = scrollShow?.scrollLeft > 50;
  return (
    <>
      <FilterComponent
        open={open}
        toggleTab={toggleTab}
        selectedCategoryFromSearch={selectedCategoryFromSearch}
        setSelectedCategoryFromSearch={setSelectedCategoryFromSearch}
      />

      <div className="w-full relative discover-filter-container mb-[32px]">
        <div ref={containerRef} className="w-full flex gap-[8px] overflow-x-auto  items-center relative ">
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((x, i) => {
                return (
                  <Skeleton
                    key={i}
                    className="bg-[#F3F3F3] flex items-center w-[100px] justify-center gap-[10px] border-[1px] rounded-full  font-[500] cursor-pointer m-0 shrink-0 hover:opacity-85 h-[48px]"
                  />
                );
              })}
            </>
          ) : (
            <>
              <div
                className={cn(
                  'flex items-center  shrink-0 mr-[-8px] sticky top-0 left-0 bg-[white]   z-10 transition-all duration-300 ease-in-out',
                  showLeftArrow ? 'pr-[10px]' : 'w-[156px]'
                )}
              >
                <Button
                  onClick={() => {
                    scrollIntoTopView();
                    toggleTab(true);
                  }}
                  variant="secondary"
                  title="Filter"
                  height="48px"
                  leftIcon="/icons/filter.svg"
                  lefttIconDark="/icons/filter-white.svg"
                  className="darkremove:hidden"
                />

                <Button
                  onClick={() => {
                    scrollIntoTopView();
                    toggleTab(true);
                  }}
                  variant="outlined-light"
                  title="Filter"
                  height="48px"
                  leftIcon="/icons/filter.svg"
                  lefttIconDark="/icons/filter-white.svg"
                  className="hidden darkremove:flex"
                />

                <div className="h-[30px] bg-[#E7E7E7] w-[2px] shrink-0 ml-[20px] mr-[20px]" />
                <button
                  className={cn(
                    'transition-all duration-300 ease-in-out w-[40px] h-[40px] flex items-center justify-center rounded-full rotate-180 hover:bg-gray-200 darkremove:hover:bg-gray-700 utline-none',
                    showLeftArrow ? 'opacity-100' : 'opacity-0'
                  )}
                  onClick={() => {
                    scrollTo({ type: 'start' }); // Add this
                  }}
                >
                  <span className="text-black  ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current"
                    >
                      <path
                        d="M4 12H20M20 12L14 6M20 12L14 18"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <Button
                variant={query?.categories === '' ? 'dark' : 'outlined-light'}
                title="All"
                height="48px"
                onClick={() => setSelected('')}
              />

              {selectedCategoryFromSearch?.name ? (
                <Button
                  variant={'dark'}
                  title={selectedCategoryFromSearch?.name}
                  height="48px"
                  onClick={() => setSelected('')}
                  rightIcon="/icons/close-circle-light.svg"
                  rightIconDark="/icons/close-circle.svg"
                />
              ) : (
                <>
                  {(categories || []).map((item) => {
                    return (
                      <Button
                        onClick={() => setSelected(item?.name)}
                        key={item?.id}
                        variant={query?.categories === item?.name ? 'dark' : 'outlined-light'}
                        title={item?.name}
                        height="48px"
                      />
                    );
                  })}

                  <div className="shrink-0 w-[100px] h-[50px] bg-transparent" />
                </>
              )}
            </>
          )}

          {loading || categories?.length < 1 ? null : (
            <>
              <div
                className={cn(
                  'sticky px-[20px] bg-[white]    flex items-center justify-center h-[50px] right-0 top-0 transition-all duration-300 ease-in-out ',
                  !showLeftArrow ? 'opacity-100' : 'opacity-0'
                )}
              >
                <button
                  className={cn(
                    'transition-all duration-300 ease-in-out w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-gray-200 darkremove:hover:bg-gray-700 outline-none',
                    !showLeftArrow ? 'opacity-100' : 'opacity-0'
                  )}
                  onClick={() => {
                    scrollTo({ type: 'end' }); // Add this
                  }}
                >
                  <span className="text-black  ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current"
                    >
                      <path
                        d="M4 12H20M20 12L14 6M20 12L14 18"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DiscoverFilter;
