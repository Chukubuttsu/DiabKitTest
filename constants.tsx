
import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Understanding Type 2 Diabetes',
    level: 'Easy',
    videoUrl: 'https://www.youtube.com/embed/wZAjVQWbMlE',
    description: 'A basic introduction to how insulin and glucose work in your body.',
    quiz: [
      {
        question: "What is the primary role of insulin?",
        options: ["To store fat", "To help glucose enter cells", "To increase blood pressure"],
        correctIndex: 1,
        explanation: "Insulin acts like a key that lets sugar (glucose) from the blood into your cells to be used for energy."
      },
      {
        question: "Which organ produces insulin?",
        options: ["Liver", "Pancreas", "Kidneys"],
        correctIndex: 1,
        explanation: "The pancreas is responsible for producing insulin in the human body."
      }
    ]
  },
  {
    id: '2',
    title: 'The Plate Method',
    level: 'Medium',
    videoUrl: 'https://www.youtube.com/embed/G6jW0X7-T7U',
    description: 'Learn how to balance your plate with protein, fiber, and carbs.',
    quiz: [
      {
        question: "What portion of your plate should be non-starchy vegetables?",
        options: ["1/4", "1/2", "3/4"],
        correctIndex: 1,
        explanation: "Non-starchy vegetables should fill half of your plate to provide essential fiber and nutrients."
      }
    ]
  }
];

export const DTX_MOCK_DATA = [
  { date: 'Jan', value: 110 },
  { date: 'Feb', value: 125 },
  { date: 'Mar', value: 115 },
  { date: 'Apr', value: 130 },
  { date: 'May', value: 105 },
];

export const MEALS_MOCK = [
  {
    id: '1',
    name: 'Grilled Salmon with Quinoa',
    calories: 450,
    carbs: 35,
    protein: 40,
    fat: 15,
    sugar: 2,
    timestamp: new Date(),
    imageUrl: 'https://picsum.photos/seed/salmon/400/300'
  }
];
