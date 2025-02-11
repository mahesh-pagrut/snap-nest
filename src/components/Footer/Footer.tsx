import Container from '@/components/Container';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20">
      <Container className="p-6 flex flex-col items-center">
        <p className="text-center text-zinc-500 opacity-70">
          10-2-2025 All rights reserved || Built by Mahesh
        </p>
        <Link href="https://www.linkedin.com/in/mahesh-pagrut" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-6 h-6 text-zinc-500 mt-2" />
        </Link>
      </Container>
    </footer>
  );
}

export default Footer;
