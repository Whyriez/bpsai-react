import React from 'react';

const UserAvatar = () => (
  <div className="w-10 h-10 bg-bps-light-blue rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
    <svg className="w-5 h-5 text-bps-blue" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

export default UserAvatar;