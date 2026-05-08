import Image from "next/image";

interface Props {
  antes: string;
  despues: string;
}

export default function BeforeAfterSlider({ antes, despues }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
          <Image src={antes} alt="Antes" fill className="object-cover" />
        </div>
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          Antes
        </span>
      </div>
      <div className="relative">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
          <Image src={despues} alt="Después" fill className="object-cover" />
        </div>
        <span className="absolute bottom-3 left-3 bg-am-primary/80 text-white text-xs px-2 py-1 rounded-full">
          Después
        </span>
      </div>
    </div>
  );
}
