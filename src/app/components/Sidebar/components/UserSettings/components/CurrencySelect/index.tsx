'use client'

import { useUserQuery } from '@/app/hooks/useUserQuery';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { fetchCurrencies } from '../../../../../../../lib/fetchCurrencies';
import * as S from './style';


export const CurrencySelect = () => {
  const { user, updateUser, isUserUpdating } = useUserQuery();

  // Fetch currencies
  const {
    data: currencies = [],
    isLoading: isLoadingCurrencies,
    error: currenciesError,
  } = useQuery<ICurrency[]>({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: Infinity,
  });

  // Handle currency change
  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const acronym = event.target.value;
    const selectedCurrency = currencies.find((currency) => currency.acronym === acronym);

    if (selectedCurrency) {
      // Update the user's currency
      updateUser({
        ...user,
        currency: selectedCurrency,
        createdAt: user?.createdAt || new Date(), // Provide a default value if missing
        verificationCodes: user?.verificationCodes || [], // Provide a default value if missing
      });
    }
  };

  // Show loading state while fetching currencies
  if (isLoadingCurrencies) {
    return <div>Loading currencies...</div>;
  }

  // Show error state if fetching currencies fails
  if (currenciesError) {
    return <div>Error loading currencies: {currenciesError.message}</div>;
  }

  return (
    <>
      <S.CurrencySelectContainer
        id="currency-select"
        onChange={handleCurrencyChange}
        value={user?.currency?.acronym || ''} // Set the selected value to the user's current currency
        disabled={isUserUpdating} // Disable the select while updating the user
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