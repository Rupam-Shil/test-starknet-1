import { useAccount, useBalance } from '@starknet-react/core';
import React from 'react';

function MyBalance() {
	const { address: userAddress } = useAccount();

	const {
		isLoading: balanceIsLoading,
		isError: balanceIsError,

		data: balanceData,
	} = useBalance({
		address: userAddress,
		watch: true,
		token: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
	});

	return (
		<div className="bg-card rounded-2xl p-4 flex flex-col">
			{!balanceIsLoading && !balanceIsError && userAddress && (
				<div className="">
					<h3 className="text-lg font-bold mb-2">Your Balance</h3>
					<p>Symbol: {balanceData?.symbol}</p>
					<p>Balance: {Number(balanceData?.formatted).toFixed(4)}</p>
				</div>
			)}
		</div>
	);
}

export default MyBalance;
