export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-transparent">
            <svg
                className="animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.6 }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7F00FF" />  {/* Purple */}
                        <stop offset="50%" stopColor="#3A86FF" /> {/* Blue */}
                        <stop offset="100%" stopColor="#FF6B6B" /> {/* Soft Red */}
                    </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M3 7h18M3 17h18M7 3v18M17 3v18" />
            </svg>
            <p
                className="mt-2 text-sm"
                style={{
                    background: "linear-gradient(90deg, #7F00FF, #3A86FF, #FF6B6B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 0.5,
                }}
            >
                Developed by Mahesh Pagrut
            </p>
        </div>
    );
}
