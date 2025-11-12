
import { KnowledgeCategory } from '../types';

export const categories: KnowledgeCategory[] = [
  {
    id: 'arrest',
    title: 'If Arrested',
    icon: 'fas fa-handcuffs',
    description: 'Your rights during an arrest (most critical!)',
    content: `
      <h3 class="text-xl font-bold mb-2">Article 49: Rights of arrested persons</h3>
      <p class="mb-4">An arrested person has the right—</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>(a) to be informed promptly, in language that the person understands, of the reason for the arrest;</li>
        <li>(b) to remain silent;</li>
        <li>(c) to communicate with an advocate, and other persons whose assistance is necessary;</li>
        <li>(d) not to be compelled to make any confession or admission that could be used in evidence against the person;</li>
        <li>(e) to be held separately from persons who are serving a sentence;</li>
        <li>(f) to be brought before a court as soon as reasonably possible, but not later than <strong>twenty-four hours</strong> after being arrested;</li>
        <li>(g) at the first court appearance, to be charged or informed of the reason for the detention continuing, or to be released; and</li>
        <li>(h) to be released on bond or bail, on reasonable conditions, pending a charge or trial, unless there are compelling reasons not to be released.</li>
      </ul>
    `
  },
  {
    id: 'assembly',
    title: 'Right to Assembly',
    icon: 'fas fa-users',
    description: 'Protest and demonstration rights',
    content: `
      <h3 class="text-xl font-bold mb-2">Article 37: Assembly, demonstration, picketing and petition</h3>
      <p>Every person has the right, <strong>peaceably and unarmed</strong>, to assemble, to demonstrate, to picket, and to present petitions to public authorities.</p>
    `
  },
  {
    id: 'expression',
    title: 'Freedom of Expression',
    icon: 'fas fa-bullhorn',
    description: 'What you can say/post online',
    content: `
      <h3 class="text-xl font-bold mb-2">Article 33: Freedom of expression</h3>
      <p class="mb-2">(1) Every person has the right to freedom of expression, which includes—</p>
      <ul class="list-disc pl-6 mb-4">
        <li>(a) freedom to seek, receive or impart information or ideas;</li>
        <li>(b) freedom of artistic creativity; and</li>
        <li>(c) academic freedom and freedom of scientific research.</li>
      </ul>
      <p class="font-semibold">This right does NOT extend to:</p>
      <ul class="list-disc pl-6">
        <li>(a) propaganda for war;</li>
        <li>(b) incitement to violence;</li>
        <li>(c) hate speech; or</li>
        <li>(d) advocacy of hatred.</li>
      </ul>
    `
  },
  {
    id: 'privacy',
    title: 'Privacy Rights',
    icon: 'fas fa-user-secret',
    description: 'Search and seizure limitations',
    content: `
      <h3 class="text-xl font-bold mb-2">Article 31: Privacy</h3>
      <p>Every person has the right to privacy, which includes the right not to have—</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>(a) their person, home or property searched;</li>
        <li>(b) their possessions seized;</li>
        <li>(c) information relating to their family or private affairs unnecessarily required or revealed; or</li>
        <li>(d) the privacy of their communications infringed.</li>
      </ul>
    `
  },
  {
    id: 'bail',
    title: 'Bail & Court',
    icon: 'fas fa-gavel',
    description: 'Legal process and fair trial rights',
    content: `
      <h3 class="text-xl font-bold mb-2">Article 49 (1) (h): Bail and Bond</h3>
      <p class="mb-4">An arrested person has the right to be released on bond or bail, on reasonable conditions, pending a charge or trial, unless there are compelling reasons not to be released.</p>
      <h3 class="text-xl font-bold mb-2">Article 50: Fair hearing</h3>
      <p>Every accused person has the right to a fair trial, which includes the right—</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>(a) to be presumed innocent until the contrary is proved;</li>
        <li>(b) to be informed of the charge, with sufficient detail to answer it;</li>
        <li>(c) to have adequate time and facilities to prepare a defence.</li>
      </ul>
    `
  },
  {
    id: 'police',
    title: 'Police Powers',
    icon: 'fas fa-shield-alt',
    description: 'What police can/cannot do',
    content: `
      <h3 class="text-xl font-bold mb-2">Police Powers & Limitations</h3>
      <p class="mb-4">The National Police Service Act and the Constitution limit police powers to protect your rights:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Police must respect human rights and fundamental freedoms (Constitution, Art. 244).</li>
        <li>Force may only be used when necessary and in proportion to the objective (Sixth Schedule, NPS Act).</li>
        <li>Deadly force is a last resort, only to prevent death or serious injury.</li>
        <li>You cannot be subjected to torture or cruel, inhuman, or degrading treatment (Constitution, Art. 29).</li>
        <li>Searches of your person or property generally require a warrant or reasonable cause (Constitution, Art. 31).</li>
      </ul>
    `
  },
];
