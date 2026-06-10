// Curated demo content. Each section is a "magazine" of articles.
// Images come from picsum.photos (seeded, so they're stable); a gradient
// fallback is shown if the network is unavailable.

export const SECTIONS = [
  { id: 'foryou', name: 'For You', tagline: 'Stories picked for you' },
  { id: 'tech', name: 'Technology', tagline: 'The future, as it happens' },
  { id: 'science', name: 'Science', tagline: 'Discoveries & deep dives' },
  { id: 'design', name: 'Design', tagline: 'Form, function, and craft' },
  { id: 'business', name: 'Business', tagline: 'Markets, makers, money' },
  { id: 'travel', name: 'Travel', tagline: 'Places worth the trip' },
  { id: 'culture', name: 'Culture', tagline: 'Film, books, music, ideas' },
]

const BODY_BANK = [
  `It started, as these things often do, with a question nobody thought to ask. For years the conventional wisdom held firm — until a small team decided to test the assumption everyone else had been building on.`,
  `The numbers tell one story, but the people behind them tell another. Spend a week with the team and a different picture emerges: late nights, abandoned prototypes, and a stubborn belief that the obvious answer was the wrong one.`,
  `What makes this moment different is scale. Ideas that once lived in research labs and niche forums are now shipping in products used by hundreds of millions of people, and the second-order effects are only beginning to surface.`,
  `Critics argue the excitement is premature, and they have a point: the hard problems remain hard. But dismissing the progress outright means ignoring how quickly "impossible" has become "shipping next quarter."`,
  `There is a version of this story that is purely about technology, and it would be incomplete. The more interesting thread is human: who gets to decide, who benefits, and what we collectively choose to value.`,
  `The lesson, if there is one, is that breakthroughs rarely announce themselves. They accumulate quietly — a tweak here, an unlikely collaboration there — until one day the landscape has changed and everyone claims they saw it coming.`,
]

let uid = 0
function article(section, source, author, title, excerpt, minutes, hoursAgo, seed) {
  uid += 1
  return {
    id: `${section}-${uid}`,
    section,
    source,
    author,
    title,
    excerpt,
    minutes,
    hoursAgo,
    image: `https://picsum.photos/seed/${seed}/1200/800`,
    body: [BODY_BANK[uid % BODY_BANK.length], BODY_BANK[(uid + 2) % BODY_BANK.length], BODY_BANK[(uid + 4) % BODY_BANK.length]],
  }
}

