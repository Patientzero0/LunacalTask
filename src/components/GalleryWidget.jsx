import React, { useEffect, useRef, useState } from "react";

export default function GalleryWidget() {
  const [images, setImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  function handleFiles(files) {
    const newImages = Array.from(files).map((file, idx) => {
      const url = URL.createObjectURL(file);
      return {
        id: `${Date.now()}-${idx}-${file.name}`,
        name: file.name,
        url,
        alt: file.name.replace(/\.[^/.]+$/, ""),
      };
    });
    setImages((prev) => [...prev, ...newImages]);
  }

  function onAddClick() {
    inputRef.current?.click();
  }

  function onFileChange(e) {
    if (e.target.files && e.target.files.length) {
      handleFiles(e.target.files);
      e.target.value = "";
    }
  }

  function openLightbox(index) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(-1);
  }

  function showPrev() {
    setLightboxIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }

  function showNext() {
    setLightboxIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }
  
  function scrollPrev() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -224,
        behavior: 'smooth'
      });
    }
  }

  function scrollNext() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 224,
        behavior: 'smooth'
      });
    }
  }

  useEffect(() => {
    function onKey(e) {
      if (lightboxIndex === -1) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  return (
    <div className="rounded-3xl shadow-xl p-6 w-full" style={{ backgroundColor: '#363C43' }}>
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .scroll-snap-container {
          scroll-snap-type: x mandatory;
        }
        .scroll-snap-item {
          scroll-snap-align: start;
        }
        .gallery-image-wrapper {
          position: relative;
          display: block;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transform: translateY(0) scale(1) rotateZ(0deg);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .gallery-image-wrapper:hover {
          transform: translateY(-10px) scale(1.03) rotateZ(-2deg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.7);
          z-index: 10; 
        }
        .gallery-image-wrapper img {
          filter: grayscale(100%);
          transition: filter 0.3s ease-in-out;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gallery-image-wrapper:hover img {
          filter: grayscale(0%);
        }
        .gallery-arrow-btn {
          box-shadow: 0 4px 15px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3);
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          transform: scale(1);
        }
        .gallery-arrow-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0,0,0,0.6), inset 0 2px 4px rgba(0,0,0,0.3);
        }
        .gallery-arrow-btn:active:not(:disabled) {
          transform: scale(0.95);
          box-shadow: 0 2px 10px rgba(0,0,0,0.4), inset 0 2px 4px rgba(0,0,0,0.3), 0 0 15px 5px rgba(59, 130, 246, 0.5);
        }
      `}</style>
      <div className="flex items-center justify-between mb-6">
        <div 
          className="rounded-3xl px-6 py-3 text-lg font-medium shadow-lg"
          style={{ 
            backgroundColor: '#171717',
            color: '#FFFFFF',
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.5)'
          }}
        >
          Gallery
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onAddClick}
            className="rounded-full px-6 py-3 text-sm font-medium shadow-xl transition-all hover:scale-105"
            style={{ 
              backgroundColor: '#FFFFFF',
              color: '#000000',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
            aria-label="Add images"
          >
            + ADD IMAGE
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onFileChange}
            className="sr-only"
            aria-hidden="true"
          />
          <button
            onClick={scrollPrev}
            disabled={images.length === 0}
            className="gallery-arrow-btn rounded-full w-11 h-11 flex items-center justify-center shadow-xl transition-all hover:scale-105 disabled:opacity-30"
            style={{ 
              backgroundColor: '#2E3238',
              color: '#FFFFFF'
            }}
            aria-label="Scroll gallery left"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            disabled={images.length === 0}
            className="gallery-arrow-btn rounded-full w-11 h-11 flex items-center justify-center shadow-xl transition-all hover:scale-105 disabled:opacity-30"
            style={{ 
              backgroundColor: '#2E3238',
              color: '#FFFFFF'
            }}
            aria-label="Scroll gallery right"
          >
            →
          </button>
        </div>
      </div>
      {images.length === 0 ? (
        <div 
          className="text-center text-gray-500 text-sm flex items-center justify-center"
          style={{height: '232px'}} 
        >
          No images yet. Click "ADD IMAGE" to get started.
        </div>
      ) : (
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto scroll-smooth hide-scrollbar pb-2 scroll-snap-container"
          style={{ height: '232px' }} 
        >
          {images.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => openLightbox(idx)}
              className="overflow-visible rounded-3xl p-0 focus:outline-none focus:ring-2 focus:ring-white flex-shrink-0 w-52 h-48 scroll-snap-item gallery-image-wrapper"
              aria-label={`Open preview for ${img.name}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="block rounded-3xl"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
      {lightboxIndex !== -1 && images[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${images[lightboxIndex].name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-6"
          onClick={closeLightbox}
        >
          <div className="max-w-5xl max-h-full w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 z-10 text-white text-4xl hover:text-gray-300 focus:outline-none font-light"
              aria-label="Close preview"
            >
              ×
            </button>
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-2xl hover:bg-opacity-100 focus:outline-none text-2xl text-white"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-2xl hover:bg-opacity-100 focus:outline-none text-2xl text-white"
              aria-label="Next image"
            >
              ›
            </button>
            <div className="bg-black flex items-center justify-center rounded-2xl overflow-hidden">
              <img
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt}
                className="max-h-[85vh] max-w-full object-contain"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-300">
              {images[lightboxIndex].name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}