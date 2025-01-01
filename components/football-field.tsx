import { cn } from "@/lib/utils";
import { MdSportsFootball } from "react-icons/md";

interface FootballFieldProps {
  className?: string;
  firstDownLine?: number;
  startingPosition?: number;
  currentPosition?: number;
}

export function FootballField({
  className,
  firstDownLine,
  startingPosition,
  currentPosition,
}: FootballFieldProps) {
  const hPadding = 1; // horizontal padding, in rem

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ paddingLeft: `${hPadding}rem`, paddingRight: `${hPadding}rem` }}
    > 
      <div
      className="h-16"
        style={{ perspective: "10rem" }} // 3d perspective effect
      >
        <Field
          firstDownLine={firstDownLine}
          className="h-full"
        />

        <ProgressLine
          startingPosition={startingPosition}
          currentPosition={currentPosition}
          className="absolute inset-y-0" 
          style={{
            left: `calc(${hPadding}rem + (100% - ${hPadding*2}rem) / 12)`,
            width: `calc((100% - ${hPadding*2}rem) * 10 / 12)`
          }}
        />
      </div>

      <div className="mx-[calc(100%/12)] h-4 font-mono bg-red-200">
      </div>
    </div>
  );
}

interface FieldProps {
  firstDownLine?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Field({ firstDownLine, className, style }: FieldProps) {
  return (
    <div
      className={cn("flex", className)}
      style={{ transform: "rotate3d(1,0,0,20deg)", ...style }} // 3d rotation effect
    >
      <div className="w-1/12 bg-neutral-100 rounded-l-lg"></div>

      <div className="flex-1 grid grid-cols-10 relative">
        {new Array(10).fill(0).map((_, i) => (
          <div className="border-x border-neutral-100" key={i}/>
        ))}

        {/* First down position */}
        {firstDownLine !== undefined &&
          <div
            className={cn(
              "absolute w-full h-full border-l-2 border-yellow-300 transition-transform ease-in-out duration-500",
            )}
            style={{ transform: `translateX(calc(${firstDownLine}% - 1px))` }}
          />
        }
      </div>

      <div className="w-1/12 bg-neutral-100 rounded-r-lg"></div>
    </div>
  );
}

interface ProgressLineProps {
  startingPosition?: number;
  currentPosition?: number;
  className?: string;
  style?: React.CSSProperties;
}

function ProgressLine({ startingPosition, currentPosition, className, style }: ProgressLineProps) {
  const adjustedCurrentPosition =
    currentPosition === 0 ? -4
    : currentPosition === 100 ? 104
    : currentPosition; // render position inside endzone if at 0 or 100

  return (
    <div className={className} style={style}>
      {/* Starting position + line to current position */}
      {(startingPosition !== undefined && adjustedCurrentPosition != undefined) && // render only if both are defined
        <div
          className="absolute w-full h-full flex items-center transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(calc(${Math.min(startingPosition, adjustedCurrentPosition)}% - 1px))` }}
        >
          <div
            className="h-2.5 bg-neutral-700 rounded-full transition-all ease-in-out duration-500"
            style={{ width: `${Math.abs(startingPosition - adjustedCurrentPosition)}%` }}
          />
        </div>
      }

      {/* Current position */}
      {adjustedCurrentPosition !== undefined && // render if defined
        <div
          className={cn(
            "absolute w-full h-full flex items-center transition-transform ease-in-out duration-500",
          )}
          style={{ transform: `translateX(calc(${adjustedCurrentPosition}% - 1px))` }}
        >
          <div className="-translate-x-1/2 aspect-square p-1 bg-neutral-700 rounded-full">
            <MdSportsFootball size={12} className="text-white"/>
          </div>
        </div>
      }
    </div>
  );
}