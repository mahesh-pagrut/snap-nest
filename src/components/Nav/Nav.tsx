import Link from 'next/link';
import Container from '@/components/Container';
import UploadButton from '@/components/UploadButton';

const Nav: React.FC = () => {
  return (
    <nav className="flex items-center h-16 border border-zinc-200 p-4">
      <Container className="flex gap-6 items-center flex-row">
        {/* Logo and Title wrapped in Link */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.8 }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7F00FF" />
                <stop offset="50%" stopColor="#3A86FF" />
                <stop offset="100%" stopColor="#FF6B6B" />
              </linearGradient>
            </defs>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M3 7h18M3 17h18M7 3v18M17 3v18" />
          </svg>
          <div>
            <p
              className="text-lg font-bold"
              style={{
                background: "linear-gradient(90deg, #7F00FF, #3A86FF, #FF6B6B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SnapNest
            </p>
            <p className="text-xs opacity-50">Image and video library</p>
          </div>
        </Link>

        {/* Spacer and Upload Button */}
        <div className="flex-grow" />
        <UploadButton />
      </Container>
    </nav>
  );
};

export default Nav;
