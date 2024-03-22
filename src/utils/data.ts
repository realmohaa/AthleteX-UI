import dribble from '../assets/images/dribble.png';
import shoot from '../assets/images/shoot.png';
import finish from '../assets/images/finish.png';

// TYPES
type excercise = {
    name: string;
    description: string;
    effortLevel: number;
    videoLink: string;
    category: string;
    duration: number;
    reps: number;
    sets: number;
}

type FocusItem = {
    name: string;
    items: { label: string; value: string }[];
};

export type Goal = {
  name: string,
  img: any
}

// User State Shift
export const SelectedGoals : Goal[] = [
  {
      name: 'Dribbling',
      img: dribble,
  },
  {
      name: 'Shooting',
      img: shoot,
  },
  {
      name: 'Finishing',
      img: finish,
  }
]

// Mock Data

export const ExerciseCategory : Goal[] = [
  {
      name: 'Dribbling',
      img: dribble,
  },
  {
      name: 'Shooting',
      img: shoot,
  },
  {
      name: 'Defending',
      img: finish,
  },
  {
    name: 'Blocking',
    img: dribble,
  },
  {
      name: 'Stealing',
      img: shoot,
  },
  {
      name: 'Two Point Shooting',
      img: finish,
  },
  {
    name: 'Three Point Shooting',
    img: finish,
  },
  {
    name: 'Free Throw',
    img: finish,
  },
  {
    name: 'Rebounding',
    img: finish,
  },
  {
    name: 'Conditioning',
    img: finish,
  },
  {
    name: 'Footwork',
    img: finish,
  }
]

export const focusItems:  FocusItem[] = [
    {
      name: 'Time Selection',
      items: [
        {label: '60', value: '60'},
        {label: '30', value: '30'},
        {label: '15', value: '15'},
      ]
    },
    {
      name: 'Equipment',
      items: [
        {label: 'Gym', value: 'Gym'},
        {label: 'Home', value: 'Home'},
        {label: 'Work', value: 'Work'},
      ]
    },
  ]

export const excercisesData: excercise[] = [
    {
      name: 'Excercise 1',
      description: 'description',
      effortLevel: 0,
      videoLink: 'videoLink',
      category: 'category',
      duration: 0,
      reps: 0,
      sets: 0,
    },
    {
      name: 'Excercise 2',
      description: 'description',
      effortLevel: 0,
      videoLink: 'videoLink',
      category: 'category',
      duration: 0,
      reps: 0,
      sets: 0,
    },
    {
      name: 'Excercise 3',
      description: 'description',
      effortLevel: 0,
      videoLink: 'videoLink',
      category: 'category',
      duration: 0,
      reps: 0,
      sets: 0,
    },
    {
      name: 'Excercise 4',
      description: 'description',
      effortLevel: 0,
      videoLink: 'videoLink',
      category: 'category',
      duration: 0,
      reps: 0,
      sets: 0,
    },
]