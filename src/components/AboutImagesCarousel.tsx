"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface AboutImage {
  src: string;
  alt: string;
}

export default function AboutImagesCarousel({ images }: { images: AboutImage[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", () => onSelect(api));
    api.on("reInit", () => onSelect(api));
  }, [api, onSelect]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] w-full">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-none shadow-lg" />
        <CarouselNext className="right-4 border-none shadow-lg" />
      </Carousel>

      <div className="flex items-center justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir para imagem ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: current === index ? "1.75rem" : "0.625rem",
              backgroundColor: current === index ? "var(--silva-yellow)" : "rgba(15, 39, 68, 0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
