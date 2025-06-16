import React, { Fragment, useState } from 'react';
import { steps, EStepIds, inActiveStep, activeStep } from '../constants';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Button from '@/components/reuseables/Button';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRouter } from 'next/navigation';
import { updateBookingField } from '@/store/booking/bookingSlice';
import { setPriceDetails } from '@/store/auth/quoteDataSlice';

function GetAQuote() {
  const [activeStepId, setActiveStepId] = useState<EStepIds>(EStepIds.SampleQuote);
  const activeStepIndex = steps.findIndex((step) => step.id === activeStepId);

  const { quote } = useAppSelector((state) => state.quoteData);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNext = (serviceId: string, handlingFee: string, totalAmount: number, totalPrice: number) => {
    let priceDetails = { handlingFee, totalAmount, totalPrice };
    if (user?.email) {
      dispatch(updateBookingField({ field: 'service_id', value: serviceId }));
      dispatch(setPriceDetails(priceDetails));
      router.push(`/quote-review`);
    } else {
      dispatch(updateBookingField({ field: 'service_id', value: serviceId }));
      dispatch(setPriceDetails(priceDetails));
      router.push(`/auth/login?quote=quote`);
    }
  };

  const SERVICES = !!quote?.data
    ? quote?.data?.options.map((option) => ({
        id: option.serviceId,
        company: option.serviceName,
        type: option.serviceType,
        delivery: new Date(option.estimatedDeliveryDate).toLocaleDateString(),
        transitTime: `${option.estimatedDeliveryTime} hours`,
        weight: quote.data.parcels.reduce((sum, p) => sum + p.items.reduce((s, i) => s + i.weight, 0), 0) + 'kg',
        fees: `£${option.legDetails.reduce((sum, leg) => sum + parseFloat(leg.handlingFee), 0)}`,
        total: `£${(
          parseFloat(option.totalPrice.toString()) +
          option.legDetails.reduce((sum, leg) => sum + parseFloat(leg.handlingFee || '0'), 0)
        ).toFixed(2)}`,
        totalPrice: option.totalPrice,
        isExpress: option.isExpress,
      }))
    : [];

  return (
    <div className="py-[40px] md:py-[80px] px-4 md:px-0">
      <div className="max-screen-wrapper bg-[#fff]">
        <div className="max-screen-inner">
          {/* Stepper */}
          <div className="flex justify-between items-center overflow-x-auto pb-4">
            {steps.map((item, index) => {
              const isLast = steps?.length - 1 === index;
              const active = activeStepId === item.id || !(activeStepIndex < index);

              return (
                <Fragment key={item.id}>
                  <div
                    className="flex flex-col items-center cursor-pointer relative z-[2] min-w-[80px]"
                    onClick={() => setActiveStepId(item.id)}
                  >
                    {active ? activeStep : inActiveStep}
                    <h2 className={`text-[12px] md:text-[14px] mt-[8px] ${active ? 'text-black' : 'text-[#757575]'}`}>
                      {item.title}
                    </h2>
                  </div>
                  {isLast ? null : (
                    <div
                      className={`flex-1 ${
                        active ? 'bg-[#0088DD]' : 'bg-[#E3E3E3]'
                      } h-[4px] mt-[-25px] mx-[-15px] md:mx-[-25px] relative z-[1]`}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* Destination Info */}
          <div className="flex flex-col md:flex-row items-center justify-center pt-[40px] md:pt-[80px] gap-[20px] md:gap-[40px]">
            <p className="text-[#232526] text-[18px] md:text-[24px] font-[600] font-poppins text-center">
              Destination:
            </p>
            <p className="text-[#232526] text-[18px] md:text-[24px] font-[600] font-poppins text-center">
              {quote?.data?.destination?.country_iso}
            </p>
          </div>

          <div className="flex items-center justify-center mt-2">
            <p className="text-[#0088DD] text-[12px] md:text-[14px] font-[400] font-poppins text-center">
              Please check for any restrictions to {quote?.data?.origin.country_iso || 'this country'} here.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1 mb-[20px] md:mb-[40px]">
            <p className="text-[#757575] text-[10px] md:text-[12px] font-[400] font-poppins text-center">
              If you believe this to be an error, please
            </p>
            <p className="text-[#0088DD] text-[10px] md:text-[12px] font-[400] font-poppins text-center">contact us</p>
          </div>

          {/* Services Table - Mobile Cards */}
          <div className="md:hidden space-y-4 mb-[60px] mt-[20px]">
            {SERVICES.map((service) => (
              <div key={service.id} className="border border-[#E3E3E3] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src="/icons/outer.png" className="w-[60px] h-[42px]" alt={service.company} />
                  <div>
                    <h3 className="font-medium text-[16px]">{service.company}</h3>
                    <p className="text-[#757575] text-[12px]">{service.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-[12px] text-[#757575]">Transit Time</p>
                    <p className="font-medium">{service.transitTime}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#757575]">Weight</p>
                    <p className="font-medium">{service.weight}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#757575]">Surcharge</p>
                    <p className="font-medium">{service.fees}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#757575]">Total</p>
                    <p className="font-medium">{service.total}</p>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    handleNext(
                      service.id,
                      service.fees.replace('£', ''),
                      Number(service.total.replace('£', '')),
                      Number(service.totalPrice)
                    )
                  }
                  title="Buy Now"
                  className="w-full"
                />
              </div>
            ))}
          </div>

          {/* Services Table - Desktop */}
          <div className="hidden md:block mb-[60px] md:mb-[100px] mt-[20px] md:mt-[40px]">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#FCE8E9] hover:bg-[#FCE8E9]">
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px] min-w-[180px]">
                      Services (hover for more info)
                    </TableHead>
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px]">
                      Est Transit Time
                    </TableHead>
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px]">Weight</TableHead>
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px]">
                      Surcharge
                    </TableHead>
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px]">Total</TableHead>
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px]">
                      Collection
                    </TableHead>
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px]">
                      Insurance Cover
                    </TableHead>
                    <TableHead className="text-[#272727] text-[14px] py-[24px] md:py-[31px] px-[8px]">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {SERVICES.map((service) => (
                    <TableRow key={service?.id}>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px] flex items-center gap-[10px]">
                        <img
                          src="/icons/outer.png"
                          className="w-[60px] md:w-[80px] h-[42px] md:h-[56px]"
                          alt={service.company}
                        />
                        <span>{service.company}</span>
                      </TableCell>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px]">
                        {service.transitTime}
                      </TableCell>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px]">
                        {service.weight}
                      </TableCell>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px]">
                        {service.fees}
                      </TableCell>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px]">
                        {service.total}
                      </TableCell>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px]">
                        {service.type}
                      </TableCell>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px]">
                        {service.company}
                      </TableCell>
                      <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[20px] md:py-[30px] px-[8px]">
                        <Button
                          onClick={() =>
                            handleNext(
                              service.id,
                              service.fees.replace('£', ''),
                              Number(service.total.replace('£', '')),
                              Number(service.totalPrice)
                            )
                          }
                          title="Buy Now"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAQuote;
