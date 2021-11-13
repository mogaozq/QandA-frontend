/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

function PageTitle({ children }: Props) {
  return (
    <h2
      css={css`
        font-size: 15px;
        font-weight: bold;
        margin: 10px 0px 5px;
        text-align: center;
        text-transform: uppercase;
      `}
    >
      {children}
    </h2>
  );
}

export default PageTitle;
