import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';


import styles from './ArticleParamsForm.module.scss';
import { ReactNode, useEffect, useState, MouseEventHandler, useRef } from 'react';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	content: ReactNode;
	controles: ReactNode
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { content, controles} = props;
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const className = clsx(styles.container, {
		[styles.container_open]: isOpen
	});

	const handleClose = (e: MouseEvent) => {
		const targetElement = e.target as HTMLElement;

		if (targetElement.closest('article')) {
			setIsOpen(false);
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClose);
		
		return () => {
			document.removeEventListener('click', handleClose);	
		}
	}, []);
	
	return (
		<>
			<ArrowButton formState={isOpen} handleClick={toggleOpen}/>
			<aside className={className}>
				<form className={styles.form}>
					<Text weight={800} uppercase size={31}>
						{'Задайте параметры'}
					</Text>
					{content}
					<div className={styles.bottomContainer}>
						{controles}
					</div>
				</form>
			</aside>
		</>
	);
};
