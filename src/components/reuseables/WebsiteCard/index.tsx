// 'use client';
// import React, { useEffect, useState } from 'react';
// import { IDesign } from '@/types';
// import { cn } from '@/lib/utils';
// import { useRouter } from 'next/navigation';
// import { Skeleton } from '@/components/ui/skeleton';
// import truncateText from '@/utils/text/truncateText';
// import {
//   useAddDesignToFavourites,
//   useRemoveDesignFromFavourites,
//   useLikeDesign,
//   useUndoLikeDesign,
// } from '@/hooks/api/favourites';
// import Spinner from '../Spinner';

// import CustomTooltip from '@/components/reuseables/WebsiteCardCustomTooltip';
// import { useAuthContext } from '@/context/AuthContext';
// import { SignInPageDialog } from '../SignInDialog';
// import { useGetInteractions, useDeleteDesign } from '@/hooks/api/designs';
// import { showErrorToast } from '@/utils/toaster';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

// function WebsiteCard({
//   card,
//   cardContainerClassName = '',
//   fromFavoritePage = false,
//   fromMyWebsites = false,
//   refreshWebsites,
// }: {
//   card?: IDesign;
//   cardContainerClassName?: string;
//   fromMyWebsites?: boolean;
//   fromFavoritePage?: boolean;
//   refreshWebsites?: () => void;
// }) {
//   const { user } = useAuthContext();
//   const { accessToken } = useAuthContext();
//   const { loading: removing, onRemoveDesignFromFavourites } = useRemoveDesignFromFavourites();
//   const { loading: adding, onAddDesignToFavourites } = useAddDesignToFavourites();

//   const { likeData } = useGetInteractions({ initalFetch: true, designId: card?.id || '', user });

//   const [intData, setIntData] = useState({
//     liked: false,
//     favorited: false,
//     number_of_likes: 0,
//   });

//   useEffect(() => {
//     setIntData((prev) => ({ ...prev, liked: likeData?.liked || false, favorited: likeData?.favorited || false }));
//   }, [likeData]);

//   useEffect(() => {
//     setIntData((prev) => ({ ...prev, number_of_likes: parseInt(`${card?.number_of_likes || 0}`) || 0 }));
//   }, [card]);

//   const [open, setOpen] = useState<boolean | false>(false);

//   const toggleOpen = (): void => {
//     document.body.classList.add('h-screen');
//     document.body.classList.add('overflow-hidden');
//     setOpen(true);
//   };

//   const toggleClose = (): void => {
//     document.body.classList.remove('h-screen');
//     document.body.classList.remove('overflow-hidden');
//     setOpen(false);
//   };

//   const toggleFavourite = async () => {
//     if (!accessToken) {
//       toggleOpen();
//       return;
//     }

//     if (intData.favorited) {
//       try {
//         await onRemoveDesignFromFavourites({
//           payload: { designId: card?.id || '' },
//           successCB: () => {
//             setIntData((prev) => ({ ...prev, favorited: false }));
//             refreshWebsites?.();
//           },
//         });
//       } catch (error) {
//         showErrorToast({ message: 'Failed to remove favorite.' });
//       }
//     } else {
//       try {
//         await onAddDesignToFavourites({
//           payload: { designId: card?.id || '' },
//           successCB: () => {
//             setIntData((prev) => ({ ...prev, favorited: true }));
//             refreshWebsites?.();
//           },
//         });
//       } catch (error) {
//         showErrorToast({ message: 'Failed to add favorite.' });
//       }
//     }
//   };

//   const loadingFavourite = removing || adding;

//   const { loading: liking, onLikeDesign } = useLikeDesign();
//   const { loading: undoliking, onUndoLikeDesign } = useUndoLikeDesign();

//   const toggleLike = async () => {
//     if (!accessToken) {
//       toggleOpen();
//       return;
//     }

//     if (intData.liked) {
//       try {
//         await onUndoLikeDesign({
//           designId: card?.id || '',
//           successCB: () => {
//             setIntData((prev) => ({ ...prev, liked: false, number_of_likes: prev?.number_of_likes - 1 }));
//             refreshWebsites?.();
//           },
//         });
//       } catch (error) {
//         showErrorToast({ message: 'Failed to undo like.' });
//       }
//     } else {
//       try {
//         await onLikeDesign({
//           designId: card?.id || '',
//           successCB: () => {
//             setIntData((prev) => ({ ...prev, liked: true, number_of_likes: prev?.number_of_likes + 1 }));
//             refreshWebsites?.();
//           },
//         });
//       } catch (error) {
//         showErrorToast({ message: 'Failed to like design.' });
//       }
//     }
//   };

//   const loadingLike = liking || undoliking;

//   const interaction = () => {};

//   const router = useRouter();
//   const sitePageUrl = '/sites/' + card?.id;
//   const description = truncateText({ text: card?.description, maxLength: 40 });

//   const isApporved = card?.approvedAt ? true : false;
//   const isRejected = card?.rejectedAt ? true : false;

//   const under_review = !isApporved && !isRejected;
//   const is_my_design = card?.user?.id === user?.user_id;

//   return (
//     <>
//       <a className={cn(cardContainerClassName, 'group cursor-pointer')} onClick={() => router.push(sitePageUrl)}>
//         <div className="bg-[#F3F3F3] p-[10px] h-[200px] border-[1px] border-[#E7E7E7] rounded-[8px] relative overflow-hidden darkremove:border-[#4E4E4E] ">
//           {!card?.site_thumbnail ? null : (
//             <img
//               alt="thumbnail"
//               src={card?.site_thumbnail}
//               className="h-full w-full absolute left-0 top-0 object-cover"
//             />
//           )}
//           <div className="w-full flex items-center justify-between relative z-10">
//             <CustomTooltip content={card?.location?.name}>
//               <div className="w-[30px] h-[20px] border-[2px] border-[#ffffff] rounded-[4px]  cursor-auto shadow-md">
//                 <img
//                   className="w-full h-full object-cover cursor-default"
//                   src={card?.location?.flags?.svg}
//                   // src="/icons/flag-nigeria.svg"
//                   alt="country_icon"
//                 />
//               </div>
//             </CustomTooltip>

//             {isRejected ? (
//               <div className="bg-[#FFEDEF] rounded-[100px] px-[8px]">
//                 <span className="text-[#D1293D] text-[12px] leading-[20px] font-medium">Rejected</span>
//               </div>
//             ) : (
//               <>
//                 <div className="flex gap-2">
//                   {under_review && fromMyWebsites && is_my_design ? (
//                     <div className="bg-[#FF9900] rounded-[100px] px-[8px]">
//                       <span className="text-[#FAFAFA] text-[12px] leading-[20px]">Under Review</span>
//                     </div>
//                   ) : null}
//                   {fromMyWebsites && is_my_design ? <Actions card={card} refresh={refreshWebsites} /> : null}
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="w-full h-full top-0 left-0 absolute bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)] h-200 rounded-[8px]  hidden group-hover:flex">
//             <div className="flex gap-[8px] p-[24px] mt-auto justify-end w-full items-center">
//               <div className="w-[32px] h-[32px] bg-red-200 rounded-full flex items-center justify-center">
//                 <CustomTooltip content={intData?.liked === true ? 'Undo like' : 'Like'}>
//                   <button
//                     className="transition-all duration-300 ease-in-out hover:scale-110"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       e.preventDefault();
//                       if (!loadingLike) toggleLike();
//                     }}
//                   >
//                     <div className="w-[36px] h-[36px] bg-[#FFFFFF] rounded-full p-0 m-0 flex items-center justify-center">
//                       {loadingLike ? (
//                         <Spinner className="p-0 m-0" />
//                       ) : intData?.liked === true ? (
//                         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <g clipPath="url(#clip0_370_53432)">
//                             <path
//                               d="M9.00076 3.39673C10.7625 1.81498 13.485 1.86749 15.1823 3.56773C16.8788 5.26873 16.9373 7.97773 15.3593 9.74473L8.99925 16.1137L2.64075 9.74473C1.06275 7.97773 1.122 5.26423 2.81775 3.56773C4.5165 1.86974 7.23376 1.81273 9.00076 3.39673V3.39673Z"
//                               fill="#111111"
//                             />
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_370_53432">
//                               <rect width="18" height="18" fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       ) : (
//                         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <g clipPath="url(#clip0_369_53399)">
//                             <path
//                               d="M9.00076 3.39673C10.7625 1.81498 13.485 1.86749 15.1823 3.56773C16.8788 5.26873 16.9373 7.97773 15.3593 9.74473L8.99925 16.1137L2.64075 9.74473C1.06275 7.97773 1.122 5.26423 2.81775 3.56773C4.5165 1.86974 7.23376 1.81273 9.00076 3.39673V3.39673ZM14.1203 4.62748C12.9953 3.50098 11.1803 3.45524 10.0028 4.51273L9.0015 5.41123L7.99951 4.51348C6.81825 3.45449 5.007 3.50098 3.879 4.62898C2.7615 5.74648 2.70525 7.53523 3.735 8.71723L9 13.9905L14.265 8.71798C15.2955 7.53523 15.2393 5.74873 14.1203 4.62748V4.62748Z"
//                               fill="#111111"
//                             />
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_369_53399">
//                               <rect width="18" height="18" fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       )}
//                     </div>
//                   </button>
//                 </CustomTooltip>
//               </div>
//               <CustomTooltip content={intData?.favorited === true ? 'Undo Save' : 'Save'}>
//                 <div className="w-[32px] h-[32px] bg-red-200 rounded-full flex items-center justify-center">
//                   <button
//                     className={cn(
//                       'transition-all duration-300 ease-in-out hover:scale-110',

