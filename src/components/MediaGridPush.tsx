"use client";

import React from "react";

const galleryImages = [
  {
    src: "/assets/cfe716ebeb9d1a0676a59f41aa92b2e678dce13c-2887x1800.jpg",
    title: "Couture Texture Study",
    aspect: "h-96"
  },
  {
    src: "/assets/86f18c27c5853ee326c8418f1e8e97911092056d-1417x1999.jpg",
    title: "Bronze Lace Cast",
    aspect: "h-[30rem]"
  },
  {
    src: "/assets/396f260c54896295fa31fe6985dd256a8da113e5-1521x2000.jpg",
    title: "Monolith Silhouette",
    aspect: "h-96"
  },
  {
    src: "/assets/7fe6426b99b805680fdde5f94132ac75697ea425-1286x2000.jpg",
    title: "Fine-Art Atelier Process",
    aspect: "h-[32rem]"
  },
  {
    src: "/assets/506b316b2e93b2df03dbff106a6e92c634a37926-1416x2000.jpg",
    title: "Archival Preservation",
    aspect: "h-96"
  },
  {
    src: "/assets/082bf91549fedb9a30fa95d86d85384d3a4e600d-1086x1448.png",
    title: "Carrara Marble Polish",
    aspect: "h-[28rem]"
  }
];

export function MediaGridPush() {
  return (
    <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#2b2723]/40">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] block mb-3">
          Atelier Imagery
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#f4efe8]">
          The Art of Preservation
        </h2>
        <p className="font-sans text-xs md:text-sm text-[#a39b8e] mt-4 leading-relaxed font-light">
          An intimate glimpse into our private sculpture studio, where bridal fashion transcends time into fine art.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className={`relative ${img.aspect} rounded-2xl overflow-hidden group border border-[#2b2723] bg-[#141210] shadow-xl`}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-90 group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="font-serif text-lg font-light text-[#f4efe8]">
                {img.title}
              </span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#d4af37]">
                0{idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
