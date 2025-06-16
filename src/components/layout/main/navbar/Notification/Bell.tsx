'use client';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from './dropdown';

import NotificationItem from './NotificationItem';
import Button from '@/components/reuseables/Button';
import { TNotification } from '@/types';
import { useGetNotifications, useReadAllNotification, useReadNotification } from '@/hooks/api/notifications';
import './styles.css';

type Props = {};

const Dropdown = (props: Props) => {
  const { data: notifications, onGetNotifications } = useGetNotifications();
  const { onReadNotification } = useReadNotification();
  const { onReadAllNotification, loading } = useReadAllNotification();

  const handleRead = async (notificationId: string) => {
    await onReadNotification({ notificationId });
    onGetNotifications();
  };

  const handleReadAll = async () => {
    await onReadAllNotification();
    onGetNotifications();
  };

  const unreadNotifications = notifications.filter((notification) => notification.readAt === null);
  const readNotifications = notifications.filter((notification) => typeof notification.readAt === 'string');

  const isInLastNDays = (date: string, n: number) => {
    const now = new Date();
    const targetDate = new Date(date);
    const differenceInTime = now.getTime() - targetDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= n;
  };

  const last24Hours = readNotifications
    ?.filter((notification) => isInLastNDays(notification.createdAt, 1))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const last7Days = readNotifications
    ?.filter((notification) => isInLastNDays(notification.createdAt, 7) && !isInLastNDays(notification.createdAt, 1))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const last30Days = readNotifications
    ?.filter((notification) => isInLastNDays(notification.createdAt, 30) && !isInLastNDays(notification.createdAt, 7))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const olderThan30Days = readNotifications
    ?.filter((notification) => !isInLastNDays(notification.createdAt, 30))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="h-[44px]">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none h-fit">
          <div className="relative h-fit flex justify-center items-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current"
            >
              <path
                d="M29 19.7041V19C29 15.134 25.866 12 22 12C18.134 12 15 15.134 15 19V19.7041C15 20.5491 14.7499 21.3752 14.2812 22.0783L13.1326 23.8012C12.0834 25.3749 12.8844 27.5139 14.7091 28.0116C19.4825 29.3134 24.5175 29.3134 29.2909 28.0116C31.1157 27.5139 31.9166 25.3749 30.8674 23.8012L29.7188 22.0783C29.2501 21.3752 29 20.5491 29 19.7041Z"
                className="stroke-current"
                strokeWidth="1.5"
              />
              <path
                d="M17.5 29C18.155 30.7478 19.9225 32 22 32C24.0775 32 25.845 30.7478 26.5 29"
                className="stroke-current"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {unreadNotifications.length >= 1 ? (
              <div className="absolute top-[3px] right-[3px] transform translate-x-1/7 -translate-y-1/7 bg-[#FF0000] select-none text-white text-xs font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full p-[2px]">
                <p className="leading-none text-[10px]">{unreadNotifications.length}</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-[12px] w-[100vw] md:w-[458px] notificationContainer">
          <DropdownMenuLabel className="sticky top-0 bg-inherit   border-b border-[1px]">
            <div className="p-5 flex flex-row justify-between items-center">
              <h1 className="font-medium text-[18px] md:text-[24px] leading-[24px] text-[#000]   capitalize darkremove:text-[#ffffff]">
                Notifications {unreadNotifications.length > 0 ? `(${unreadNotifications.length})` : ''}
              </h1>
              {/* {unreadNotifications.length > 0 ? ( */}
              <Button
                variant="secondary"
                title="Mark all as read"
                height="38px"
                loading={loading}
                onClick={() => {
                  handleReadAll();
                }}
              />
              {/* ) : (
                ''
              )} */}
            </div>
          </DropdownMenuLabel>

          {!notifications ? (
            <div className="flex flex-col w-full h-fit justify-center items-center gap-[24px] py-[54px]">
              <img src="/icons/no-notification.svg" alt="notification bell" />
              <p className="">This is where your notifications will appear</p>
            </div>
          ) : (
            <>
              {' '}
              {unreadNotifications.length > 0 && (
                <div className="p-5 border-b border[1px] border-[#E7E7E7]  ">
                  <h2>New</h2>
                </div>
              )}
              {unreadNotifications?.map((notification, index) => (
                <NotificationItem
                  message={notification.message}
                  timestamp={notification.createdAt}
                  isRead={notification.readAt !== null && notification.readAt !== ''}
                  notificationType={notification.type}
                  key={index}
                  id={notification.id}
                  onRead={handleRead}
                  link={notification.link}
                />
              ))}
              {last24Hours.length > 0 && (
                <div className="p-5 border-b border[1px] border-[#E7E7E7]  ">
                  <h2>Recent</h2>
                </div>
              )}
              {last24Hours?.map((notification, index) => (
                <NotificationItem
                  message={notification.message}
                  timestamp={notification.createdAt}
                  isRead={notification.readAt !== null && notification.readAt !== ''}
                  notificationType={notification.type}
                  key={index}
                  id={notification.id}
                  onRead={handleRead}
                  link={notification.link}
                />
              ))}
              {last7Days.length > 0 && (
                <div className="p-5 border-b border[1px] border-[#E7E7E7]  ">
                  <h2>Last 7 days</h2>
                </div>
              )}
              {last7Days?.map((notification, index) => (
                <NotificationItem
                  message={notification.message}
                  timestamp={notification.createdAt}
                  isRead={notification.readAt !== null && notification.readAt !== ''}
                  notificationType={notification.type}
                  key={index}
                  id={notification.id}
                  onRead={handleRead}
                  link={notification.link}
                />
              ))}
              {last30Days.length > 0 && (
                <div className="p-5 border-b border[1px] border-[#E7E7E7]  ">
                  <h2>Last 30 days</h2>
                </div>
              )}
              {last30Days?.map((notification, index) => (
                <NotificationItem
                  message={notification.message}
                  timestamp={notification.createdAt}
                  isRead={notification.readAt !== null && notification.readAt !== ''}
                  notificationType={notification.type}
                  key={index}
                  id={notification.id}
                  onRead={handleRead}
                  link={notification.link}
                />
              ))}
              {olderThan30Days.length > 0 && (
                <div className="p-5 border-b border[1px] border-[#E7E7E7]  ">
                  <h2>Older</h2>
                </div>
              )}
              {olderThan30Days?.map((notification, index) => (
                <NotificationItem
                  message={notification.message}
                  timestamp={notification.createdAt}
                  isRead={notification.readAt !== null && notification.readAt !== ''}
                  notificationType={notification.type}
                  key={index}
                  id={notification.id}
                  onRead={handleRead}
                  link={notification.link}
                />
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