//                       loadingFavourite ? 'cursor-not-allowed' : ''
//                     )}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       e.preventDefault();
//                       if (!loadingFavourite) toggleFavourite();
//                     }}
//                   >
//                     <div className="w-[36px] h-[36px] bg-[#FFFFFF] rounded-full p-0 m-0 flex items-center justify-center">
//                       {loadingFavourite ? (
//                         <Spinner className="p-0 m-0" />
//                       ) : intData?.favorited === true ? (
//                         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <g clipPath="url(#clip0_370_53434)">
//                             <path
//                               d="M3.75 1.5H14.25C14.4489 1.5 14.6397 1.57902 14.7803 1.71967C14.921 1.86032 15 2.05109 15 2.25V16.6072C15.0001 16.6743 14.9822 16.7402 14.9482 16.7979C14.9142 16.8557 14.8653 16.9033 14.8066 16.9358C14.7479 16.9683 14.6816 16.9844 14.6146 16.9826C14.5476 16.9807 14.4823 16.9609 14.4255 16.9252L9 13.5225L3.5745 16.9245C3.51778 16.9601 3.45254 16.9799 3.38558 16.9818C3.31861 16.9837 3.25236 16.9676 3.19372 16.9352C3.13508 16.9029 3.08618 16.8554 3.05211 16.7977C3.01804 16.74 3.00005 16.6742 3 16.6072V2.25C3 2.05109 3.07902 1.86032 3.21967 1.71967C3.36032 1.57902 3.55109 1.5 3.75 1.5Z"
//                               fill="#111111"
//                             />
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_370_53434">
//                               <rect width="18" height="18" fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       ) : (
//                         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <g clipPath="url(#clip0_369_53401)">
//                             <path
//                               d="M3.75 1.5H14.25C14.4489 1.5 14.6397 1.57902 14.7803 1.71967C14.921 1.86032 15 2.05109 15 2.25V16.6072C15.0001 16.6743 14.9822 16.7402 14.9482 16.7979C14.9142 16.8557 14.8653 16.9033 14.8066 16.9358C14.7479 16.9683 14.6816 16.9844 14.6146 16.9826C14.5476 16.9807 14.4823 16.9609 14.4255 16.9252L9 13.5225L3.5745 16.9245C3.51778 16.9601 3.45254 16.9799 3.38558 16.9818C3.31861 16.9837 3.25236 16.9676 3.19372 16.9352C3.13508 16.9029 3.08618 16.8554 3.05211 16.7977C3.01804 16.74 3.00005 16.6742 3 16.6072V2.25C3 2.05109 3.07902 1.86032 3.21967 1.71967C3.36032 1.57902 3.55109 1.5 3.75 1.5ZM13.5 3H4.5V14.574L9 11.7532L13.5 14.574V3Z"
//                               fill="#111111"
//                             />
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_369_53401">
//                               <rect width="18" height="18" fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       )}
//                     </div>
//                   </button>
//                 </div>
//               </CustomTooltip>
//               <CustomTooltip content="Open">
//                 <div className="w-[32px] h-[32px] bg-red-200 rounded-full flex items-center justify-center">
//                   <button
//                     className={cn(
//                       'transition-all duration-300 ease-in-out hover:scale-110',

//                       loadingFavourite ? 'cursor-not-allowed' : ''
//                     )}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       window.open(card?.link, '_blank');
//                     }}
//                   >
//                     <div className="w-[36px] h-[36px] bg-[#FFFFFF] rounded-full p-0 m-0 flex items-center justify-center">
//                       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <g clipPath="url(#clip0_369_53403)">
//                           <path
//                             d="M7.5 4.5V6H3.75V14.25H12V10.5H13.5V15C13.5 15.1989 13.421 15.3897 13.2803 15.5303C13.1397 15.671 12.9489 15.75 12.75 15.75H3C2.80109 15.75 2.61032 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15V5.25C2.25 5.05109 2.32902 4.86032 2.46967 4.71967C2.61032 4.57902 2.80109 4.5 3 4.5H7.5ZM15.75 2.25V8.25H14.25V4.80975L8.40525 10.6552L7.34475 9.59475L13.1887 3.75H9.75V2.25H15.75Z"
//                             fill="#111111"
//                           />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_369_53403">
//                             <rect width="18" height="18" fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                     </div>
//                   </button>
//                 </div>
//               </CustomTooltip>
//             </div>
//           </div>
//         </div>

//         <a href={sitePageUrl} className="w-full flex gap-[10px] mt-[12px] ">
//           <div className="w-[40px] h-[40px] bg-[#E7E7E7] rounded-full overflow-hidden shrink-0">
//             {card?.site_icon ? <img src={card?.site_icon} className="w-full h-full" alt="site" /> : ''}
//           </div>

//           <div className="group/title w-full">
//             <div className="w-full flex justify-between">
//               <p className="w-[170px] truncate text-[#111111] darkremove:text-[#ffffff] text-[14px] leading-[20px] group-hover/title:underline">
//                 {card?.name}
//               </p>

//               <div className="flex ml-auto items-start gap-[16px]">
//                 <div className=" flex gap-[6px] items-center ">
//                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <g clipPath="url(#clip0_370_53477)">
//                       <path
//                         d="M8.00132 3.01932C9.56732 1.61332 11.9873 1.65999 13.496 3.17132C15.004 4.68332 15.056 7.09132 13.6533 8.66199L7.99999 14.3233L2.34799 8.66199C0.945322 7.09132 0.997989 4.67932 2.50532 3.17132C4.01532 1.66199 6.43066 1.61132 8.00132 3.01932V3.01932ZM12.552 4.11332C11.552 3.11199 9.93866 3.07132 8.89199 4.01132L8.00199 4.80999L7.11132 4.01199C6.06132 3.07065 4.45132 3.11199 3.44866 4.11465C2.45532 5.10799 2.40532 6.69799 3.32066 7.74865L8.00066 12.436L12.6807 7.74932C13.5967 6.69799 13.5467 5.10999 12.552 4.11332V4.11332Z"
//                         fill="#4E4E4E"
//                       />
//                     </g>
//                     <defs>
//                       <clipPath id="clip0_370_53477">
//                         <rect width="16" height="16" fill="white" />
//                       </clipPath>
//                     </defs>
//                   </svg>

//                   <span className="text-[#4E4E4E] text-[12px] leading-[20px] font-medium">
//                     {intData?.number_of_likes || '0'}
//                   </span>
//                 </div>
//                 <div className=" flex gap-[6px] items-center ">
//                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35865 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667V12.6667ZM7.99978 11C7.20413 11 6.44107 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44107 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82127 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82127 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
//                       fill="#4E4E4E"
//                     />
//                   </svg>

//                   <span className="text-[#4E4E4E] text-[12px] leading-[20px] font-medium">
//                     {card?.number_of_views || '0'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-[#4E4E4E] text-[12px] leading-[16px] mt-1 truncate">{description || '---'}</p>
//           </div>
//         </a>
//       </a>

