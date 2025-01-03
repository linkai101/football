import { cn } from "@/lib/utils";
import { MdSportsFootball } from "react-icons/md";

interface FootballFieldProps {
  className?: string;
  firstDownLine?: number;
  startingPosition?: number;
  currentPosition?: number;
  teamColor?: [number, number, number];
}

export function FootballField({
  className,
  firstDownLine,
  startingPosition,
  currentPosition,
  teamColor = [40,40,40],
}: FootballFieldProps) {
  const hPadding = 1; // horizontal padding, in rem

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ paddingLeft: `${hPadding}rem`, paddingRight: `${hPadding}rem` }}
    >
      <div
        className="h-16 relative"
        style={{ perspective: "10rem" }} // 3d perspective effect
      >
        <Field
          firstDownLine={firstDownLine}
          className="h-full"
        />

        <ProgressLine
          startingPosition={startingPosition}
          currentPosition={currentPosition}
          teamColor={teamColor}
          className="absolute inset-y-0 left-[calc(100%/12)] w-[calc(100%*10/12)]"
        />
      </div>

      <div className="mt-0.5 mx-[calc(100%/12-0.5rem)] flex justify-evenly text-xs text-neutral-300 font-mono relative select-none">
        {[10,20,30,40,50,40,30,20,10].map((n, i) => (
          <span key={i}>{n}</span>
        ))}
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
              "absolute w-full h-full border-l-2 border-yellow-300 transition-all ease-in-out duration-500",
              [0,100].includes(firstDownLine) && "opacity-0"
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
  teamColor?: [number, number, number];
  className?: string;
  style?: React.CSSProperties;
}

function ProgressLine({ startingPosition, currentPosition, teamColor, className, style }: ProgressLineProps) {
  const adjustedCurrentPosition =
    currentPosition === 0 ? -4
    : currentPosition === 100 ? 104
    : currentPosition; // render position inside endzone if at 0 or 100

  return (
    <div className={className} style={style}>
      {/* Starting position + line to current position */}
      {(startingPosition !== undefined && adjustedCurrentPosition != undefined) && // render only if both are defined
        <div
          className="absolute w-[108%] h-full flex items-center transition-all ease-in-out duration-500"
          style={{ transform: `translateX(calc(${Math.min(startingPosition, adjustedCurrentPosition)}% / 108 * 100 - 1px))` }}
        >
          <div
            className="h-2.5 rounded-full transition-all ease-in-out duration-500"
            style={{
              width: `calc(${Math.abs(startingPosition - adjustedCurrentPosition)}% / 108 * 100)`,
              backgroundColor: teamColor ? `rgb(${teamColor.join(",")})` : "#000000",
            }}
          />
        </div>
      }

      {/* Current position */}
      {adjustedCurrentPosition !== undefined && // render if defined
        <div
          className={cn(
            "absolute w-full h-full flex items-center transition-all ease-in-out duration-500",
          )}
          style={{ transform: `translateX(calc(${adjustedCurrentPosition}% - 1px))` }}
        >
          <div
            className="-translate-x-1/2 aspect-square p-1 bg-neutral-700 rounded-full transition-all ease-in-out duration-500"
            style={{ backgroundColor: teamColor ? `rgb(${teamColor.join(",")})` : "#000000" }}
          >
            <MdSportsFootball size={12}
              className=" transition-all ease-in-out duration-500"
              style={{ color: getContrastingColor(teamColor ?? [0,0,0]) }}
            />
          </div>
        </div>
      }
    </div>
  );
}

function getContrastingColor([r,g,b]: [number, number, number]) {
  const luminance = 0.2126*(r/255) + 0.7152*(g/255) + 0.0722*(b/255);
  return luminance > 0.73 ? 'black' : 'white';
}