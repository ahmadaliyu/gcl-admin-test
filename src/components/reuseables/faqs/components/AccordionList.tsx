import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { BlurFade } from '@/components/ui/blur-fade';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const questions = [
  {
    id: 'quote-request',
    question: 'How can I request a quote for air freight or sea freight shipment?',
    answer:
      'You can request a quote by visiting our website and filling out the quote request form or contacting our customer service team for assistance.',
  },
  {
    id: 'track-parcel',
    question: 'Can I track my parcel?',
    answer: 'Yes, you can track your parcel using our online tracking tool by entering your tracking number.',
  },
  {
    id: 'chargeable-weight',
    question: 'What is chargeable weight, and how is it calculated with GCL Parcel?',
    answer:
      'Chargeable weight is the weight used to determine shipping costs. It is calculated based on the greater of actual weight or volumetric weight.',
  },
  {
    id: 'shipping-options',
    question: 'What are the available shipping options?',
    answer: 'We offer various shipping options, including express delivery, standard shipping, and economy shipping.',
  },
  {
    id: 'international-shipping',
    question: 'Can I ship internationally with GCL Parcel?',
    answer: 'Yes, GCL Parcel provides international shipping services to multiple destinations worldwide.',
  },
  {
    id: 'key-services',
    question: 'What are the key services offered by GCL Parcel?',
    answer:
      'Our key services include air freight, sea freight, express delivery, parcel tracking, and customs clearance assistance.',
  },
];

export function AccordionList({ size = 'large' }: { size?: 'large' | 'small' }) {
  return (
    <section className="w-full ">
      <Accordion
        type="single"
        collapsible
        className={`w-full ${size === 'small' ? 'grid grid-cols-2 gap-[20px]' : ''}`}
      >
        {questions.map((item, index) => {
          return (
            <BlurFade delay={0.25} inView key={`${index}`}>
              <AccordionItem
                value={`item-${index + 1}`}
                className={`${size === 'small' ? '' : ''} mb-[20px] px-[0px] py-[0px]  border-b-[0px] `}
              >
                <AccordionTrigger
                  rightIcon={
                    <ChevronDownIcon
                      className={`${
                        size === 'small' ? 'h-6 w-6 p-1' : 'h-10 w-10 p-2'
                      } rounded-full shrink-0 transition-transform duration-200  text-[#0088DD] bg-[#D5EDFD] `}
                    />
                  }
                  className={`text-left flex items-start ${
                    size === 'small' ? 'text-[16px] py-[16px]' : 'text-[24px] py-[26px]'
                  } font-[500] text-[#111111]  max-sm:text-left [&[data-state=open]>.closedactfaq]:hidden [&[data-state=open]>.openactfaq]:flex bg-[#F5F8FA] px-[22px]  rounded-[10px] `}
                >
                  {item?.question}
                </AccordionTrigger>
                <AccordionContent className=" text-[#000000B2] font-normal  text-left py-[12px]">
                  {item?.answer}
                </AccordionContent>
              </AccordionItem>
            </BlurFade>
          );
        })}
      </Accordion>
    </section>
  );
}
