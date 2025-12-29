import Image from "next/image";

type VisualCardProps = {
  title: string;
  text: string;
  imageSrc: string;
};

export default function VisualCard({ title, text, imageSrc }: VisualCardProps) {
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-xl h-[420px]">
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-white/90 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
