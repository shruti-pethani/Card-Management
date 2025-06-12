import React, { useRef, useState, useEffect } from 'react';
import CreditCard from './CreditCard';
import type { Card } from '../types';

interface Props {
  cards: Card[];
}

const CreditCardCarousel: React.FC<Props> = ({ cards }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const cardWidth = scrollElement.offsetWidth;
      const index = Math.round(scrollElement.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll snap-x snap-mandatory no-scrollbar scroll-smooth w-full"
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`snap-start flex-shrink-0 w-full ${
          index === 0 ? 'pl-0 pr-4 sm:pr-8' : 'px-4 sm:px-8'
        }`}
          >
            <CreditCard card={card} />
          </div>
        ))}
      </div>

      {/* Dots below */}
      <div className="flex justify-center mt-4 space-x-2">
        {cards.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CreditCardCarousel;
