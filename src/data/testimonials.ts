export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  fullContent: string;
  rating: number;
  image: string;
  date: string;
  category: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Meena',
    role: 'Scholarship Recipient',
    content: 'The Tribal Development Trust changed my life by providing me with an education when I had no hope.',
    fullContent: `As a single mother from a marginalized community, I had lost hope of giving my daughter a good education. The Tribal Development Trust's scholarship program was our miracle. Not only did they cover her school fees and supplies, but they also provided after-school tutoring and mentorship.\n\nMy daughter, who once struggled with basic literacy, is now at the top of her class. She dreams of becoming a doctor and returning to serve our community. The Trust's holistic approach includes parent engagement programs that taught me how to support her education at home.\n\nI now volunteer with the Trust's community outreach program, helping other parents understand the importance of education. We've formed parent-teacher associations in five nearby villages, ensuring that education remains a community priority.`,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1034&q=80',
    date: 'May 1, 2024',
    category: 'Education'
  },
  {
    id: '2',
    name: 'Sunita Devi',
    role: 'Healthcare Beneficiary',
    content: 'The mobile health clinic saved my child\'s life. We are forever grateful for their support.',
    fullContent: `Living in a remote tribal village, access to healthcare was always a challenge. When my youngest son fell seriously ill, we had no way to reach the nearest hospital. The Tribal Development Trust's mobile health clinic was our saving grace.\n\nNot only did they provide immediate medical care, but they also followed up with regular check-ups and provided us with nutritional support. The health awareness programs they conducted in our village have helped prevent many diseases.\n\nToday, I'm proud to be a community health volunteer, helping to bridge the gap between my community and healthcare services.`,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: 'April 15, 2024',
    category: 'Healthcare'
  },
  {
    id: '3',
    name: 'Arjun Singh',
    role: 'Livelihood Program Participant',
    content: 'The agricultural training program helped me double my crop yield and improve my family\'s income.',
    fullContent: `As a small-scale farmer, I struggled to make ends meet. The Tribal Development Trust's sustainable agriculture program transformed my life. They provided training in modern farming techniques, high-quality seeds, and connected me with fair-trade markets.\n\nWithin a year, I was able to double my crop yield and increase my income by 150%. The best part was learning about organic farming methods that are both environmentally friendly and cost-effective.\n\nNow, I train other farmers in my community, and together we've formed a cooperative that has given us better bargaining power in the market.`,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    date: 'March 28, 2024',
    category: 'Livelihood'
  }
];
