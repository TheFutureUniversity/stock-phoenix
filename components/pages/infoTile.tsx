import { ReactNode, useState } from "react";
import { CirclePlus, CircleMinus } from "lucide-react";
import Image from "next/image";

export default function InfoTile({
  className,
  children,
  image,
  IconclassName,
}: {
  className?: string;
  children: ReactNode;
  image: string;
  IconclassName?: string;
}) {
  return (
    <div
      className={`p-[12.5px] bg-[#FFF5ED] border-2 border-[#FFD3AD] rounded-2xl flex items-center gap-2 ${className}`}
    >
      <div
        className={`bg-[#FF7700] !aspect-square w-[35px] flex justify-center items-center rounded-xl ${IconclassName}`}
      >
        <Image src={image} alt="icons" height={25} width={25} />
      </div>
      <div>{children}</div>
    </div>
  );
}

export function InfoTileSketch({
  children,
  tileclassName,
}: {
  children: ReactNode;
  tileclassName?: any;
}) {
  return (
    <div
      className={`bg-[#EEEEFF] md:px-14 py-2 w-20 flex flex-col justify-center items-center rounded-2xl border border-[#041C33] border-b-4 border-r-4 ${tileclassName}`}
    >
      {children}
    </div>
  );
}

export function ExpandableTile({
  header,
  children,
  isPaid,
  isVideo,
  className,
}: {
  header: string;
  children: ReactNode;
  isPaid?: boolean;
  isVideo?: boolean;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const onClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={`bg-[#F2F3F5] cursor-pointer w-full max-w-screen-lg rounded-lg transition-all ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between  p-[17px] ">
        <div className="font-semibold">
          <b>Q:</b> {header}
        </div>
        {isExpanded ? (
          isPaid ? (
            <img src="/Common/green-minus.png" width={20} height={20}></img>
          ) : isVideo ? (
            <img src="/paid-video/blue-minus.svg" width={20} height={20}></img>
          ) : (
            // <img src="/Common/orange-minus.png" width={20} height={20}></img>
            <div>
              <CircleMinus size={20} color="#1F334E" />
            </div>
          )
        ) : isVideo ? (
          <img src="/paid-video/blue-circle.svg" width={20} height={20}></img>
        ) : isPaid ? (
          <img
            src="/Common/Long-Free/svg/green-circle.svg"
            width={20}
            height={20}
          ></img>
        ) : (
          // <img
          //   src="/Common/Long-Free/svg/circle-plus.svg"
          //   width={20}
          //   height={20}
          // ></img>
          <div>
            <CirclePlus size={20} color="#1F334E" />
          </div>
        )}
      </div>
      <div
        className={`p-5 text-sm  overflow-hidden border-t ${!isExpanded && "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}