//       <SignInPageDialog onClose={toggleClose} open={open} redirectTo="stayOnPage" />
//     </>
//   );
// }

// export default WebsiteCard;

// export const WebsiteCardSkeleton = ({ cardContainerClassName }: { cardContainerClassName?: string }) => {
//   return (
//     <a className={cn(cardContainerClassName)}>
//       <Skeleton
//         className={cn(
//           'bg-[#F3F3F3] p-[10px] h-[200px] border-[1px]   border-[#E7E7E7] rounded-[8px] relative '
//         )}
//       />

//       <div className="w-full flex gap-[16px] mt-[12px]">
//         <Skeleton className="w-[40px] h-[40px] bg-[#E7E7E7] shrink-0 rounded-full overflow-hidden" />
//         <div className="flex-1 flex flex-col  h-[40px] justify-around ">
//           <Skeleton className="w-full h-[6px] bg-[#E7E7E790] overflow-hidden" />
//           <Skeleton className="w-full h-[6px] bg-[#E7E7E790] overflow-hidden" />
//           <Skeleton className="w-full h-[6px] bg-[#E7E7E790] overflow-hidden" />
//         </div>
//       </div>
//     </a>
//   );
// };

// const Actions = ({ card, refresh }: { card?: IDesign; refresh?: any }) => {
//   const router = useRouter();

//   const [open, setOpen] = React.useState(false);
//   const close = () => setOpen(false);

//   const { loading: deleting, onDeleteDesign } = useDeleteDesign();

//   const d = () => {
//     onDeleteDesign({
//       designId: card?.id,
//       successCallback: () => {
//         refresh?.();
//         close?.();
//       },
//     });
//   };

//   const openDeleteDesign = (design_id: string) => {
//     if (!open) {
//       setOpen(true);
//     } else {
//       d();
//     }
//   };
//   if (deleting)
//     return (
//       <div className="bg-white darkremove:bg-gray-600 flex items-center justify-center rounded-full h-[20px] w-[20px] p-1">
//         <Spinner className="m-0 p-0" />
//       </div>
//     );
//   return (
//     <>
//       {/* {!open ? null : (
//         <div className="fixed inset-[-2] z-40 flex items-center justify-center bg-black/45">
//           <div className="w-full h-full sm:w-auto sm:h-auto sm:rounded-[24px] bg-white p-4 relative z-50">
//             <div className="p-10">
//               <div>
//                 <div className="flex justify-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M92.1666 49.9997C92.1666 73.0115 73.5118 91.6663 50.4999 91.6663C27.4881 91.6663 8.83325 73.0115 8.83325 49.9997C8.83325 26.9878 27.4881 8.33301 50.4999 8.33301C73.5118 8.33301 92.1666 26.9878 92.1666 49.9997ZM50.4999 73.958C52.2258 73.958 53.6249 72.5589 53.6249 70.833V45.833C53.6249 44.1071 52.2258 42.708 50.4999 42.708C48.774 42.708 47.3749 44.1071 47.3749 45.833V70.833C47.3749 72.5589 48.774 73.958 50.4999 73.958ZM50.4999 29.1663C52.8011 29.1663 54.6666 31.0318 54.6666 33.333C54.6666 35.6342 52.8011 37.4997 50.4999 37.4997C48.1987 37.4997 46.3333 35.6342 46.3333 33.333C46.3333 31.0318 48.1987 29.1663 50.4999 29.1663Z"
//                       fill="#FF9900"
//                     />
//                   </svg>
//                 </div>
//                 <div className="mt-8 text-center">
//                   <h1 className="font-gorditta text-[#111111] text-2xl font-medium ">{'Delete Website'}</h1>
//                   <div className="mt-2">
//                     <div className="text-[#4e4e4e] text-base font-normal  ">
//                       {'Are you sure you want to delete this website?'}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-between gap-6 mt-8">
//                   <button
//                     className="justify-center inline-flex flex-1 items-center  p-3 border-solid border-[1px] bg-white font-medium   text-base leading-6 text-[#111111] rounded-[1000px] select-none"
//                     disabled={deleting}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       e.preventDefault();
//                       close?.();
//                     }}
//                   >
//                     {'Cancel'}
//                   </button>
//                   <button
//                     type="button"
//                     className="justify-center inline-flex flex-1 items-center  p-3 border-solid border-[1px] bg-[#111111] font-medium   text-base leading-6 text-white rounded-[1000px]"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       e.preventDefault();
//                       deleteDesign?.();
//                     }}
//                   >
//                     {deleting ? <Spinner /> : 'Delete'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )} */}

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <button
//             className="shadow-lg rounded-full w-[20px] h-[20px] overflow-hidden flex items-center justify-center"
//             onClick={(e) => {
//               e.stopPropagation();
//               e.preventDefault();
//             }}
//           >
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect y="20" width="20" height="20" rx="10" transform="rotate(-90 0 20)" fill="#E7E7E7" />
//               <path
//                 d="M10 5.3125C9.56853 5.3125 9.21875 5.66228 9.21875 6.09375C9.21875 6.52522 9.56853 6.875 10 6.875C10.4315 6.875 10.7812 6.52522 10.7812 6.09375C10.7812 5.66228 10.4315 5.3125 10 5.3125Z"
//                 stroke="#4E4E4E"
//                 strokeWidth="0.9375"
//               />
//               <path
//                 d="M10 9.21875C9.56853 9.21875 9.21875 9.56853 9.21875 10C9.21875 10.4315 9.56853 10.7812 10 10.7812C10.4315 10.7812 10.7812 10.4315 10.7812 10C10.7812 9.56853 10.4315 9.21875 10 9.21875Z"
//                 stroke="#4E4E4E"
//                 strokeWidth="0.9375"
//               />
//               <path
//                 d="M10 13.125C9.56853 13.125 9.21875 13.4748 9.21875 13.9062C9.21875 14.3377 9.56853 14.6875 10 14.6875C10.4315 14.6875 10.7812 14.3377 10.7812 13.9062C10.7812 13.4748 10.4315 13.125 10 13.125Z"
//                 stroke="#4E4E4E"
//                 strokeWidth="0.9375"
//               />
//             </svg>
//           </button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-[200px]">
//           <button
//             className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               router.push('/user/edit-website/' + card?.id);
//             }}
//           >
//             <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M10.5553 2.91409C11.1142 2.30856 11.3936 2.0058 11.6906 1.82919C12.4071 1.40307 13.2893 1.38982 14.0178 1.79424C14.3197 1.96185 14.6077 2.25609 15.1838 2.84457C15.7599 3.43305 16.0479 3.72729 16.212 4.03569C16.6079 4.77984 16.5949 5.68109 16.1777 6.41303C16.0049 6.71637 15.7085 7.00183 15.1157 7.57276L8.06297 14.3657C6.93966 15.4477 6.378 15.9886 5.67605 16.2628C4.97409 16.537 4.2024 16.5168 2.65902 16.4764L2.44903 16.4709C1.97918 16.4587 1.74425 16.4525 1.60769 16.2975C1.47113 16.1426 1.48977 15.9032 1.52706 15.4246L1.54731 15.1647C1.65226 13.8177 1.70473 13.1441 1.96778 12.5387C2.23083 11.9332 2.68458 11.4416 3.59207 10.4584L10.5553 2.91409Z"
//                 stroke="#14181F"
//                 strokeWidth="1.5"
//                 strokeLinejoin="round"
//               />
//               <path d="M9.75 3L15 8.25" stroke="#14181F" strokeWidth="1.5" strokeLinejoin="round" />
//               <path
//                 d="M10.5 16.5L16.5 16.5"
//                 stroke="#14181F"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>

//             <span>Edit website</span>
//           </button>

