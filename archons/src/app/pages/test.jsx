'use client';
import { Parallax } from 'react-scroll-parallax';

export default function Test() {
  return (
    <Parallax scale={[1, 0]}>
      <div className="w-[200px] h-[200px] bg-red-500" />
    </Parallax>
  );
}