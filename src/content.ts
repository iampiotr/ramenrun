const photo = (file: string) => `${import.meta.env.BASE_URL}photos/siem-reap/${file}`

export const site = {
  name: "Brandon's Ramen Run",
  owner: "Brandon's",
  brand: 'Ramen Run',
  tagline: 'One packet. One full belly.',
}

export const nav = [
  { label: 'The Cause', href: '#cause' },
  { label: 'How It Works', href: '#how' },
  { label: 'Drops', href: '#drops' },
  { label: 'About Brandon', href: '#bio' },
  { label: 'Photos', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
]

export const hero = {
  titleTop: 'One packet.',
  titleRotating: ['One full belly.', 'One day in school.', '*Endless* potential.'],
  body: 'Kids in rural Cambodian villages often go to school hungry. Your donation buys ramen packets that I hand-deliver to families who need them most.',
  image: photo('hero_classroom.jpg'),
  imageAlt: 'Handing ramen packets to children at their desks in a classroom',
}

export const cause = {
  eyebrow: 'The Cause',
  title: 'No kid should learn on an empty stomach',
  paragraphs: [
    'Outside the temples and tourist streets of Siem Reap, many families live on less than a few dollars a day. When rice runs low or a harvest fails, kids are often the first to skip meals.',
    'Hunger makes it harder to focus in class, harder to grow, and harder to stay healthy. A simple, warm meal makes a real difference on the days it matters most.',
  ],
  fact: {
    stat: 'About 1 in 5',
    text: 'children under five in Cambodia are stunted from chronic undernutrition.',
    source: 'Cambodia Demographic and Health Survey 2021-22',
  },
  videoId: 'Dpr9wY5VU94',
  videoTitle: 'Direct Impact in Cambodia',
}

export const howItWorks = {
  eyebrow: 'How It Works',
  title: 'From your wallet to their bowl',
  intro: 'No middlemen, no overhead. Every dollar goes to food and getting it to the villages.',
  steps: [
    {
      title: 'You donate',
      body: 'Give any amount. Every 50 cents buys one packet of ramen.',
    },
    {
      title: 'I buy in bulk',
      body: 'I buy ramen by the case from local markets in Siem Reap, which supports local sellers and stretches every dollar.',
    },
    {
      title: 'I deliver it',
      body: 'I load up and drive the food out to villages, working with local village leaders to reach the families who need it most.',
    },
    {
      title: 'Kids eat',
      body: 'Packets go straight into the hands of kids and their families. I share photos and updates from every trip.',
    },
  ],
}

export const drops = {
  eyebrow: 'Ramen Drops',
  title: 'The drop timeline',
  stops: [
    { year: '2026', place: 'Cambodia', flag: '🇰🇭', status: 'Now' },
    { year: '2027', place: 'Vietnam', flag: '🇻🇳', status: 'Next' },
    { year: '2028', place: 'TBD', flag: '🌏', status: 'Future' },
  ],
}

export const bio = {
  eyebrow: 'About Brandon',
  name: 'Brandon',
  role: "Founder, Brandon's Ramen Run",
  photo: photo('portrait.png'),
  photoAlt: "Portrait of Brandon, founder of Brandon's Ramen Run",
  quote: 'I saw kids sharing one bowl between four. I knew I could do something.',
  paragraphs: [
    "Hi, I'm Brandon! I started the Ramen Run after visiting Siem Reap and spending time in the villages just outside the city. The kids I met were funny, curious, and full of energy, and many of them were also hungry.",
    'Ramen is cheap, lasts a long time, and is easy to cook with just hot water, so it is a practical way to make sure a family has something to eat. I started with my own savings, and now with your help I can reach more villages every trip.',
    'I am not a big charity. I am one person who decided to show up. Every packet you fund is one I personally carry to a kid who needs it.',
  ],
}

export type GalleryPhoto = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

// Drop your real photos in public/photos/siem-reap/ and update src, width, and height.
export const gallery = {
  eyebrow: 'Siem Reap Campaign',
  title: 'Photos from the last trip',
  intro: 'Snapshots from our most recent delivery run around Siem Reap. Tap any photo to see it larger.',
  photos: [
    {
      src: photo('01.svg'),
      alt: 'Cases of ramen stacked in the back of a truck',
      caption: 'Loading up at the market',
      width: 800,
      height: 1000,
    },
    {
      src: photo('02.svg'),
      alt: 'Kids lining up to receive ramen packets',
      caption: 'The line forms fast',
      width: 1200,
      height: 800,
    },
    {
      src: photo('03.svg'),
      alt: 'A girl smiling while holding two ramen packets',
      caption: 'Two packets, one big smile',
      width: 800,
      height: 800,
    },
    {
      src: photo('04.svg'),
      alt: 'A village chief helping hand out food',
      caption: 'Working with the village chief',
      width: 1200,
      height: 800,
    },
    {
      src: photo('05.svg'),
      alt: 'A family cooking ramen over a small fire',
      caption: 'Dinner is served',
      width: 800,
      height: 1000,
    },
    {
      src: photo('06.svg'),
      alt: 'A rural road through rice paddies outside Siem Reap',
      caption: 'On the road to the next village',
      width: 1200,
      height: 800,
    },
    {
      src: photo('07.svg'),
      alt: 'A group of kids waving at the camera',
      caption: 'Thank you from the kids!',
      width: 800,
      height: 800,
    },
    {
      src: photo('08.svg'),
      alt: 'Empty boxes after a delivery day',
      caption: 'Every box, delivered',
      width: 800,
      height: 1000,
    },
  ] satisfies GalleryPhoto[],
}

export const faq = {
  eyebrow: 'FAQ',
  title: 'Where does the money go?',
  items: [
    {
      q: 'How much of my donation goes to food?',
      a: 'All of it goes to food and delivery costs such as fuel. I pay for my own flights, lodging, and personal expenses.',
    },
    {
      q: 'How much does one packet cost?',
      a: 'About 50 cents (roughly 2,000 riel) when bought in bulk from local markets in Siem Reap. Prices change a little, so I update this number after each trip.',
    },
    {
      q: 'How do you choose which villages to visit?',
      a: 'I work with local contacts and village leaders to find communities with the greatest need, focusing on families with young kids.',
    },
    {
      q: 'How can I see that the food was delivered?',
      a: 'I post photos and receipts after every delivery trip. You can see past trips in the photo gallery above, and I am happy to answer questions by email.',
    },
    {
      q: 'Is my donation tax-deductible?',
      a: "Not at this time. Brandon's Ramen Run is a personal project, not a registered charity, so donations are gifts and are not tax-deductible.",
    },
  ],
}

export const finalCta = {
  title: 'Fill a bowl today',
  body: 'Every 50 cents is one more meal for a kid in Cambodia. Start with whatever you can.',
}
