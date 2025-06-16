import React from 'react';
import { timeAgo } from '@/utils/text/notificationTIme';
import Link from 'next/link';

export type NotificationItemProps = {
  message: string;
  notificationType: number;
  timestamp: string;
  isRead: boolean;
  // image?: boolean;
  id: string;
  link: string;
  onRead: (id: string) => void;
};

const NotificationItem = ({
  id,
  message,
  notificationType,
  timestamp,
  isRead,
  link,
  onRead,
}: NotificationItemProps) => {
  const handleNotificationClick = () => {
    onRead(id);
  };
  const formattedTime = timeAgo(timestamp);

  const iconSrc =
    notificationType === 6
      ? 'approved'
      : notificationType === 17
      ? 'like'
      : notificationType === 7
      ? 'rejected'
      : notificationType === 2
      ? 'password'
      : notificationType === 3 || notificationType === 4
      ? 'profile'
      : notificationType === 18
      ? 'goodness'
      : notificationType === 19
      ? 'goodness'
      : notificationType === 16
      ? 'comment'
      : 'important';

  return (
    <div
      onClick={handleNotificationClick}
      className={`flex gap-5 flex-row items-start h-fit p-5 border-b border[1px] border-[#E7E7E7]   ${
        !isRead ? 'bg-[#F3F3F3]  ' : '  text-[#4E4E4E] darkremove:text-[#8E8E8E]'
      } darkremove:hover:bg-[#1d1d1d] hover:bg-[#F3F3F3] min-h-[89px] cursor-pointer`}
    >
      <span>
        <img src={`/icons/${iconSrc}.svg`} alt="" />
      </span>

      <div className="flex-1 h-full flex flex-row justify-between items-start w-[210px] md:w-[264px]">
        <div className="flex flex-col gap-3">
          <span className="w-[254px]">
            <p className="text-sm">
              {notificationType === 2 ? (
                <span>
                  Your password has been successfully reset. If this wasn’t you, please contact{' '}
                  <a href={link ? link : ''} className="text-blue-600">
                    support.
                  </a>
                </span>
              ) : notificationType === 4 ? (
                <span>
                  Your account has been suspended. Please contact{' '}
                  <a href={link ? link : ''} className="text-blue-600">
                    support
                  </a>{' '}
                  for assistance
                </span>
              ) : notificationType === 11 ? (
                <span>
                  Exciting news! We've added new features to improve your experience. Learn more{' '}
                  <a href={link ? link : ''} className="text-blue-600">
                    here.
                  </a>
                </span>
              ) : notificationType === 16 ? (
                <span>
                  Mohamed commented on your submission. See their feedback{' '}
                  <a href={link ? link : ''} className="text-blue-600">
                    here.
                  </a>
                </span>
              ) : notificationType === 20 ? (
                <span>
                  New terms of service and privacy policy have been updated. Please review the changes{' '}
                  <a href={link ? link : ''} className="text-blue-600">
                    here.
                  </a>
                </span>
              ) : (
                <>{message}</>
              )}
            </p>
          </span>
          {/* {image ? <img src="/icons/screenshot.webp" alt="" className="w-[85.6px]" /> : ''} */}
        </div>
        <div className="flex h-full flex-col justify-start gap-2 items-center">
          <span className="text-xs text-gray-500 darkremove:text-[#8E8E8E]">{formattedTime}</span>
          {!isRead ? <img src="/icons/unread.svg" alt="unread" /> : ''}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
