// menu-item.tsx
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export interface IMenuItem {
  to: string;
  icon: IconProp;
  children?: React.ReactNode;
}

const MenuItem: React.FC<IMenuItem> = ({ to, icon, children }) => (
  <div>
    <FontAwesomeIcon icon={icon} />
    {children}
  </div>
);

export default MenuItem; // Exportez le composant MenuItem par défaut
