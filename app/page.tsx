'use client';
import TestComponents from '@/components/TestComponents';
import {
	Connector,
	useAccount,
	useConnect,
	useDisconnect,
} from '@starknet-react/core';
import React, { useMemo } from 'react';

interface WalletAvailability {
	[key: string]: boolean;
}

function Page() {
	const { connect, connectors } = useConnect();
	const { address } = useAccount();
	const { disconnect, isPending: isDisconnecting } = useDisconnect();

	const connectorsAvailable = useMemo<Record<string, boolean>>(() => {
		const availableMap = connectors.reduce<WalletAvailability>(
			(acc, connector) => {
				acc[connector.id] = connector.available();
				return acc;
			},
			{} as WalletAvailability
		);
		return {
			braavos: availableMap?.braavos || false,
			argent: availableMap?.argent || false,
		};
	}, [connectors]);

	return (
		<div className="min-h-screen w-screen flex items-center justify-center  flex-col gap-12 ">
			<div className="rounded-3xl bg-card p-4 min-w-[30vw] flex items-center flex-col gap-4">
				<p color="text-white">Wallets</p>
				{address && (
					<button
						onClick={() => disconnect()}
						className="rounded-lg p-2 m-2 cursor-pointer text-white bg-card-light"
					>
						{isDisconnecting ? 'Disconnecting...' : `Disconnect: ${address}`}
					</button>
				)}
				{!address && (
					<div className="flex flex-col gap-2 w-full">
						{['braavos', 'argent'].map((wallet) => (
							<WalletButton
								wallet={wallet}
								key={wallet}
								connector={connectors.find((c) => c.id === wallet)}
								onConnect={(connector) => connect({ connector })}
								isAvailable={connectorsAvailable[wallet]}
							/>
						))}
					</div>
				)}
			</div>
			{address && <TestComponents />}
		</div>
	);
}

interface WalletButtonProps {
	connector?: Connector;
	onConnect: (connector: Connector) => void;
	isAvailable: boolean;
	wallet: string;
}

const WalletButton = ({
	wallet,
	connector,
	onConnect,
	isAvailable,
}: WalletButtonProps) => {
	const baseStyles = 'rounded-lg p-2 m-2 cursor-pointer text-white flex-1';

	if (!isAvailable && !connector) {
		return (
			<a
				href={`https://www.argent.xyz/argent-x`}
				target="_blank"
				rel="noopener noreferrer"
				className={`${baseStyles} bg-card-light text-center`}
			>
				Download {wallet}
			</a>
		);
	}

	return (
		<button
			onClick={() => onConnect(connector!)}
			className={`${baseStyles} bg-card-light`}
		>
			Connect {wallet}
		</button>
	);
};

export default Page;
