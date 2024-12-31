"use client";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="container max-w-xl h-dvh p-8 flex flex-col justify-center">
      <div className="w-full">
        <Field />
      </div>
    </div>
  );
}

interface FieldProps {
  className?: string;
}

function Field({ className }: FieldProps) {
  return (
    <div className={cn("aspect-[8/1] grid grid-cols-12 overflow-hidden relative", className)}>
      <div className="bg-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="border-x border-neutral-100"></div>
      <div className="bg-neutral-100"></div>
    </div>
  );
}