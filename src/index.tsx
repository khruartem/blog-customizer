import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { backgroundColors, contentWidthArr, defaultArticleState, fontFamilyOptions, fontSizeOptions, OptionType, SelectedOption } from './constants/articleProps';
import { Select } from './components/select/Select';
import { fontColors } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Separator } from './components/separator';
import { Button } from './components/button';
import { RadioGroup } from './components/radio-group';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultStyle = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	};

	const defaultSelected = {
		'font-family': fontFamilyOptions[0],
		'font-color': fontColors[0],
		'font-size': fontSizeOptions[0],
		'container-width': contentWidthArr[0],
		'bg-color': backgroundColors[0]
	} as SelectedOption;

	const [selected, setSelected] = useState(defaultSelected);
	const [style, setStyle] = useState(defaultStyle);
	const styleRef = useRef(style);

	const handleFontChange = (selectedOption: OptionType) => {
		styleRef.current = {...styleRef.current, '--font-family': selectedOption.value};
		setSelected({...selected, 'font-family': selectedOption});
	}

	const handleFontSize = (selectedOption: OptionType) => {
		styleRef.current = {...styleRef.current, '--font-size': selectedOption.value};
		setSelected({...selected, 'font-size': selectedOption});
	}
	
	const handleFontColorChange = (selectedOption: OptionType) => {
		styleRef.current = {...styleRef.current, '--font-color': selectedOption.value};
		setSelected({...selected, 'font-color': selectedOption});
	}

	const handleBgColorChange = (selectedOption: OptionType) => {
		styleRef.current = {...styleRef.current, '--bg-color': selectedOption.value};
		setSelected({...selected, 'bg-color': selectedOption});
	}

	const handleContainerWidthChange = (selectedOption: OptionType) => {
		styleRef.current = {...styleRef.current, '--container-width': selectedOption.value};
		setSelected({...selected, 'container-width': selectedOption});
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setStyle(styleRef.current);
	}

	const handleReset = () => {
		setStyle(defaultStyle);
		styleRef.current = defaultStyle;
		setSelected(defaultSelected);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={style as CSSProperties}>
			<ArticleParamsForm 
				content={
					<>
						<Select
							selected={selected['font-family']}
							options={fontFamilyOptions}
							onChange={handleFontChange}
							title='Шрифт'/>
						<RadioGroup
							name={'font-controles'}
							options={fontSizeOptions}
							selected={selected['font-size']}
							title={'Размер шрифта'}
							onChange={handleFontSize}/>
						<Select
							selected={selected['font-color']}
							options={fontColors}
							onChange={handleFontColorChange}
							title='Цвет шрифта'/>
						<Separator />
						<Select
							selected={selected['bg-color']}
							options={backgroundColors}
							onChange={handleBgColorChange}
							title='Цвет фона'/>
						<Select
							selected={selected['container-width']}
							options={contentWidthArr}
							onChange={handleContainerWidthChange}
							title='Ширина контента'/>
					</>}
				controles={
					<>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' onClick={handleSubmit} />
					</>}
				/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
