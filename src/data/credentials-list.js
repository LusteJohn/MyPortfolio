import ccsaImage from '../assets/credential/ccsa.png'

export const credentials = {
  icon: 'fa-solid fa-award',
  eyebrow: 'Credentials',
  title: 'Certificates & recognitions',
  description: 'Selected training, competition, and workplace experience.',
  tags: ['Certification', 'Competition', 'Workplace learning'],
  credentials: [
    {
      title: 'Certified Cloud System Analyst',
      issuer: 'Cloud certification',
      details: 'Cloud system analysis and design.',
      image: ccsaImage
    },
    {
      title: 'IT Innovation Showcase',
      issuer: 'Participant',
      details: 'Presented an technology project in an innovation showcase.'
    },
    {
      title: 'On-the-Job Training',
      issuer: 'Completed',
      details: 'Applied web and system development skills in a professional workplace.'
    }
  ]
}
