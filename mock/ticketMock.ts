export const ticketMock = {
  id: '0123123',
  name: 'Painting Rebel agent',
  status: 'In Progress',
  priority: 'Medium',
  deadline: '2026-03-25',
  description:
    'Die Rebellen-Agenten Miniaturen grundieren und anschließend mit Basisfarben bemalen. Fokus auf Gesichter und Ausrüstung.',
  timeEntries: [
    {
      id: 'te-1',
      date: '12.03.2026',
      startTime: '09:00',
      endTime: '10:30',
      activity: 'Grundierung',
    },
    {
      id: 'te-2',
      date: '12.03.2026',
      startTime: '10:45',
      endTime: '12:00',
      activity: 'Basisfarben auftragen',
    },
    {
      id: 'te-3',
      date: '12.03.2026',
      startTime: '13:00',
      endTime: '13:45',
      activity: 'Gesichter bemalen',
    },
  ],
}
