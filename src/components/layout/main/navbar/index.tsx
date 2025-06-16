import Button from "@/components/reuseables/Button";
import { resetForm, setTempCredentials } from "@/store/auth/formSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { persistor, RootState } from "@/store/store";
import { resetUser } from "@/store/user/userSlice";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import LogoutModal from "../modal/LogoutModal";
import { resetBooking } from "@/store/booking/bookingSlice";
import { clearQuote } from "@/store/auth/quoteDataSlice";
import { clearQuotesData } from "@/store/auth/quoteSlice";

const chevron_down = (
  <svg
    width="11"
    height="6"
    viewBox="0 0 11 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.36831 0H9.40894C9.96519 0 10.2433 0.671875 9.84956 1.06563L5.83081 5.0875C5.58706 5.33125 5.19019 5.33125 4.94644 5.0875L0.927689 1.06563C0.533939 0.671875 0.812064 0 1.36831 0Z"
      fill="#21222D"
    />
  </svg>
);

const NavbarTop = () => {
  return (
    <div className="max-screen-wrapper bg-[#DC3545]">
      <div className="max-screen-inner h-[46px]">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-[20px]">
            <a href="#">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.69679 19.3644V10.278H5.29419V7.00651H7.69679V4.21222C7.69679 2.01645 9.11603 0 12.3862 0C13.7103 0 14.6894 0.126933 14.6894 0.126933L14.6122 3.18196C14.6122 3.18196 13.6137 3.17224 12.5241 3.17224C11.3448 3.17224 11.1559 3.71569 11.1559 4.61771V7.00651H14.706L14.5515 10.278H11.1559V19.3644H7.69679Z"
                  fill="white"
                />
              </svg>
            </a>

            <a href="#">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 4.09315C19.2645 4.41043 18.4641 4.63877 17.6397 4.72769C18.4956 4.21919 19.1366 3.41583 19.4424 2.46835C18.6391 2.94615 17.7593 3.28119 16.8418 3.45862C16.4583 3.04863 15.9944 2.72202 15.4791 2.49913C14.9639 2.27624 14.4083 2.16186 13.8469 2.1631C11.5755 2.1631 9.74883 4.00422 9.74883 6.26357C9.74883 6.58084 9.78729 6.8981 9.84978 7.20335C6.44875 7.02549 3.41545 5.40069 1.39887 2.913C1.03143 3.54062 0.838874 4.25522 0.841245 4.98247C0.841245 6.40538 1.56471 7.66003 2.66795 8.39793C2.0178 8.37232 1.38287 8.19362 0.814806 7.87635V7.92683C0.814806 9.91938 2.22329 11.5706 4.10047 11.9504C3.74801 12.0419 3.38543 12.0888 3.02128 12.0898C2.75448 12.0898 2.5021 12.0634 2.24732 12.0273C2.7665 13.6521 4.27834 14.8322 6.0786 14.8707C4.67011 15.974 2.9059 16.623 0.990266 16.623C0.646558 16.623 0.329287 16.6108 0 16.5725C1.81709 17.7382 3.97308 18.4112 6.29491 18.4112C13.8325 18.4112 17.957 12.1667 17.957 6.74668C17.957 6.56882 17.957 6.39095 17.945 6.21309C18.743 5.62903 19.4424 4.90555 20 4.09315Z"
                  fill="white"
                />
              </svg>
            </a>

            <a href="#">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99737 6.54357C8.26917 6.54357 6.85884 7.95391 6.85884 9.6821C6.85884 11.4103 8.26917 12.8206 9.99737 12.8206C11.7256 12.8206 13.1359 11.4103 13.1359 9.6821C13.1359 7.95391 11.7256 6.54357 9.99737 6.54357ZM19.4106 9.6821C19.4106 8.38241 19.4224 7.09452 19.3494 5.79719C19.2764 4.29032 18.9326 2.95297 17.8307 1.85107C16.7265 0.746814 15.3915 0.405414 13.8846 0.332425C12.585 0.259435 11.2971 0.271208 9.99972 0.271208C8.70004 0.271208 7.41215 0.259435 6.11482 0.332425C4.60795 0.405414 3.27059 0.749168 2.1687 1.85107C1.06444 2.95532 0.723041 4.29032 0.650052 5.79719C0.577063 7.09687 0.588835 8.38478 0.588835 9.6821C0.588835 10.9794 0.577063 12.2697 0.650052 13.567C0.723041 15.0738 1.0668 16.4112 2.1687 17.5131C3.27295 18.6174 4.60795 18.9588 6.11482 19.0317C7.4145 19.1048 8.7024 19.093 9.99972 19.093C11.2994 19.093 12.5873 19.1048 13.8846 19.0317C15.3915 18.9588 16.7288 18.615 17.8307 17.5131C18.935 16.4089 19.2764 15.0738 19.3494 13.567C19.4247 12.2697 19.4106 10.9818 19.4106 9.6821ZM9.99737 14.5111C7.32503 14.5111 5.16831 12.3544 5.16831 9.6821C5.16831 7.00975 7.32503 4.85304 9.99737 4.85304C12.6697 4.85304 14.8264 7.00975 14.8264 9.6821C14.8264 12.3544 12.6697 14.5111 9.99737 14.5111ZM15.0243 5.78306C14.4003 5.78306 13.8964 5.2792 13.8964 4.65526C13.8964 4.03133 14.4003 3.52746 15.0243 3.52746C15.6481 3.52746 16.152 4.03133 16.152 4.65526C16.1521 4.80342 16.1232 4.95015 16.0665 5.08707C16.0099 5.22399 15.9268 5.34839 15.8221 5.45315C15.7173 5.55792 15.593 5.64098 15.456 5.69759C15.3191 5.7542 15.1724 5.78325 15.0243 5.78306Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
          <div className="flex items-center justify-end flex-1 gap-[24px]">
            <p className="font-poppins text-white text-[14px] hidden lg:inline">
              World Wide Shipping Solutions For Busines
            </p>

            <a href="tel:+01617061220" className="flex items-center gap-[10px]">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.6377 1.31617L7.2867 2.4791C7.8724 3.52858 7.6373 4.90532 6.7148 5.8278C6.7148 5.8278 5.59598 6.9468 7.6246 8.9755C9.6526 11.0035 10.7723 9.8853 10.7723 9.8853C11.6948 8.9628 13.0715 8.7277 14.121 9.3134L15.2839 9.9624C16.8687 10.8468 17.0558 13.0692 15.6629 14.4622C14.8259 15.2992 13.8005 15.9505 12.667 15.9934C10.7589 16.0658 7.5184 15.5829 4.2678 12.3323C1.01723 9.0817 0.53431 5.84122 0.60665 3.93309C0.64962 2.7996 1.3009 1.77423 2.13791 0.93723C3.53086 -0.45572 5.75327 -0.26856 6.6377 1.31617Z"
                  fill="white"
                />
              </svg>

              <span className="font-poppins text-white text-[14px] hidden md:inline">
                0161 706 1220
              </span>
            </a>

            <a
              href="malito:admin@globalcorporatelogistics.com"
              className="flex items-center gap-[10px]"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_47_1752"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="25"
                  height="24"
                >
                  <path d="M24.6001 0H0.600098V24H24.6001V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_47_1752)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.56812 4H18.6321C19.0707 3.99999 19.4492 3.99998 19.7625 4.02135C20.0923 4.04386 20.4222 4.09336 20.7482 4.22836C21.4832 4.53284 22.0673 5.11687 22.3717 5.85195C22.5067 6.17788 22.5562 6.50779 22.5788 6.83762C22.6001 7.15088 22.6001 7.52936 22.6001 7.96801V16.032C22.6001 16.4706 22.6001 16.8491 22.5788 17.1624C22.5562 17.4922 22.5067 17.8221 22.3717 18.1481C22.0673 18.8831 21.4832 19.4672 20.7482 19.7716C20.4222 19.9066 20.0923 19.9561 19.7625 19.9787C19.4492 20 19.0707 20 18.6321 20H6.56811C6.12946 20 5.75098 20 5.43772 19.9787C5.10789 19.9561 4.77798 19.9066 4.45205 19.7716C3.71697 19.4672 3.13294 18.8831 2.82846 18.1481C2.69346 17.8221 2.64396 17.4922 2.62145 17.1624C2.60008 16.8491 2.60009 16.4706 2.6001 16.032V7.96802C2.60009 7.52937 2.60008 7.15088 2.62145 6.83762C2.64396 6.50779 2.69346 6.17788 2.82846 5.85195C3.13294 5.11687 3.71697 4.53284 4.45205 4.22836C4.77798 4.09336 5.10789 4.04386 5.43772 4.02135C5.75098 3.99998 6.12947 3.99999 6.56812 4ZM4.91755 6.27777C5.28124 5.86214 5.913 5.82002 6.32864 6.1837L11.9416 11.095C12.3186 11.4249 12.8816 11.4249 13.2586 11.095L18.8716 6.1837C19.2872 5.82002 19.919 5.86214 20.2826 6.27777C20.6463 6.69341 20.6042 7.32517 20.1886 7.68885L14.5756 12.6002C13.4445 13.5899 11.7557 13.5899 10.6246 12.6002L5.01163 7.68885C4.59599 7.32517 4.55387 6.69341 4.91755 6.27777Z"
                    fill="white"
                  />
                </g>
              </svg>

              <span className="font-poppins text-white text-[14px] hidden md:inline">
                admin@globalcorporatelogistics.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileSidebar = ({
  isOpen,
  onClose,
  pathname,
  user,
  handleLogout,
  setShowLogoutModal,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  user: any;
  handleLogout: () => void;
  setShowLogoutModal: (show: boolean) => void;
}) => {
  const navItems = [
    { id: "home", title: "", link: "/", hideChevron: true },

    // { id: 'track-trace', title: 'Track & Trace', link: '/track-a-parcel', hideChevron: true },
  ];

  const navItemsUser = [
    { id: "home", title: "", link: "/", hideChevron: true },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl flex flex-col">
        {/* Header with user info and close button at the top */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            {user?.email ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName?.slice(0, 1) || user?.email?.slice(0, 1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {user?.firstName || "My Account"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email?.split("@")[0]}
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <button onClick={onClose} className="p-2">
              <Cross1Icon className="size-6" />
            </button>
          </div>

          {/* Logout button positioned right below the user info */}
          {user?.email && (
            <div className="mt-4">
              <Button
                title="Logout"
                variant="outlined-red"
                fullWidth
                onClick={() => setShowLogoutModal(true)}
              />
            </div>
          )}
        </div>

        {/* Navigation content - now appears below the user section */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {!user?.email ? (
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item?.id}
                  href={item?.link}
                  className="font-poppins text-[16px] leading-[24px] font-medium hover:text-[#DC3545] flex items-center justify-between py-2 text-[#21222D]"
                  onClick={onClose}
                >
                  <span>{item?.title}</span>
                  {!item?.hideChevron && chevron_down}
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {navItemsUser.map((item) => (
                <Link
                  key={item?.id}
                  href={item?.link}
                  className="font-poppins text-[16px] leading-[24px] font-medium hover:text-[#DC3545] flex items-center justify-between py-2 text-[#21222D]"
                  onClick={onClose}
                >
                  <span>{item?.title}</span>
                  {!item?.hideChevron && chevron_down}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Auth buttons for non-logged in users at the bottom */}
        {!user?.email &&
          (pathname === "/" || pathname?.startsWith("/auth")) && (
            <div className="border-t p-4">
              <div className="flex flex-col gap-4">
                <Link href="/auth/login" onClick={onClose}>
                  <Button title="Login" variant="outlined-blue" fullWidth />
                </Link>
                <Link href="/auth/register" onClick={onClose}>
                  <Button title="Get Started" fullWidth />
                </Link>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

const NavbarMain = ({ fixed }: { fixed?: boolean }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scroll, setScroll] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(resetUser());
    setShowLogoutModal(false);
    router.replace("/");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  return (
    <>
      <div
        className={`${
          fixed ? (scroll ? "fixed top-0" : "") : ""
        } transition-all duration-300 ease-in-out max-screen-wrapper bg-white z-[40] border-b`}
      >
        <div className="max-screen-inner h-[96px] flex items-center justify-between px-4">
          <div className="flex items-center gap-10">
            <a href={user?.Role ? "#" : "/"}>
              <img
                src="/images/logo.png"
                className="w-[153px] h-[62px]"
                alt="logo"
              />
            </a>
          </div>

          <div className="flex items-center gap-4">
            {user?.email && (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border">
                    <span className="text-sm font-medium text-gray-700">
                      {user?.firstName?.slice(0, 1) || user?.email?.slice(0, 1)}
                    </span>
                  </div>
                  <span className="hidden lg:inline text-sm font-medium">
                    {user?.firstName || user?.email?.split("@")[0]}
                  </span>
                </div>
                {/* <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                >
                  Logout
                </button> */}
                <Button
                  title="Logout"
                  variant="outlined-red"
                  fullWidth
                  onClick={() => setShowLogoutModal(true)}
                />
              </div>
            )}

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2"
            >
              <HamburgerMenuIcon className="size-[35px]" />
            </button>
          </div>
        </div>
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        pathname={pathname}
        user={user}
        handleLogout={handleLogout}
        setShowLogoutModal={setShowLogoutModal}
      />

      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

function Index({ fixed }: { fixed?: boolean }) {
  return (
    <>
      <NavbarTop />
      <NavbarMain fixed={fixed} />
    </>
  );
}

export default Index;
