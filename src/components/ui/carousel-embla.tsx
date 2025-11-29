import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface CarouselProps {
  children: React.ReactNode;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

export function Carousel({ children, autoplay = true, autoplayDelay = 3000, className = '' }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!autoplay || !emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay, autoplayDelay]);

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-xl border-2"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-xl border-2"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="flex justify-center gap-2 mt-6">
        {childrenArray.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? 'bg-[#2AA7C6] w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

export function CarouselItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex-[0_0_100%] min-w-0 ${className}`}>
      {children}
    </div>
  );
}
