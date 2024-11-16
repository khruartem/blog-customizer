import { Text } from 'components/text';

import styles from './Button.module.scss';
import { SyntheticEvent } from 'react';
import clsx from 'clsx';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: (e: SyntheticEvent) => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	const className = clsx(styles.button, {
		[styles.button_submit]: type === 'submit',
		[styles.button_reset]: type === 'reset',
	});

	return (
		<button className={className} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
