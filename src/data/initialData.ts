import { Platform } from '../types';

export const initialPlatforms: Platform[] = [
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: 'MessageSquare',
    color: 'rgb(92, 52, 162)',
    backgroundColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    companies: [
      { id: 1, name: 'Empresa 1', messageCount: 24 },
      { id: 2, name: 'Empresa 2', messageCount: 18 },
      { id: 3, name: 'Empresa 3', messageCount: 32 }
    ],
    active: true
  },
  {
    id: 'zoom',
    name: 'Zoom',
    icon: 'Video',
    color: 'rgb(47, 85, 212)',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    companies: [
      { id: 1, name: 'Empresa 1', messageCount: 15 },
      { id: 2, name: 'Empresa 2', messageCount: 27 },
      { id: 3, name: 'Empresa 3', messageCount: 9 }
    ],
    active: true
  },
  {
    id: 'meet',
    name: 'Google Meet',
    icon: 'Video',
    color: 'rgb(26, 115, 86)',
    backgroundColor: 'bg-gradient-to-br from-green-50 to-green-100',
    companies: [
      { id: 1, name: 'Empresa 1', messageCount: 12 },
      { id: 2, name: 'Empresa 2', messageCount: 8 },
      { id: 3, name: 'Empresa 3', messageCount: 21 }
    ],
    active: true
  }
];