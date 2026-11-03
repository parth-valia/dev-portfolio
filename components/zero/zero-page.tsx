import { Activity } from './activity';
import { Build } from './build';
import { Contact } from './contact';
import { Experience } from './experience';
import { Faq } from './faq';
import { IdeaProvider } from './idea-context';
import { Nav } from './nav';
import { Notes } from './notes';
import { Process } from './process';
import { Scope } from './scope';
import { Situations } from './situations';
import { Testimonials } from './testimonials';
import { Work } from './work';

export function ZeroPage() {
  return (
    <IdeaProvider>
      <Nav />
      <main id="main">
        <Build />
        <Work />
        <Situations />
        <Scope />
        <Process />
        <Experience />
        <Activity />
        <Testimonials />
        <Notes />
        <Faq />
      </main>
      <Contact />
    </IdeaProvider>
  );
}