//           {!open ? (
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 openDeleteDesign?.(card?.id || '');
//               }}
//               className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]"
//             >
//               <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M7.73202 1.68751H10.2681C10.4304 1.68741 10.5718 1.68732 10.7053 1.70864C11.2328 1.79287 11.6892 2.12186 11.9359 2.59563C11.9984 2.71555 12.043 2.84971 12.0942 3.00371L12.1779 3.25488C12.1921 3.2974 12.1962 3.30943 12.1996 3.31891C12.3309 3.682 12.6715 3.92745 13.0575 3.93723C13.0676 3.93748 13.08 3.93753 13.1251 3.93753H15.3751C15.6857 3.93753 15.9376 4.18937 15.9376 4.50003C15.9376 4.81069 15.6857 5.06253 15.3751 5.06253H2.625C2.31434 5.06253 2.0625 4.81069 2.0625 4.50003C2.0625 4.18937 2.31434 3.93753 2.625 3.93753H4.87506C4.9201 3.93753 4.93253 3.93749 4.94267 3.93723C5.32866 3.92745 5.66918 3.68202 5.80052 3.31893C5.80397 3.30938 5.80794 3.29761 5.82218 3.25488L5.90589 3.00372C5.95711 2.84973 6.00174 2.71555 6.06419 2.59563C6.3109 2.12186 6.76735 1.79287 7.29482 1.70864C7.42834 1.68732 7.56973 1.68741 7.73202 1.68751ZM6.75611 3.93753C6.79475 3.86176 6.82898 3.78303 6.85843 3.70161C6.86737 3.67689 6.87615 3.65057 6.88742 3.61675L6.96227 3.39219C7.03065 3.18706 7.04639 3.14522 7.06201 3.11523C7.14424 2.95731 7.29639 2.84764 7.47222 2.81957C7.50561 2.81423 7.55027 2.81253 7.76651 2.81253H10.2336C10.4499 2.81253 10.4945 2.81423 10.5279 2.81957C10.7037 2.84764 10.8559 2.95731 10.9381 3.11523C10.9537 3.14522 10.9695 3.18705 11.0379 3.39219L11.1127 3.61662L11.1417 3.70163C11.1712 3.78304 11.2054 3.86177 11.244 3.93753H6.75611Z"
//                   fill="#111111"
//                 />
//                 <path
//                   d="M4.43632 6.33761C4.41565 6.02764 4.14762 5.79311 3.83765 5.81377C3.52767 5.83444 3.29314 6.10247 3.31381 6.41245L3.6614 11.6262C3.72552 12.5883 3.77731 13.3654 3.89879 13.9752C4.02509 14.6092 4.23991 15.1387 4.6836 15.5538C5.1273 15.9689 5.66996 16.1481 6.31095 16.2319C6.92747 16.3126 7.70628 16.3125 8.67045 16.3125H9.32963C10.2938 16.3125 11.0727 16.3126 11.6892 16.2319C12.3302 16.1481 12.8728 15.9689 13.3165 15.5538C13.7602 15.1387 13.975 14.6092 14.1013 13.9752C14.2228 13.3654 14.2746 12.5883 14.3387 11.6263L14.6863 6.41245C14.707 6.10247 14.4725 5.83444 14.1625 5.81377C13.8525 5.79311 13.5845 6.02764 13.5638 6.33761L13.2189 11.5119C13.1515 12.5228 13.1034 13.2262 12.998 13.7554C12.8958 14.2688 12.753 14.5405 12.5479 14.7323C12.3429 14.9242 12.0623 15.0485 11.5433 15.1164C11.0082 15.1864 10.3032 15.1875 9.29007 15.1875H8.71005C7.69692 15.1875 6.99192 15.1864 6.45686 15.1164C5.93786 15.0485 5.65724 14.9242 5.45218 14.7323C5.24712 14.5405 5.10437 14.2687 5.00211 13.7554C4.89669 13.2262 4.84867 12.5228 4.78127 11.5119L4.43632 6.33761Z"
//                   fill="#111111"
//                 />
//                 <path
//                   d="M7.0691 7.69032C7.37822 7.65941 7.65386 7.88494 7.68478 8.19406L8.05978 11.9441C8.09069 12.2532 7.86516 12.5288 7.55604 12.5597C7.24692 12.5906 6.97127 12.3651 6.94036 12.056L6.56536 8.306C6.53445 7.99688 6.75998 7.72123 7.0691 7.69032Z"
//                   fill="#111111"
//                 />
//                 <path
//                   d="M10.931 7.69032C11.2402 7.72123 11.4657 7.99688 11.4348 8.306L11.0598 12.056C11.0289 12.3651 10.7532 12.5906 10.4441 12.5597C10.135 12.5288 9.90945 12.2532 9.94036 11.9441L10.3154 8.19406C10.3463 7.88494 10.6219 7.65941 10.931 7.69032Z"
//                   fill="#111111"
//                 />
//               </svg>

//               <span>{'Delete website'}</span>
//             </button>
//           ) : (
//             <div className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]">
//               <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M7.73202 1.68751H10.2681C10.4304 1.68741 10.5718 1.68732 10.7053 1.70864C11.2328 1.79287 11.6892 2.12186 11.9359 2.59563C11.9984 2.71555 12.043 2.84971 12.0942 3.00371L12.1779 3.25488C12.1921 3.2974 12.1962 3.30943 12.1996 3.31891C12.3309 3.682 12.6715 3.92745 13.0575 3.93723C13.0676 3.93748 13.08 3.93753 13.1251 3.93753H15.3751C15.6857 3.93753 15.9376 4.18937 15.9376 4.50003C15.9376 4.81069 15.6857 5.06253 15.3751 5.06253H2.625C2.31434 5.06253 2.0625 4.81069 2.0625 4.50003C2.0625 4.18937 2.31434 3.93753 2.625 3.93753H4.87506C4.9201 3.93753 4.93253 3.93749 4.94267 3.93723C5.32866 3.92745 5.66918 3.68202 5.80052 3.31893C5.80397 3.30938 5.80794 3.29761 5.82218 3.25488L5.90589 3.00372C5.95711 2.84973 6.00174 2.71555 6.06419 2.59563C6.3109 2.12186 6.76735 1.79287 7.29482 1.70864C7.42834 1.68732 7.56973 1.68741 7.73202 1.68751ZM6.75611 3.93753C6.79475 3.86176 6.82898 3.78303 6.85843 3.70161C6.86737 3.67689 6.87615 3.65057 6.88742 3.61675L6.96227 3.39219C7.03065 3.18706 7.04639 3.14522 7.06201 3.11523C7.14424 2.95731 7.29639 2.84764 7.47222 2.81957C7.50561 2.81423 7.55027 2.81253 7.76651 2.81253H10.2336C10.4499 2.81253 10.4945 2.81423 10.5279 2.81957C10.7037 2.84764 10.8559 2.95731 10.9381 3.11523C10.9537 3.14522 10.9695 3.18705 11.0379 3.39219L11.1127 3.61662L11.1417 3.70163C11.1712 3.78304 11.2054 3.86177 11.244 3.93753H6.75611Z"
//                   fill="#111111"
//                 />
//                 <path
//                   d="M4.43632 6.33761C4.41565 6.02764 4.14762 5.79311 3.83765 5.81377C3.52767 5.83444 3.29314 6.10247 3.31381 6.41245L3.6614 11.6262C3.72552 12.5883 3.77731 13.3654 3.89879 13.9752C4.02509 14.6092 4.23991 15.1387 4.6836 15.5538C5.1273 15.9689 5.66996 16.1481 6.31095 16.2319C6.92747 16.3126 7.70628 16.3125 8.67045 16.3125H9.32963C10.2938 16.3125 11.0727 16.3126 11.6892 16.2319C12.3302 16.1481 12.8728 15.9689 13.3165 15.5538C13.7602 15.1387 13.975 14.6092 14.1013 13.9752C14.2228 13.3654 14.2746 12.5883 14.3387 11.6263L14.6863 6.41245C14.707 6.10247 14.4725 5.83444 14.1625 5.81377C13.8525 5.79311 13.5845 6.02764 13.5638 6.33761L13.2189 11.5119C13.1515 12.5228 13.1034 13.2262 12.998 13.7554C12.8958 14.2688 12.753 14.5405 12.5479 14.7323C12.3429 14.9242 12.0623 15.0485 11.5433 15.1164C11.0082 15.1864 10.3032 15.1875 9.29007 15.1875H8.71005C7.69692 15.1875 6.99192 15.1864 6.45686 15.1164C5.93786 15.0485 5.65724 14.9242 5.45218 14.7323C5.24712 14.5405 5.10437 14.2687 5.00211 13.7554C4.89669 13.2262 4.84867 12.5228 4.78127 11.5119L4.43632 6.33761Z"
//                   fill="#111111"
//                 />
//                 <path
//                   d="M7.0691 7.69032C7.37822 7.65941 7.65386 7.88494 7.68478 8.19406L8.05978 11.9441C8.09069 12.2532 7.86516 12.5288 7.55604 12.5597C7.24692 12.5906 6.97127 12.3651 6.94036 12.056L6.56536 8.306C6.53445 7.99688 6.75998 7.72123 7.0691 7.69032Z"
//                   fill="#111111"
//                 />
//                 <path
//                   d="M10.931 7.69032C11.2402 7.72123 11.4657 7.99688 11.4348 8.306L11.0598 12.056C11.0289 12.3651 10.7532 12.5906 10.4441 12.5597C10.135 12.5288 9.90945 12.2532 9.94036 11.9441L10.3154 8.19406C10.3463 7.88494 10.6219 7.65941 10.931 7.69032Z"
//                   fill="#111111"
//                 />
//               </svg>

