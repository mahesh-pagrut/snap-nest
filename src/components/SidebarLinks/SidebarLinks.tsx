'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SidebarLink {
  icon?: ReactNode;
  label: string;
  path: string;
}

interface SidebarLinksProps {
  className?: string;
  links: Array<SidebarLink>;
}

export default function SidebarLinks({ className, links }: SidebarLinksProps) {
  const activePath = usePathname();

  return (
    <ul className={cn('', className)}>
      {links.map(({ label, path, icon }) => {
        const isActive = path === activePath;

        return (
          <li key={`${label}-${path}`} className="mb-2">
            <Link
              className={cn(
                'flex w-full items-center gap-3 px-8 py-2 transition-all duration-300 md:radius-r-lg',
                'rounded-lg overflow-hidden', // Ensures rounded corners apply
                isActive 
                  ? 'text-white bg-gradient-to-r from-[#7F00FF] via-[#3A86FF] to-[#FF6B6B] shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-200'
              )}
              href={path}
            >
              {icon} {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
