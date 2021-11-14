/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';

import { UserIcon } from './Icons';
import { css } from '@emotion/react';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const containerStyles = css`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid ${gray5};
  box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
  padding: 10px 20px;
`;

const titleStyles = css`
  font-size: 24px;
  text-decoration: none;
  color: ${gray1};
  font-weight: bolder;
`;

const searchInputStyles = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 200px;
  height: 30px;
  :focus {
    outline-color: ${gray5};
  }
`;
interface ISearchFromData {
  search: string;
}

export default function Header() {
  console.log('Header rerendered');
  const [searchParams] = useSearchParams();
  const { register, handleSubmit } = useForm<ISearchFromData>();
  const navigate = useNavigate();

  const submit = ({ search }: ISearchFromData) => {
    navigate(`search?criteria=${search}`);
  };

  return (
    <div css={containerStyles}>
      <Link css={titleStyles} to="">
        Q and A
      </Link>
      <form onSubmit={handleSubmit(submit)}>
        <input
          css={searchInputStyles}
          placeholder="search"
          defaultValue={searchParams.get('criteria') || ''}
          {...register('search', { required: true })}
        />
      </form>
      <Link
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          :focus {
            outline-color: ${gray5};
          }
          span {
            margin-left: 7px;
          }
        `}
        to="signin"
      >
        <UserIcon />
        <span>Sign In</span>
      </Link>
    </div>
  );
}
