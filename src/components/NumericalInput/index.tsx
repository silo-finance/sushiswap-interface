import { classNames, escapeRegExp } from '../../functions';

import React from 'react';

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

const defaultClassName = 'w-0 p-0 text-2xl bg-transparent';

export const Input = React.memo(
  ({
    value,
    onUserInput,
    placeholder,
    className = defaultClassName,
    ...rest
  }: {
    value: string | number;
    onUserInput: (input: string) => void;
    error?: boolean;
    fontSize?: string;
    align?: 'right' | 'left';
  } & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
    const enforcer = (nextUserInput: string) => {
      if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
        onUserInput(nextUserInput);
      }
    };

    return (
      <input
        {...rest}
        value={value}
        onChange={(event) => {
          // replace commas with periods, because uniswap exclusively uses period as the decimal separator
          enforcer(event.target.value.replace(/,/g, '.'));
        }}
        // universal input options
        inputMode="decimal"
        title="Token Amount"
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || '0.0'}
        min={0}
        minLength={1}
        maxLength={79}
        spellCheck="false"
        className={classNames(
          'relative font-bold outline-none border-none flex-auto overflow-hidden overflow-ellipsis placeholder-low-emphesis focus:placeholder-primary',
          className
        )}
      />
    );
  }
);

Input.displayName = 'NumericalInput';

export default Input;

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
