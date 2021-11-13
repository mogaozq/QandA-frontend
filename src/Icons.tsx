/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import user from './user.svg';

export function UserIcon() {
  return (
    <img
      src={user}
      alt="user icon"
      css={css`
        width: 12px;
        opacity: 0.6;
      `}
    ></img>
  );
}
