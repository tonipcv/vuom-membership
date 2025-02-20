'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import {
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  ChartBarSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { satoshi } from '../fonts/fonts';

export function Navigation() {
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => {
    return pathname === path || pathname === `${path}-restrito`;
  };

  const navigationItems = [
    {
      href: isPremium ? '/grafico' : '/grafico-restrito',
      icon: ClipboardDocumentListIcon,
    },
    {
      href: '/relatorio',
      icon: ChartBarSquareIcon,
    },
    {
      href: isPremium ? '/series' : '/series-restrito',
      icon: ChatBubbleBottomCenterTextIcon,
    },
    {
      href: '/perfil',
      icon: UserCircleIcon,
    }
  ];

  return (
    <nav className={`fixed bottom-0 w-full bg-white/90 backdrop-blur-sm border-t border-[#9d96fc]/10 ${satoshi.variable}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center w-12 h-12 rounded-full
                ${isActive(item.href) ? 'text-[#9d96fc]' : 'text-gray-400 hover:text-[#9d96fc]'}
                transition-colors`}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .font-satoshi {
          font-family: var(--font-satoshi);
          letter-spacing: -0.03em;
        }
      `}</style>
    </nav>
  );
} 