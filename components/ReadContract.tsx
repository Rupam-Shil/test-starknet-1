/* eslint-disable @typescript-eslint/no-unused-vars */
import { ABI } from '@/abis/abi';
import { useContractRead } from '@starknet-react/core';
import React from 'react';
import { Abi } from 'starknet';

function ReadContract() {
	const contractAddress =
		'0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
	const {
		data: readData,
		refetch: dataRefetch,
		isError: readIsError,
		isLoading: readIsLoading,
		error: readError,
	} = useContractRead({
		functionName: 'total_supply',
		args: [],
		abi: ABI as Abi,
		address: contractAddress,
		watch: true,
		refetchInterval: 1000,
	});

	return (
		<div className="bg-card rounded-2xl p-4 flex flex-col">
			<div className="">
				<h3 className="text-lg font-bold mb-2">Contract Balance</h3>
				<p>Total Supply of STRK Token: {readData?.toString()}</p>
				<button
					onClick={() => dataRefetch()}
					className="mt-2 border border-black text-black font-regular py-1 px-3 bg-yellow-300 hover:bg-yellow-500"
				>
					Refresh
				</button>
			</div>
		</div>
	);
}

export default ReadContract;
