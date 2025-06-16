import React from 'react';
import WebsiteCard, { WebsiteCardSkeleton } from '@/components/reuseables/WebsiteCard';
import { IDesign } from '@/types';
import { cn } from '@/lib/utils';
import { BlurFade } from '@/components/ui/blur-fade';

function WebsiteCardMultiple({
  cards,
  title,
  filterComponent,
  maxColumn = 4,
  containerClassname = '',
  loading = false,
  fromFavoritePage = false,
  fromMyWebsites = false,
  emptyComponent,
  refreshWebsites,
  maxSkeletonCards = 8,
}: {
  cards?: IDesign[];
  title?: string;
  filterComponent?: any;
  maxColumn?: 3 | 4;
  containerClassname?: string;
  loading?: boolean;
  fromFavoritePage?: boolean;
  fromMyWebsites?: boolean;
  emptyComponent?: any;
  refreshWebsites?: () => void;
  maxSkeletonCards?: number;
}) {
  const cardContainerClassName = `basis-[100%] md:basis-[calc(97%/2)] lg:basis-[calc(96%/3)]  ${
    maxColumn == 4 ? 'xl:basis-[calc(92%/4)]' : 'xl:basis-[calc(93%/3)]'
  }`;

  return (
    <>
      <BlurFade className={cn('mt-[32px]', containerClassname)} delay={0.25} inView>
        {title ? (
          <h3 className="text-[48px] leading-[56px] text-[#111111] font-[500]   mb-[32px] darkremove:text-[#fff]">
            {title}
          </h3>
        ) : null}
        {filterComponent ? filterComponent : null}

        <div className="w-full flex justify-start gap-x-[32px] gap-y-[40px] flex-wrap  ">
          {loading ? (
            <>
              {Array.from({ length: maxSkeletonCards }).map((num, index) => {
                return <WebsiteCardSkeleton cardContainerClassName={cardContainerClassName} key={index} />;
              })}
            </>
          ) : (
            <>
              {typeof cards === 'object' && cards?.length
                ? cards.map((card, index) => {
                    return (
                      <WebsiteCard
                        refreshWebsites={refreshWebsites}
                        key={index}
                        card={card}
                        cardContainerClassName={cardContainerClassName}
                        fromFavoritePage={fromFavoritePage}
                        fromMyWebsites={fromMyWebsites}
                      />
                    );
                  })
                : emptyComponent}
            </>
          )}
        </div>
      </BlurFade>
    </>
  );
}

export default WebsiteCardMultiple;