//               <div className="flex flex-1 gap-2">
//                 <span>{'Confirm?'}</span>
//                 <button
//                   className="ml-auto"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     openDeleteDesign?.(card?.id || '');
//                   }}
//                 >
//                   <CheckCircledIcon className="size-[22px] text-green-500" />
//                 </button>

//                 <button
//                   // className="ml-auto"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     setOpen(false);
//                   }}
//                 >
//                   <CrossCircledIcon className="size-[22px] text-red-500" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// };

'use client';
import React, { useEffect, useState } from 'react';
import { IDesign } from '@/types';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import truncateText from '@/utils/text/truncateText';
import {
  useAddDesignToFavourites,
  useRemoveDesignFromFavourites,
  useLikeDesign,
  useUndoLikeDesign,
} from '@/hooks/api/favourites';
import Spinner from '../Spinner';

import CustomTooltip from '@/components/reuseables/WebsiteCardCustomTooltip';
import { useAuthContext } from '@/context/AuthContext';
import { SignInPageDialog } from '../SignInDialog';
import { useGetInteractions, useDeleteDesign } from '@/hooks/api/designs';
import { showErrorToast } from '@/utils/toaster';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

function WebsiteCard({
  card,
  cardContainerClassName = '',
  fromFavoritePage = false,
  fromMyWebsites = false,
  refreshWebsites,
}: {
  card?: IDesign;
  cardContainerClassName?: string;
  fromMyWebsites?: boolean;
  fromFavoritePage?: boolean;
  refreshWebsites?: () => void;
}) {
  const { user } = useAuthContext();
  const { accessToken } = useAuthContext();
  const { loading: removing, onRemoveDesignFromFavourites } = useRemoveDesignFromFavourites();
  const { loading: adding, onAddDesignToFavourites } = useAddDesignToFavourites();

  const { likeData } = useGetInteractions({ initalFetch: true, designId: card?.id || '', user });

  const [intData, setIntData] = useState({
    liked: false,
    favorited: false,
    number_of_likes: 0,
  });

  useEffect(() => {
    setIntData((prev) => ({ ...prev, liked: likeData?.liked || false, favorited: likeData?.favorited || false }));
  }, [likeData]);

  useEffect(() => {
    setIntData((prev) => ({ ...prev, number_of_likes: parseInt(`${card?.number_of_likes || 0}`) || 0 }));
  }, [card]);

  const [open, setOpen] = useState<boolean | false>(false);

  const toggleOpen = (): void => {
    document.body.classList.add('h-screen');
    document.body.classList.add('overflow-hidden');
    setOpen(true);
  };

  const toggleClose = (): void => {
    document.body.classList.remove('h-screen');
    document.body.classList.remove('overflow-hidden');
    setOpen(false);
  };

  const toggleFavourite = async () => {
    if (!accessToken) {
      toggleOpen();
      return;
    }

    if (intData.favorited) {
      try {
        await onRemoveDesignFromFavourites({
          payload: { designId: card?.id || '' },
          successCB: () => {
            setIntData((prev) => ({ ...prev, favorited: false }));
            refreshWebsites?.();
          },
        });
      } catch (error) {
        showErrorToast({ message: 'Failed to remove favorite.' });
      }
    } else {
      try {
        await onAddDesignToFavourites({
          payload: { designId: card?.id || '' },
          successCB: () => {
            setIntData((prev) => ({ ...prev, favorited: true }));
            refreshWebsites?.();
          },
        });
      } catch (error) {
        showErrorToast({ message: 'Failed to add favorite.' });
      }
    }
  };

  const loadingFavourite = removing || adding;

  const { loading: liking, onLikeDesign } = useLikeDesign();
  const { loading: undoliking, onUndoLikeDesign } = useUndoLikeDesign();

  const toggleLike = async () => {
    if (!accessToken) {
      toggleOpen();
      return;
    }

    if (intData.liked) {
      try {
        await onUndoLikeDesign({
          designId: card?.id || '',
          successCB: () => {
            setIntData((prev) => ({ ...prev, liked: false, number_of_likes: prev?.number_of_likes - 1 }));
            refreshWebsites?.();
          },
        });
      } catch (error) {
        showErrorToast({ message: 'Failed to undo like.' });
      }
    } else {
      try {
        await onLikeDesign({
          designId: card?.id || '',
          successCB: () => {
            setIntData((prev) => ({ ...prev, liked: true, number_of_likes: prev?.number_of_likes + 1 }));
            refreshWebsites?.();
          },
        });
      } catch (error) {
        showErrorToast({ message: 'Failed to like design.' });
      }
    }
  };

  const loadingLike = liking || undoliking;

  const interaction = () => { };

  const router = useRouter();
  const sitePageUrl = '/sites/' + card?.id;
  const description = truncateText({ text: card?.description, maxLength: 40 });

  const isApporved = card?.approvedAt ? true : false;
  const isRejected = card?.rejectedAt ? true : false;

  const under_review = !isApporved && !isRejected;
  const is_my_design = card?.user?.id === user?.user_id;

  return (
    <>
      <a className={cn(cardContainerClassName, 'group cursor-pointer')} onClick={() => router.push(sitePageUrl)}>
        <div className="bg-[#F3F3F3] p-[10px] h-[200px] border-[1px] border-[#E7E7E7] rounded-[8px] relative overflow-hidden darkremove:border-[#4E4E4E] ">
          {!card?.site_thumbnail ? null : (
            <img
              alt="thumbnail"
              src={card?.site_thumbnail}
              className="h-full w-full absolute left-0 top-0 object-cover"
            />
          )}
          <div className="w-full flex items-center justify-between relative z-10">
            <CustomTooltip content={card?.location?.name}>
              <div className="w-[30px] h-[20px] border-[2px] border-[#ffffff] rounded-[4px]  cursor-auto shadow-md">
                <img
                  className="w-full h-full object-cover cursor-default"
                  src={card?.location?.flags?.svg}
                  // src="/icons/flag-nigeria.svg"
                  alt="country_icon"
                />
              </div>
            </CustomTooltip>

            {isRejected ? (
              <div className="bg-[#FFEDEF] rounded-[100px] px-[8px]">
                <span className="text-[#D1293D] text-[12px] leading-[20px] font-medium">Rejected</span>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  {under_review && fromMyWebsites && is_my_design ? (
                    <div className="bg-[#FF9900] rounded-[100px] px-[8px]">
                      <span className="text-[#FAFAFA] text-[12px] leading-[20px]">Under Review</span>
                    </div>
                  ) : null}
                  {fromMyWebsites && is_my_design ? <Actions card={card} refresh={refreshWebsites} /> : null}
                </div>
              </>
            )}
          </div>

          <div className="w-full h-full top-0 left-0 absolute bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.6)] h-200 rounded-[8px]  hidden group-hover:flex">
            <div className="flex gap-[8px] p-[24px] mt-auto justify-end w-full items-center">
              <div className="w-[32px] h-[32px] bg-red-200 rounded-full flex items-center justify-center">
                <CustomTooltip content={intData?.liked === true ? 'Undo like' : 'Like'}>
                  <button
                    className="transition-all duration-300 ease-in-out hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (!loadingLike) toggleLike();
                    }}
                  >
                    <div className="w-[36px] h-[36px] bg-[#FFFFFF] rounded-full p-0 m-0 flex items-center justify-center">
                      {loadingLike ? (
                        <Spinner className="p-0 m-0" />
                      ) : intData?.liked === true ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_370_53432)">
                            <path
                              d="M9.00076 3.39673C10.7625 1.81498 13.485 1.86749 15.1823 3.56773C16.8788 5.26873 16.9373 7.97773 15.3593 9.74473L8.99925 16.1137L2.64075 9.74473C1.06275 7.97773 1.122 5.26423 2.81775 3.56773C4.5165 1.86974 7.23376 1.81273 9.00076 3.39673V3.39673Z"
                              fill="#111111"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_370_53432">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_369_53399)">
                            <path
                              d="M9.00076 3.39673C10.7625 1.81498 13.485 1.86749 15.1823 3.56773C16.8788 5.26873 16.9373 7.97773 15.3593 9.74473L8.99925 16.1137L2.64075 9.74473C1.06275 7.97773 1.122 5.26423 2.81775 3.56773C4.5165 1.86974 7.23376 1.81273 9.00076 3.39673V3.39673ZM14.1203 4.62748C12.9953 3.50098 11.1803 3.45524 10.0028 4.51273L9.0015 5.41123L7.99951 4.51348C6.81825 3.45449 5.007 3.50098 3.879 4.62898C2.7615 5.74648 2.70525 7.53523 3.735 8.71723L9 13.9905L14.265 8.71798C15.2955 7.53523 15.2393 5.74873 14.1203 4.62748V4.62748Z"
                              fill="#111111"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_369_53399">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                    </div>
                  </button>
                </CustomTooltip>
              </div>
              <CustomTooltip content={intData?.favorited === true ? 'Undo Save' : 'Save'}>
                <div className="w-[32px] h-[32px] bg-red-200 rounded-full flex items-center justify-center">
                  <button
                    className={cn(
                      'transition-all duration-300 ease-in-out hover:scale-110',

                      loadingFavourite ? 'cursor-not-allowed' : ''
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (!loadingFavourite) toggleFavourite();
                    }}
                  >
                    <div className="w-[36px] h-[36px] bg-[#FFFFFF] rounded-full p-0 m-0 flex items-center justify-center">
                      {loadingFavourite ? (
                        <Spinner className="p-0 m-0" />
                      ) : intData?.favorited === true ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_370_53434)">
                            <path
                              d="M3.75 1.5H14.25C14.4489 1.5 14.6397 1.57902 14.7803 1.71967C14.921 1.86032 15 2.05109 15 2.25V16.6072C15.0001 16.6743 14.9822 16.7402 14.9482 16.7979C14.9142 16.8557 14.8653 16.9033 14.8066 16.9358C14.7479 16.9683 14.6816 16.9844 14.6146 16.9826C14.5476 16.9807 14.4823 16.9609 14.4255 16.9252L9 13.5225L3.5745 16.9245C3.51778 16.9601 3.45254 16.9799 3.38558 16.9818C3.31861 16.9837 3.25236 16.9676 3.19372 16.9352C3.13508 16.9029 3.08618 16.8554 3.05211 16.7977C3.01804 16.74 3.00005 16.6742 3 16.6072V2.25C3 2.05109 3.07902 1.86032 3.21967 1.71967C3.36032 1.57902 3.55109 1.5 3.75 1.5Z"
                              fill="#111111"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_370_53434">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_369_53401)">
                            <path
                              d="M3.75 1.5H14.25C14.4489 1.5 14.6397 1.57902 14.7803 1.71967C14.921 1.86032 15 2.05109 15 2.25V16.6072C15.0001 16.6743 14.9822 16.7402 14.9482 16.7979C14.9142 16.8557 14.8653 16.9033 14.8066 16.9358C14.7479 16.9683 14.6816 16.9844 14.6146 16.9826C14.5476 16.9807 14.4823 16.9609 14.4255 16.9252L9 13.5225L3.5745 16.9245C3.51778 16.9601 3.45254 16.9799 3.38558 16.9818C3.31861 16.9837 3.25236 16.9676 3.19372 16.9352C3.13508 16.9029 3.08618 16.8554 3.05211 16.7977C3.01804 16.74 3.00005 16.6742 3 16.6072V2.25C3 2.05109 3.07902 1.86032 3.21967 1.71967C3.36032 1.57902 3.55109 1.5 3.75 1.5ZM13.5 3H4.5V14.574L9 11.7532L13.5 14.574V3Z"
                              fill="#111111"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_369_53401">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                    </div>
                  </button>
                </div>
              </CustomTooltip>
              <CustomTooltip content="Open">
                <div className="w-[32px] h-[32px] bg-red-200 rounded-full flex items-center justify-center">
                  <button
                    className={cn(
                      'transition-all duration-300 ease-in-out hover:scale-110',

                      loadingFavourite ? 'cursor-not-allowed' : ''
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(card?.link, '_blank');
                    }}
                  >
                    <div className="w-[36px] h-[36px] bg-[#FFFFFF] rounded-full p-0 m-0 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_369_53403)">
                          <path
                            d="M7.5 4.5V6H3.75V14.25H12V10.5H13.5V15C13.5 15.1989 13.421 15.3897 13.2803 15.5303C13.1397 15.671 12.9489 15.75 12.75 15.75H3C2.80109 15.75 2.61032 15.671 2.46967 15.5303C2.32902 15.3897 2.25 15.1989 2.25 15V5.25C2.25 5.05109 2.32902 4.86032 2.46967 4.71967C2.61032 4.57902 2.80109 4.5 3 4.5H7.5ZM15.75 2.25V8.25H14.25V4.80975L8.40525 10.6552L7.34475 9.59475L13.1887 3.75H9.75V2.25H15.75Z"
                            fill="#111111"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_369_53403">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </button>
                </div>
              </CustomTooltip>
            </div>
          </div>
        </div>

        <a href={sitePageUrl} className="w-full flex gap-[10px] mt-[12px] ">
          <div className="w-[40px] h-[40px] bg-[#E7E7E7] rounded-full overflow-hidden shrink-0">
            {card?.site_icon ? <img src={card?.site_icon} className="w-full h-full" alt="site" /> : ''}
          </div>

          <div className="group/title w-full">
            <div className="w-full flex justify-between">
              <p className="w-[170px] truncate text-[#111111] darkremove:text-[#ffffff] text-[14px] leading-[20px] group-hover/title:underline">
                {card?.name}
              </p>

              <div className="flex ml-auto items-start gap-[16px]">
                <div className=" flex gap-[6px] items-center ">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_370_53477)">
                      <path
                        d="M8.00132 3.01932C9.56732 1.61332 11.9873 1.65999 13.496 3.17132C15.004 4.68332 15.056 7.09132 13.6533 8.66199L7.99999 14.3233L2.34799 8.66199C0.945322 7.09132 0.997989 4.67932 2.50532 3.17132C4.01532 1.66199 6.43066 1.61132 8.00132 3.01932V3.01932ZM12.552 4.11332C11.552 3.11199 9.93866 3.07132 8.89199 4.01132L8.00199 4.80999L7.11132 4.01199C6.06132 3.07065 4.45132 3.11199 3.44866 4.11465C2.45532 5.10799 2.40532 6.69799 3.32066 7.74865L8.00066 12.436L12.6807 7.74932C13.5967 6.69799 13.5467 5.10999 12.552 4.11332V4.11332Z"
                        fill="#4E4E4E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_370_53477">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="text-[#4E4E4E] text-[12px] leading-[20px] font-medium">
                    {intData?.number_of_likes || '0'}
                  </span>
                </div>
                <div className=" flex gap-[6px] items-center ">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35865 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667V12.6667ZM7.99978 11C7.20413 11 6.44107 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44107 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82127 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82127 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                      fill="#4E4E4E"
                    />
                  </svg>

                  <span className="text-[#4E4E4E] text-[12px] leading-[20px] font-medium">
                    {card?.number_of_views || '0'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[#4E4E4E] text-[12px] leading-[16px] mt-1 truncate">{description || '---'}</p>
          </div>
        </a>
      </a>

      <SignInPageDialog onClose={toggleClose} open={open} redirectTo="stayOnPage" />
    </>
  );
}

