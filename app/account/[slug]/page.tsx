'use client';

import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export default function page() {
	const param = useParams();
	return <div>account of {param.slug}</div>;
}
