/* eslint-disable @typescript-eslint/no-unused-vars */
import { ABI } from '@/abis/wallet-abi';
import {
	useAccount,
	useContract,
	useContractWrite,
	useWaitForTransaction,
} from '@starknet-react/core';
import React, { useMemo, useState, useTransition } from 'react';
import { Abi } from 'starknet';

function WriteContract() {
	const contractAddress =
		'0x00c1f43c48320b339994847e82dd8616a05d385b0a33a4eeadd1217e0728adc4';
	const [amount, setAmount] = useState<number | ''>(0);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		writeAsync();
	};
	const { address: userAddress } = useAccount();

	const typedABI = ABI as Abi;
	const { contract } = useContract({
		abi: typedABI,
		address: userAddress,
	});

	const calls = useMemo(() => {
		if (!userAddress || !contract) return [];
		const safeAmount = amount || 0;
		return [contract.populate('transfer', [contractAddress, safeAmount])];
	}, [contract, userAddress, amount]);

	const {
		writeAsync,
		data: writeData,
		isPending: writeIsPending,
		error: writeError,
	} = useContractWrite({
		calls,
	});

	const {
		data: waitData,
		status: waitStatus,
		isLoading: waitIsLoading,
		isError: waitIsError,
		error: waitError,
	} = useWaitForTransaction({
		hash: writeData?.transaction_hash,
		watch: true,
	});

	console.log({ writeError });

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setAmount(value === '' ? '' : Number(value));
	};
	const LoadingState = ({ message }: { message: string }) => (
		<div className="flex items-center space-x-2">
			<div className="animate-spin">
				<svg
					className="h-5 w-5 text-gray-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
			</div>
			<span>{message}</span>
		</div>
	);
	const buttonContent = () => {
		if (writeIsPending) {
			return <LoadingState message="Send..." />;
		}

		if (waitIsLoading) {
			return <LoadingState message="Waiting for confirmation..." />;
		}

		if (waitStatus === 'error') {
			return <LoadingState message="Transaction rejected..." />;
		}

		if (waitStatus === 'success') {
			return 'Transaction confirmed';
		}

		return 'Send';
	};
	return (
		<div className="bg-card rounded-2xl p-4 flex flex-col">
			<form onSubmit={handleSubmit} className="p-4">
				<h3 className="text-lg font-bold mb-2">Write to Contract</h3>
				<label
					htmlFor="amount"
					className="block text-sm font-medium text-gray-300"
				>
					Amount:
				</label>
				<input
					type="number"
					id="amount"
					value={amount}
					onChange={handleAmountChange}
					className="block w-full px-3 py-2 text-sm leading-6 rounded-lg  focus:outline-none  black-border-p bg-transparent border border-gray-200"
				/>
				<button
					type="submit"
					className="mt-3 border border-black text-black font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
					disabled={!userAddress || writeIsPending}
				>
					{buttonContent()}
				</button>
				{writeData?.transaction_hash && (
					<a
						href={`https://sepolia.voyager.online/tx/${writeData?.transaction_hash}`}
						target="_blank"
						className="block mt-2 text-blue-500 hover:text-blue-700 underline"
						rel="noreferrer"
					>
						Check TX on Sepolia
					</a>
				)}
			</form>
		</div>
	);
}

export default WriteContract;
