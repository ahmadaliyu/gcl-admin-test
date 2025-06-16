'use client';
import { Suspense } from 'react';
import React from 'react';
import TrackAParcel from '@/components/pages/main/track-a-parcel';

function page() {
  return (
    <Suspense>
      <TrackAParcel />
    </Suspense>
  );
}

export default page;
