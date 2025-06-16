"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menus } from "./constants";

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathName = usePathname();

  return (
    <div className="w-full md:w-[352px] border-[#F8F8F8] border shadow-lg rounded-[16px] py-[24px] bg-white h-full overflow-y-auto">
      {/* Close button for mobile */}
      {onClose && (
        <div className="flex justify-end px-4 mb-2 md:hidden">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <h1 className="text-[#111111] text-[24px] leading-[32px] font-[400] px-[24px]">
        Menu
      </h1>

      <div className="mt-6">
        <div className="flex flex-col gap-2" role="listitem">
          {menus.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="inline-flex items-center w-full"
              role="list"
            >
              <div
                className={`inline-flex items-center w-full py-[12px] px-[24px] gap-[16px] ${
                  pathName === item.link ? "bg-[#272727]" : ""
                }`}
              >
                {item?.type === "action"
                  ? item?.leftIcon
                  : pathName === item.link
                  ? item.leftIconActive
                  : item.leftIconInActive}

                <span
                  className={`text-[12px] lg:text-[14px] font-medium leading-[20px] lg:leading-[22px] ${
                    item?.textColor
                      ? `text-[${item?.textColor}]`
                      : pathName === item.link
                      ? "text-[#fafafa]"
                      : "text-[#4e4e4e]"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
