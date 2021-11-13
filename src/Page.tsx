/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import PageTitle from './PageTitle';

interface Props {
  title?: string;
  children: React.ReactNode;
}
const pageStyles = css`
  margin: 50px auto 20px auto;
  padding: 30px 20px;
  max-width: 600px;
`;

function Page({ title, children }: Props) {
  return (
    <div css={pageStyles}>
      {title && <PageTitle children={title} />}
      {children}
    </div>
  );
}

export default Page;
