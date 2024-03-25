import dribble from '../assets/images/dribble.png';
import shoot from '../assets/images/shoot.png';
import finish from '../assets/images/finish.png';

// TYPES
export type Excercise = {
    name: string;
    description: string;
    effortLevel: number;
    videoLink: string;
    category: string;
    duration: number;
    reps: number;
    sets: number;
}

export type FocusItem = {
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
export const Equipments = ['Basketball','Cones','Hoop','Jump Rope','Medicine Ball','Resistance Band','Weights']

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
        {label: '60 Mins', value: '60'},
        {label: '30 Mins', value: '30'},
        {label: '15 Mins', value: '15'},
      ]
    },
  ]

export const excercisesData: Excercise[] = [
  // {
  //   name: 'string',
  //   description: 'string',
  //   effortLevel: 100,
  //   videoLink: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //   category: 'string',
  //   duration: 1,
  //   reps: 5,
  //   sets: 4
  // }
]

export const testSets = [
  {
      reps: 5,
      effortLevel: 10
  },
  {
      reps: 5,
      effortLevel: 60
  },
  {
      reps: 5,
      effortLevel: 100
  }
]