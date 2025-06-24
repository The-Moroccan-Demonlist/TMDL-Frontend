"use client"


interface LevelCardProps {
  id: string;
  name: string;
  ranking: number;
  difficulty: string;
  publisher: string;
  thumbnail: string;
  points: number;
  levelType: 'classic' | 'platformer';
}