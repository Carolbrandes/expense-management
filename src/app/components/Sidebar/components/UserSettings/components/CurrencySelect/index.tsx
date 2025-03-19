'use client'

import { useUserQuery } from '@/app/hooks/useUserQuery';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchCurrencies } from '../../../../../../../lib/fetchCurrencies';
import * as S from './style';

export const CurrencySelect = () => {
  const { user, updateUser, isUserUpdating } = useUserQuery();
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrencies();
      setCurrencies(data);
    };

    fetchData();
  }, []);


  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const acronym = event.target.value;
    const selectedCurrency = currencies.find((currency) => currency.acronym === acronym);

    if (selectedCurrency) {
      updateUser({
        ...user,
        currency: selectedCurrency,
        createdAt: user?.createdAt || new Date(),
        verificationCodes: user?.verificationCodes || [],
      });
    }
  };

  return (
    <>
      <S.CurrencySelectContainer
        id="currency-select"
        onChange={handleCurrencyChange}
        value={user?.currency?.acronym || ''}
        disabled={isUserUpdating}
      >
        <option value="" disabled>
          Select a currency
        </option>
        {currencies.map((currency) => (
          <option key={currency.acronym} value={currency.acronym}>
            {currency.name} ({currency.acronym})
          </option>
        ))}
      </S.CurrencySelectContainer>
      {isUserUpdating && <p>Updating currency...</p>}
    </>
  );
};