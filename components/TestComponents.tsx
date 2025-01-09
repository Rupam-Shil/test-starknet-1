'use client';
import React from 'react';
import BlockData from './BlockData';
import MyBalance from './MyBalance';

function TestComponents() {
	return (
		<div className="grid grid-cols-2 gap-4">
			<BlockData />
			<MyBalance />
		</div>
	);
}

export default TestComponents;