export default WebsiteCard;

export const WebsiteCardSkeleton = ({ cardContainerClassName }: { cardContainerClassName?: string }) => {
  return (
    <a className={cn(cardContainerClassName)}>
      <Skeleton
        className={cn('bg-[#F3F3F3] p-[10px] h-[200px] border-[1px]   border-[#E7E7E7] rounded-[8px] relative ')}
      />

      <div className="w-full flex gap-[16px] mt-[12px]">
        <Skeleton className="w-[40px] h-[40px] bg-[#E7E7E7] shrink-0 rounded-full overflow-hidden" />
        <div className="flex-1 flex flex-col  h-[40px] justify-around ">
          <Skeleton className="w-full h-[6px] bg-[#E7E7E790] overflow-hidden" />
          <Skeleton className="w-full h-[6px] bg-[#E7E7E790] overflow-hidden" />
          <Skeleton className="w-full h-[6px] bg-[#E7E7E790] overflow-hidden" />
        </div>
      </div>
    </a>
  );
};

const Actions = ({ card, refresh }: { card?: IDesign; refresh?: any }) => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  const { loading: deleting, onDeleteDesign } = useDeleteDesign();

  const d = () => {
    onDeleteDesign({
      designId: card?.id,
      successCallback: () => {
        refresh?.();
        close?.();
      },
    });
  };

  const openDeleteDesign = (design_id: string) => {
    if (!open) {
      setOpen(true);
    } else {
      d();
    }
  };
  if (deleting)
    return (
      <div className="bg-white darkremove:bg-gray-600 flex items-center justify-center rounded-full h-[20px] w-[20px] p-1">
        <Spinner className="m-0 p-0" />
      </div>
    );
  return (
    <>
      {/* {!open ? null : (
        <div className="fixed inset-[-2] z-40 flex items-center justify-center bg-black/45">
          <div className="w-full h-full sm:w-auto sm:h-auto sm:rounded-[24px] bg-white p-4 relative z-50">
            <div className="p-10">
              <div>
                <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="101" height="100" viewBox="0 0 101 100" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M92.1666 49.9997C92.1666 73.0115 73.5118 91.6663 50.4999 91.6663C27.4881 91.6663 8.83325 73.0115 8.83325 49.9997C8.83325 26.9878 27.4881 8.33301 50.4999 8.33301C73.5118 8.33301 92.1666 26.9878 92.1666 49.9997ZM50.4999 73.958C52.2258 73.958 53.6249 72.5589 53.6249 70.833V45.833C53.6249 44.1071 52.2258 42.708 50.4999 42.708C48.774 42.708 47.3749 44.1071 47.3749 45.833V70.833C47.3749 72.5589 48.774 73.958 50.4999 73.958ZM50.4999 29.1663C52.8011 29.1663 54.6666 31.0318 54.6666 33.333C54.6666 35.6342 52.8011 37.4997 50.4999 37.4997C48.1987 37.4997 46.3333 35.6342 46.3333 33.333C46.3333 31.0318 48.1987 29.1663 50.4999 29.1663Z"
                      fill="#FF9900"
                    />
                  </svg>
                </div>
                <div className="mt-8 text-center">
                  <h1 className="font-gorditta text-[#111111] text-2xl font-medium ">{'Delete Website'}</h1>
                  <div className="mt-2">
                    <div className="text-[#4e4e4e] text-base font-normal  ">
                      {'Are you sure you want to delete this website?'}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-6 mt-8">
                  <button
                    className="justify-center inline-flex flex-1 items-center  p-3 border-solid border-[1px] bg-white font-medium   text-base leading-6 text-[#111111] rounded-[1000px] select-none"
                    disabled={deleting}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      close?.();
                    }}
                  >
                    {'Cancel'}
                  </button>
                  <button
                    type="button"
                    className="justify-center inline-flex flex-1 items-center  p-3 border-solid border-[1px] bg-[#111111] font-medium   text-base leading-6 text-white rounded-[1000px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      deleteDesign?.();
                    }}
                  >
                    {deleting ? <Spinner /> : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="shadow-lg rounded-full w-[20px] h-[20px] overflow-hidden flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="20" width="20" height="20" rx="10" transform="rotate(-90 0 20)" fill="#E7E7E7" />
              <path
                d="M10 5.3125C9.56853 5.3125 9.21875 5.66228 9.21875 6.09375C9.21875 6.52522 9.56853 6.875 10 6.875C10.4315 6.875 10.7812 6.52522 10.7812 6.09375C10.7812 5.66228 10.4315 5.3125 10 5.3125Z"
                stroke="#4E4E4E"
                strokeWidth="0.9375"
              />
              <path
                d="M10 9.21875C9.56853 9.21875 9.21875 9.56853 9.21875 10C9.21875 10.4315 9.56853 10.7812 10 10.7812C10.4315 10.7812 10.7812 10.4315 10.7812 10C10.7812 9.56853 10.4315 9.21875 10 9.21875Z"
                stroke="#4E4E4E"
                strokeWidth="0.9375"
              />
              <path
                d="M10 13.125C9.56853 13.125 9.21875 13.4748 9.21875 13.9062C9.21875 14.3377 9.56853 14.6875 10 14.6875C10.4315 14.6875 10.7812 14.3377 10.7812 13.9062C10.7812 13.4748 10.4315 13.125 10 13.125Z"
                stroke="#4E4E4E"
                strokeWidth="0.9375"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <button
            className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push('/user/edit-website/' + card?.id);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5553 2.91409C11.1142 2.30856 11.3936 2.0058 11.6906 1.82919C12.4071 1.40307 13.2893 1.38982 14.0178 1.79424C14.3197 1.96185 14.6077 2.25609 15.1838 2.84457C15.7599 3.43305 16.0479 3.72729 16.212 4.03569C16.6079 4.77984 16.5949 5.68109 16.1777 6.41303C16.0049 6.71637 15.7085 7.00183 15.1157 7.57276L8.06297 14.3657C6.93966 15.4477 6.378 15.9886 5.67605 16.2628C4.97409 16.537 4.2024 16.5168 2.65902 16.4764L2.44903 16.4709C1.97918 16.4587 1.74425 16.4525 1.60769 16.2975C1.47113 16.1426 1.48977 15.9032 1.52706 15.4246L1.54731 15.1647C1.65226 13.8177 1.70473 13.1441 1.96778 12.5387C2.23083 11.9332 2.68458 11.4416 3.59207 10.4584L10.5553 2.91409Z"
                stroke="#14181F"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M9.75 3L15 8.25" stroke="#14181F" strokeWidth="1.5" strokeLinejoin="round" />
              <path
                d="M10.5 16.5L16.5 16.5"
                stroke="#14181F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Edit website</span>
          </button>

          {!open ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openDeleteDesign?.(card?.id || '');
              }}
              className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.73202 1.68751H10.2681C10.4304 1.68741 10.5718 1.68732 10.7053 1.70864C11.2328 1.79287 11.6892 2.12186 11.9359 2.59563C11.9984 2.71555 12.043 2.84971 12.0942 3.00371L12.1779 3.25488C12.1921 3.2974 12.1962 3.30943 12.1996 3.31891C12.3309 3.682 12.6715 3.92745 13.0575 3.93723C13.0676 3.93748 13.08 3.93753 13.1251 3.93753H15.3751C15.6857 3.93753 15.9376 4.18937 15.9376 4.50003C15.9376 4.81069 15.6857 5.06253 15.3751 5.06253H2.625C2.31434 5.06253 2.0625 4.81069 2.0625 4.50003C2.0625 4.18937 2.31434 3.93753 2.625 3.93753H4.87506C4.9201 3.93753 4.93253 3.93749 4.94267 3.93723C5.32866 3.92745 5.66918 3.68202 5.80052 3.31893C5.80397 3.30938 5.80794 3.29761 5.82218 3.25488L5.90589 3.00372C5.95711 2.84973 6.00174 2.71555 6.06419 2.59563C6.3109 2.12186 6.76735 1.79287 7.29482 1.70864C7.42834 1.68732 7.56973 1.68741 7.73202 1.68751ZM6.75611 3.93753C6.79475 3.86176 6.82898 3.78303 6.85843 3.70161C6.86737 3.67689 6.87615 3.65057 6.88742 3.61675L6.96227 3.39219C7.03065 3.18706 7.04639 3.14522 7.06201 3.11523C7.14424 2.95731 7.29639 2.84764 7.47222 2.81957C7.50561 2.81423 7.55027 2.81253 7.76651 2.81253H10.2336C10.4499 2.81253 10.4945 2.81423 10.5279 2.81957C10.7037 2.84764 10.8559 2.95731 10.9381 3.11523C10.9537 3.14522 10.9695 3.18705 11.0379 3.39219L11.1127 3.61662L11.1417 3.70163C11.1712 3.78304 11.2054 3.86177 11.244 3.93753H6.75611Z"
                  fill="#111111"
                />
                <path
                  d="M4.43632 6.33761C4.41565 6.02764 4.14762 5.79311 3.83765 5.81377C3.52767 5.83444 3.29314 6.10247 3.31381 6.41245L3.6614 11.6262C3.72552 12.5883 3.77731 13.3654 3.89879 13.9752C4.02509 14.6092 4.23991 15.1387 4.6836 15.5538C5.1273 15.9689 5.66996 16.1481 6.31095 16.2319C6.92747 16.3126 7.70628 16.3125 8.67045 16.3125H9.32963C10.2938 16.3125 11.0727 16.3126 11.6892 16.2319C12.3302 16.1481 12.8728 15.9689 13.3165 15.5538C13.7602 15.1387 13.975 14.6092 14.1013 13.9752C14.2228 13.3654 14.2746 12.5883 14.3387 11.6263L14.6863 6.41245C14.707 6.10247 14.4725 5.83444 14.1625 5.81377C13.8525 5.79311 13.5845 6.02764 13.5638 6.33761L13.2189 11.5119C13.1515 12.5228 13.1034 13.2262 12.998 13.7554C12.8958 14.2688 12.753 14.5405 12.5479 14.7323C12.3429 14.9242 12.0623 15.0485 11.5433 15.1164C11.0082 15.1864 10.3032 15.1875 9.29007 15.1875H8.71005C7.69692 15.1875 6.99192 15.1864 6.45686 15.1164C5.93786 15.0485 5.65724 14.9242 5.45218 14.7323C5.24712 14.5405 5.10437 14.2687 5.00211 13.7554C4.89669 13.2262 4.84867 12.5228 4.78127 11.5119L4.43632 6.33761Z"
                  fill="#111111"
                />
                <path
                  d="M7.0691 7.69032C7.37822 7.65941 7.65386 7.88494 7.68478 8.19406L8.05978 11.9441C8.09069 12.2532 7.86516 12.5288 7.55604 12.5597C7.24692 12.5906 6.97127 12.3651 6.94036 12.056L6.56536 8.306C6.53445 7.99688 6.75998 7.72123 7.0691 7.69032Z"
                  fill="#111111"
                />
                <path
                  d="M10.931 7.69032C11.2402 7.72123 11.4657 7.99688 11.4348 8.306L11.0598 12.056C11.0289 12.3651 10.7532 12.5906 10.4441 12.5597C10.135 12.5288 9.90945 12.2532 9.94036 11.9441L10.3154 8.19406C10.3463 7.88494 10.6219 7.65941 10.931 7.69032Z"
                  fill="#111111"
                />
              </svg>

              <span>{'Delete website'}</span>
            </button>
          ) : (
            <div className="hover:bg-gray-200 w-full flex items-center px-3 py-2 gap-2 cursor-pointer text-[14px]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.73202 1.68751H10.2681C10.4304 1.68741 10.5718 1.68732 10.7053 1.70864C11.2328 1.79287 11.6892 2.12186 11.9359 2.59563C11.9984 2.71555 12.043 2.84971 12.0942 3.00371L12.1779 3.25488C12.1921 3.2974 12.1962 3.30943 12.1996 3.31891C12.3309 3.682 12.6715 3.92745 13.0575 3.93723C13.0676 3.93748 13.08 3.93753 13.1251 3.93753H15.3751C15.6857 3.93753 15.9376 4.18937 15.9376 4.50003C15.9376 4.81069 15.6857 5.06253 15.3751 5.06253H2.625C2.31434 5.06253 2.0625 4.81069 2.0625 4.50003C2.0625 4.18937 2.31434 3.93753 2.625 3.93753H4.87506C4.9201 3.93753 4.93253 3.93749 4.94267 3.93723C5.32866 3.92745 5.66918 3.68202 5.80052 3.31893C5.80397 3.30938 5.80794 3.29761 5.82218 3.25488L5.90589 3.00372C5.95711 2.84973 6.00174 2.71555 6.06419 2.59563C6.3109 2.12186 6.76735 1.79287 7.29482 1.70864C7.42834 1.68732 7.56973 1.68741 7.73202 1.68751ZM6.75611 3.93753C6.79475 3.86176 6.82898 3.78303 6.85843 3.70161C6.86737 3.67689 6.87615 3.65057 6.88742 3.61675L6.96227 3.39219C7.03065 3.18706 7.04639 3.14522 7.06201 3.11523C7.14424 2.95731 7.29639 2.84764 7.47222 2.81957C7.50561 2.81423 7.55027 2.81253 7.76651 2.81253H10.2336C10.4499 2.81253 10.4945 2.81423 10.5279 2.81957C10.7037 2.84764 10.8559 2.95731 10.9381 3.11523C10.9537 3.14522 10.9695 3.18705 11.0379 3.39219L11.1127 3.61662L11.1417 3.70163C11.1712 3.78304 11.2054 3.86177 11.244 3.93753H6.75611Z"
                  fill="#111111"
                />
                <path
                  d="M4.43632 6.33761C4.41565 6.02764 4.14762 5.79311 3.83765 5.81377C3.52767 5.83444 3.29314 6.10247 3.31381 6.41245L3.6614 11.6262C3.72552 12.5883 3.77731 13.3654 3.89879 13.9752C4.02509 14.6092 4.23991 15.1387 4.6836 15.5538C5.1273 15.9689 5.66996 16.1481 6.31095 16.2319C6.92747 16.3126 7.70628 16.3125 8.67045 16.3125H9.32963C10.2938 16.3125 11.0727 16.3126 11.6892 16.2319C12.3302 16.1481 12.8728 15.9689 13.3165 15.5538C13.7602 15.1387 13.975 14.6092 14.1013 13.9752C14.2228 13.3654 14.2746 12.5883 14.3387 11.6263L14.6863 6.41245C14.707 6.10247 14.4725 5.83444 14.1625 5.81377C13.8525 5.79311 13.5845 6.02764 13.5638 6.33761L13.2189 11.5119C13.1515 12.5228 13.1034 13.2262 12.998 13.7554C12.8958 14.2688 12.753 14.5405 12.5479 14.7323C12.3429 14.9242 12.0623 15.0485 11.5433 15.1164C11.0082 15.1864 10.3032 15.1875 9.29007 15.1875H8.71005C7.69692 15.1875 6.99192 15.1864 6.45686 15.1164C5.93786 15.0485 5.65724 14.9242 5.45218 14.7323C5.24712 14.5405 5.10437 14.2687 5.00211 13.7554C4.89669 13.2262 4.84867 12.5228 4.78127 11.5119L4.43632 6.33761Z"
                  fill="#111111"
                />
                <path
                  d="M7.0691 7.69032C7.37822 7.65941 7.65386 7.88494 7.68478 8.19406L8.05978 11.9441C8.09069 12.2532 7.86516 12.5288 7.55604 12.5597C7.24692 12.5906 6.97127 12.3651 6.94036 12.056L6.56536 8.306C6.53445 7.99688 6.75998 7.72123 7.0691 7.69032Z"
                  fill="#111111"
                />
                <path
                  d="M10.931 7.69032C11.2402 7.72123 11.4657 7.99688 11.4348 8.306L11.0598 12.056C11.0289 12.3651 10.7532 12.5906 10.4441 12.5597C10.135 12.5288 9.90945 12.2532 9.94036 11.9441L10.3154 8.19406C10.3463 7.88494 10.6219 7.65941 10.931 7.69032Z"
                  fill="#111111"
                />
              </svg>

              <div className="flex flex-1 gap-2">
                <span>{'Confirm?'}</span>
                <button
                  className="ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openDeleteDesign?.(card?.id || '');
                  }}
                >
                  <CheckCircledIcon className="size-[22px] text-green-500" />
                </button>

                <button
                  // className="ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(false);
                  }}
                >
                  <CrossCircledIcon className="size-[22px] text-red-500" />
                </button>
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
