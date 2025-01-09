'use client';
import React from 'react';
import BlockData from './BlockData';
import MyBalance from './MyBalance';
import ReadContract from './ReadContract';
import WriteContract from './WriteContract';

function TestComponents() {
	return (
		<div className="grid grid-cols-2 gap-4">
			<BlockData />
			<MyBalance />
			<ReadContract />
			<WriteContract />
		</div>
	);
}

export default TestComponents;
