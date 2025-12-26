import Image from "next/image";

type VisualCardProps = {
  title: string;
  text: string;
  imageSrc: string;
};

export default function VisualCard({
  title,
  text,
  imageSrc,
}: VisualCardProps) {
  return (
    <div className="bg-[#0B132B] rounded-2xl shadow-lg overflow-hidden min-h-[260px] flex flex-col">
      
      {/* IMAGE AREA */}
      <div className="relative h-36 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain p-6"
          priority
        />
      </div>

      {/* TEXT AREA */}
      <div className="p-6 mt-auto">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-slate-300 text-sm mt-1">{text}</p>
      </div>
    </div>
  );
}
