"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { FootballField } from "@/components/football-field";

export default function Home() {
  const [firstDownLine, setFirstDownLine] = useState<number|undefined>(); // 0 to 100
  const [startingPosition, setStartingPosition] = useState<number|undefined>(); // 0 to 100
  const [currentPosition, setCurrentPosition] = useState<number|undefined>(); // 0 to 100

  return (
    <div className="container max-w-xl h-dvh p-4 flex flex-col justify-center">
      <div>
        <FootballField
          firstDownLine={firstDownLine}
          startingPosition={startingPosition}
          currentPosition={currentPosition}
        />
        
        <div className="mt-12 px-[calc(2rem+100%/12)]">
          {/* First down position */}
          <div className="flex justify-between gap-8">
            <div className="flex items-center space-x-2">
              <Switch
                id="first-down-position"
                checked={firstDownLine !== undefined}
                onCheckedChange={(v) => setFirstDownLine(v ? 50 : undefined)}
              />
              <Label htmlFor="first-down-position">1st Down Position</Label>
            </div>

            {firstDownLine !== undefined &&
              <p>{firstDownLine}</p>
            }
          </div>
          {firstDownLine !== undefined &&
            <Slider
              max={100}
              step={1}
              value={[firstDownLine]}
              onValueChange={(v) => setFirstDownLine(v[0])}
              className="mt-2"
            />
          }

          {/* Current position */}
          <div className="mt-6 flex justify-between gap-8">
            <div className="flex items-center space-x-2">
              <Switch
                id="current-position"
                checked={currentPosition !== undefined}
                onCheckedChange={(v) => setCurrentPosition(v ? 50 : undefined)}
              />
              <Label htmlFor="current-position">Current Position</Label>
            </div>

            {currentPosition !== undefined &&
              <p>{currentPosition}</p>
            }
          </div>
          {currentPosition !== undefined &&
            <Slider
              max={100}
              step={1}
              value={[currentPosition]}
              onValueChange={(v) => setCurrentPosition(v[0])}
              className="mt-2"
            />
          }

          {/* Starting position */}
          <div className="mt-6 flex justify-between gap-8">
            <div className="flex items-center space-x-2">
              <Switch
                id="starting-position"
                checked={startingPosition !== undefined}
                onCheckedChange={(v) => setStartingPosition(v ? 50 : undefined)}
              />
              <Label htmlFor="starting-position">Starting Position</Label>
            </div>

            {startingPosition !== undefined &&
              <p>{startingPosition}</p>
            }
          </div>
          {startingPosition !== undefined &&
            <Slider
              max={100}
              step={1}
              value={[startingPosition]}
              onValueChange={(v) => setStartingPosition(v[0])}
              className="mt-2"
            />
          }
        </div>
      </div>
    </div>
  );
}