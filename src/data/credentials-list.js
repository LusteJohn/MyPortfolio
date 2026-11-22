import ccsaImage from '../assets/credential/ccsa.webp'
import ojtImage from '../assets/credential/ojt.webp'
import orgsImage from '../assets/credential/orgs.webp'
import participantImage from '../assets/credential/participant.webp'
import seminarImage from '../assets/credential/seminar.webp'

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
      image: participantImage,
      details: 'Presented a technology project in an innovation showcase.'
    },
    {
      title: 'On-the-Job Training',
      issuer: 'Completed',
      image: ojtImage,
      details: 'Applied web and system development skills in a professional workplace.'
    },
    {
      title: 'University Organization',
      issuer: 'Completed',
      image: orgsImage,
      details: 'Learned modern web development practice and networked through seminars and sessions.'
    },
    {
      title: 'Figma UX/UI Seminar',
      issuer: 'Completed',
      image: seminarImage,
      details: 'Learned UX/UI in Figma for modern web development mockups and design.'
    }
  ]
}