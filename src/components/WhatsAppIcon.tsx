import React from 'react';

interface WhatsAppIconProps {
  className?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = 'w-5 h-5' }) => (
  <img
    src="/img/whatsapp-mark.svg"
    alt=""
    aria-hidden="true"
    className={`shrink-0 object-contain ${className}`}
  />
);