export const ARTICLES = [
  // Technology
  article('tech', 'The Verge', 'Maya Chen', 'The quiet rise of on-device AI: why your next phone won\'t need the cloud', 'Chipmakers are betting billions that the most important AI model is the one running in your pocket.', 7, 2, 'folio-tech1'),
  article('tech', 'Wired', 'Daniel Okafor', 'Inside the lab racing to build batteries that charge in 90 seconds', 'Solid-state cells have been five years away for two decades. This time might actually be different.', 11, 5, 'folio-tech2'),
  article('tech', 'Ars Technica', 'Priya Raman', 'RISC-V grows up: the open chip architecture goes mainstream', 'From hobbyist boards to data centers, the royalty-free instruction set is suddenly everywhere.', 9, 8, 'folio-tech3'),
  article('tech', 'MIT Tech Review', 'Sam Whitlock', 'What happens when code reviews are done by machines?', 'Engineering teams are handing their pull requests to AI reviewers — and learning what humans were missing.', 6, 12, 'folio-tech4'),
  article('tech', 'TechCrunch', 'Lena Park', 'The keyboard startup that refuses to ship until it feels perfect', 'Eight years, three recalls, and a cult following: an unlikely hardware story.', 5, 16, 'folio-tech5'),
  article('tech', 'IEEE Spectrum', 'Tom Eriksen', 'Satellite internet hits a turning point as constellations get crowded', 'Low-earth orbit is filling up fast, and the rules of the road are still being written.', 10, 22, 'folio-tech6'),
  // Science
  article('science', 'Nature', 'Dr. Elise Fontaine', 'Astronomers detect the most distant galaxy yet — and it shouldn\'t exist', 'A galaxy too massive, too soon after the Big Bang, is forcing a rethink of cosmic timelines.', 8, 3, 'folio-sci1'),
  article('science', 'Quanta', 'Robert Aiyer', 'The mathematician who solved a 50-year-old problem with a weekend idea', 'Sometimes the missing piece is a perspective no one thought to try.', 12, 7, 'folio-sci2'),
  article('science', 'Scientific American', 'Hannah Liu', 'Ocean drones are rewriting what we know about hurricanes', 'Autonomous gliders sail straight into category-5 storms so scientists don\'t have to.', 9, 10, 'folio-sci3'),
  article('science', 'New Scientist', 'Marco Bellini', 'Your gut microbiome has a daily rhythm — and jet lag scrambles it', 'New research links circadian disruption in gut bacteria to metabolism and mood.', 6, 14, 'folio-sci4'),
  article('science', 'Smithsonian', 'Aisha Bello', 'A 2,000-year-old computer: new scans reveal the Antikythera mechanism\'s secrets', 'X-ray tomography exposes gearing more sophisticated than anything for the next millennium.', 14, 20, 'folio-sci5'),
  article('science', 'Nautilus', 'Greg Hammond', 'Why octopuses edit their own genes — and what it costs them', 'Cephalopods trade evolutionary speed for on-the-fly RNA editing. The trade-off is fascinating.', 10, 26, 'folio-sci6'),
  // Design
  article('design', 'Dezeen', 'Ingrid Sørensen', 'The airport designed to feel like a forest — and it works', 'Biophilic design at scale: how a major hub cut passenger stress with light, timber, and 3,000 trees.', 7, 4, 'folio-des1'),
  article('design', 'Fast Company', 'Jordan Velez', 'Why every app suddenly looks the same — and the designers fighting back', 'The case against design-system monoculture, from people who build design systems.', 8, 9, 'folio-des2'),
  article('design', 'It\'s Nice That', 'Camille Roy', 'The type foundry reviving letterforms from 19th-century shipping labels', 'Found typography, lovingly digitized — and surprisingly at home on modern screens.', 5, 13, 'folio-des3'),
  article('design', 'Core77', 'Ben Asante', 'One chair, fifty years: the anatomy of a design that refuses to age', 'What makes an object timeless? A teardown of an icon, joint by joint.', 9, 18, 'folio-des4'),
  article('design', 'Creative Review', 'Yuki Tanaka', 'Motion is the new brand: why identity systems are learning to move', 'Static logos are giving way to kinetic identities built for screens first.', 6, 24, 'folio-des5'),
  // Business
  article('business', 'Bloomberg', 'Carter Doyle', 'The four-day week experiment is over. The results surprised everyone.', 'Two years of data from 300 companies — productivity, attrition, and the catch nobody mentions.', 10, 2, 'folio-biz1'),
  article('business', 'The Economist', 'Staff', 'Chipmaking\'s new geography: the trillion-dollar reshuffle', 'Fabs are sprouting on three continents as supply chains untangle and re-form.', 12, 6, 'folio-biz2'),
  article('business', 'Forbes', 'Nadia Hussein', 'She turned a farm stand into a $200M logistics company', 'The unglamorous middle of the supply chain turned out to be the opportunity.', 7, 11, 'folio-biz3'),
  article('business', 'FT', 'Oliver Grant', 'Why the smartest money is quietly moving into boring industries', 'Software margins meet century-old sectors: inside the unsexy gold rush.', 9, 15, 'folio-biz4'),
  article('business', 'Harvard Business Review', 'Dr. Renee Caldwell', 'The meeting that should have been an email — quantified at last', 'Researchers measured the real cost of synchronous work. Brace yourself.', 8, 21, 'folio-biz5'),
  // Travel
  article('travel', 'Condé Nast Traveler', 'Sofia Marin', 'The slow train through the Andes that nobody tells you about', 'Three days, eleven climate zones, and the best window seat on the continent.', 9, 3, 'folio-trav1'),
  article('travel', 'AFAR', 'James Kirkwood', 'Kyoto after the crowds: a local\'s map of the quiet city', 'Skip the bucket list. Here\'s where the city actually breathes.', 7, 8, 'folio-trav2'),
  article('travel', 'Lonely Planet', 'Amara Diallo', 'The world\'s most beautiful bookshops are worth a detour', 'From a converted cathedral to a canal boat, ten stores that justify the trip.', 5, 12, 'folio-trav3'),
  article('travel', 'National Geographic', 'Erik Olsen', 'Hiking the new trail that crosses an entire country', 'A just-completed 1,400 km route stitches together villages, vineyards, and volcanoes.', 11, 17, 'folio-trav4'),
  article('travel', 'Outside', 'Tessa Brooks', 'Why winter is the secret season for the Mediterranean', 'Empty ruins, open tavernas, and sea swims for the brave.', 6, 23, 'folio-trav5'),
  // Culture
  article('culture', 'The New Yorker', 'Marcus Webb', 'The novelist who writes one sentence a day — and outsells everyone', 'On patience, craft, and the strange economics of slowness.', 13, 4, 'folio-cult1'),
  article('culture', 'Pitchfork', 'Dana Reyes', 'How bedroom producers conquered the charts without leaving home', 'The studio is now a laptop, and the gatekeepers never saw it coming.', 8, 9, 'folio-cult2'),
  article('culture', 'The Atlantic', 'Imani Carter', 'We are reading more than ever — just not books', 'The written word is thriving in forms nobody planned for.', 9, 14, 'folio-cult3'),
  article('culture', 'Sight & Sound', 'Paolo Ricci', 'The 40-year-old film that predicted our feeds', 'A rewatch of a cult classic that understood attention before the internet did.', 10, 19, 'folio-cult4'),
  article('culture', 'Aeon', 'Dr. Lina Vogel', 'Boredom is a skill, and we are losing it', 'Philosophers and neuroscientists agree on something for once.', 11, 25, 'folio-cult5'),
]

// "For You" is a hand-mixed selection from every section.
const FOR_YOU_PICKS = ['tech-1', 'science-7', 'design-13', 'business-18', 'travel-23', 'culture-28', 'tech-4', 'science-9']

export function articlesFor(sectionId) {
  if (sectionId === 'foryou') {
    const picks = ARTICLES.filter((a) => FOR_YOU_PICKS.includes(a.id))
    return picks.length >= 4 ? picks : ARTICLES.slice(0, 8)
  }
  return ARTICLES.filter((a) => a.section === sectionId)
}

export function timeAgo(hours) {
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
