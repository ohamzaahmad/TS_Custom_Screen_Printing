import React from 'react';
import Skeleton from './Skeleton';

export const HomePageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-brand-dark animate-in">
    <div className="pt-36 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="space-y-16">
        {/* Hero Section Skeleton */}
        <div className="space-y-8">
          <Skeleton className="h-6 w-32 rounded-full skeleton-dark" />
          <div className="space-y-4">
            <Skeleton className="h-16 md:h-24 w-3/4 lg:w-1/2 skeleton-dark" />
            <Skeleton className="h-16 md:h-24 w-1/2 lg:w-1/3 skeleton-dark" />
          </div>
          <Skeleton className="h-24 w-full md:w-2/3 lg:w-1/2 rounded-3xl skeleton-dark" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-14 w-full sm:w-48 rounded-full skeleton-dark" />
            <Skeleton className="h-14 w-full sm:w-48 rounded-full skeleton-dark" />
          </div>
        </div>
        
        {/* Grid Layout Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-64 w-full rounded-3xl shadow-sm skeleton-dark" />
              <div className="space-y-3">
                <Skeleton className="h-8 w-3/4 skeleton-dark" />
                <Skeleton className="h-4 w-full skeleton-dark" />
                <Skeleton className="h-4 w-5/6 skeleton-dark" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const FormPageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white animate-in">
    <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-3xl mx-auto">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <Skeleton className="h-6 w-32 rounded-full mx-auto skeleton-light" />
          <div className="space-y-4">
            <Skeleton className="h-16 md:h-20 w-3/4 lg:w-full mx-auto skeleton-light" />
            <Skeleton className="h-12 w-full mx-auto skeleton-light" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-24 skeleton-light" />
              <Skeleton className="h-12 w-full rounded-xl skeleton-light" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex gap-4 pt-6">
          <Skeleton className="h-14 w-full sm:w-48 rounded-full skeleton-light" />
        </div>
      </div>
    </div>
  </div>
);

export const GalleryPageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white animate-in">
    <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center mb-12">
          <Skeleton className="h-6 w-32 rounded-full mx-auto skeleton-light" />
          <Skeleton className="h-16 md:h-20 w-3/4 mx-auto skeleton-light" />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-96 w-full rounded-2xl skeleton-light" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 skeleton-light" />
                <Skeleton className="h-4 w-full skeleton-light" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const CataloguePageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white animate-in">
    <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center mb-12">
          <Skeleton className="h-6 w-32 rounded-full mx-auto skeleton-light" />
          <Skeleton className="h-16 md:h-20 w-3/4 mx-auto skeleton-light" />
        </div>

        {/* Link Card */}
        <div className="mb-12">
          <Skeleton className="h-32 w-full rounded-xl skeleton-light" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-72 w-full rounded-xl skeleton-light" />
              <Skeleton className="h-6 w-3/4 skeleton-light" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const AccordionPageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-linear-to-b from-brand-dark to-[#1a0f2e] animate-in">
    <div className="pt-36 pb-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <Skeleton className="h-6 w-32 rounded-full mx-auto skeleton-dark" />
          <Skeleton className="h-16 md:h-20 w-3/4 mx-auto skeleton-dark" />
          <Skeleton className="h-12 w-full mx-auto skeleton-dark" />
        </div>

        {/* Last Updated */}
        <Skeleton className="h-10 w-full max-w-md mx-auto rounded-xl skeleton-dark" />

        {/* Accordion Items */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-16 w-full rounded-xl skeleton-dark" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="space-y-4 pt-8">
          <Skeleton className="h-12 w-full max-w-md mx-auto skeleton-dark" />
          <div className="flex gap-4 justify-center flex-wrap">
            <Skeleton className="h-12 w-40 rounded-full skeleton-dark" />
            <Skeleton className="h-12 w-40 rounded-full skeleton-dark" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ColorGuidePageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white animate-in">
    <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center mb-12">
          <Skeleton className="h-6 w-32 rounded-full mx-auto skeleton-light" />
          <Skeleton className="h-16 md:h-20 w-3/4 mx-auto skeleton-light" />
        </div>

        {/* Color Palette Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-24 w-full rounded-lg skeleton-light" />
              <Skeleton className="h-4 w-full skeleton-light" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const PricingPageLoader: React.FC = () => (
  <div className="relative min-h-screen bg-linear-to-b from-slate-50 to-white animate-in">
    <div className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center mb-12">
          <Skeleton className="h-6 w-32 rounded-full mx-auto skeleton-light" />
          <Skeleton className="h-16 md:h-20 w-3/4 mx-auto skeleton-light" />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-12 w-3/4 skeleton-light" />
              <Skeleton className="h-16 w-1/2 skeleton-light" />
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-4 w-full skeleton-light" />
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-full skeleton-light" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
