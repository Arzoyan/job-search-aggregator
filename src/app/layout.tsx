// src/app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google'; // Optional: Using Google Fonts
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Search Aggregator',
  description: 'A simple app to aggregate job listings from various APIs.',
};


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider>
          <main style={{
            padding: 24
          }}>
            <h2 style={{
              marginBottom: 12,
            }}>Job Search Aggregator</h2>
            {children}
          </main>
        </ConfigProvider>
      </body>
    </html>
  );
};

export default RootLayout;
