import { Hero } from './Hero';
import { ProductCategories } from './ProductCategories';
import { Services } from './Services';
import { About } from './About';
import { Contact } from './Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <Services />
      <About />
      <Contact />
    </>
  );
}
