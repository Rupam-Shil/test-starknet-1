'use client';
import { useBlockNumber } from '@starknet-react/core';
import React from 'react';
import { BlockTag } from 'starknet';

function BlockData() {
	const {
		data: blockNumber,
		isLoading: isBlockNumberLoading,
		isError: isBlockNumberError,
	} = useBlockNumber({
		blockIdentifier: 'latest' as BlockTag,
	});

	const workshopEnds = 713552;
	return (
		<div className="bg-card rounded-2xl p-4 flex flex-col">
			<h1 className="text-3xl font-bold text-center mb-6">
				Starknet Frontend Workshop
			</h1>

			<div className="flex flex-wrap justify-center gap-4">
				<div className="w-full max-w-md space-y-4">
					{!isBlockNumberLoading && !isBlockNumberError && (
						<div
							className={`p-4 border-black border ${
								blockNumber! < workshopEnds ? 'bg-green-500' : 'bg-red-500'
							}`}
						>
							<h3 className="text-lg font-bold mb-2">Read the Blockchain</h3>
							<p>Current Block: {blockNumber}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default BlockData;
