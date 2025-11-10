import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Button } from '../button/Button';

type ArticleParamsFormProps = {
	appStyle: ArticleStateType;
	//setAppStyle: ;
	changeAppStyle: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [ articleParams, setArticleParams ] = useState(props.appStyle);
	const { fontFamilyOption, fontColor, backgroundColor, contentWidth, fontSizeOption } = articleParams;

	const toggleOpen = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const className = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});

	const handleFontChange = (selectedOption: OptionType) => {
		setArticleParams({
			...articleParams,
			fontFamilyOption: selectedOption
		});
	};

	const handleFontSize = (selectedOption: OptionType) => {
		setArticleParams({
			...articleParams,
			fontSizeOption: selectedOption
		});
	};

	const handleFontColorChange = (selectedOption: OptionType) => {
		setArticleParams({
			...articleParams,
			fontColor: selectedOption
		});
	};

	const handleBgColorChange = (selectedOption: OptionType) => {
		setArticleParams({
			...articleParams,
			backgroundColor: selectedOption
		});
	};

	const handleContainerWidthChange = (selectedOption: OptionType) => {
		setArticleParams({
			...articleParams,
			contentWidth: selectedOption
		});
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		props.changeAppStyle(articleParams);
	};

	const handleReset = () => {
		props.changeAppStyle(defaultArticleState);
		setArticleParams(defaultArticleState);
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClose = (e: MouseEvent) => {
			const targetElement = e.target as HTMLElement;
	
			if (targetElement.closest('article')) {
				setIsMenuOpen(false);
			}
		};
		
		document.addEventListener('click', handleClose);

		return () => {
			document.removeEventListener('click', handleClose);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton formState={isMenuOpen} handleClick={toggleOpen} />
			<aside className={className}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as={'h2'} weight={800} uppercase size={31}>
						{'Задайте параметры'}
					</Text>
					<Select
							selected={fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontChange}
							title='Шрифт'
						/>
						<RadioGroup
							name={'font-controles'}
							options={fontSizeOptions}
							selected={fontSizeOption}
							title={'Размер шрифта'}
							onChange={handleFontSize}
						/>
						<Select
							selected={fontColor}
							options={fontColors}
							onChange={handleFontColorChange}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={backgroundColor}
							options={backgroundColors}
							onChange={handleBgColorChange}
							title='Цвет фона'
						/>
						<Select
							selected={contentWidth}
							options={contentWidthArr}
							onChange={handleContainerWidthChange}
							title='Ширина контента'
						/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
