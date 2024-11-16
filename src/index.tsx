import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	CSSProperties,
	useState,
	useRef,
	SyntheticEvent,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	SelectedOption,
	fontColors,
	ArticleStateType,
} from './constants/articleProps';
import { Select } from './components/select/Select';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Separator } from './components/separator';
import { Button } from './components/button';
import { RadioGroup } from './components/radio-group';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appStyle, setAppStyle] = useState(defaultArticleState);
	
	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': appStyle.fontFamilyOption.value,
					'--font-size': appStyle.fontSizeOption.value,
					'--font-color': appStyle.fontColor.value,
					'--container-width': appStyle.contentWidth.value,
					'--bg-color': appStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm appStyle={appStyle} changeAppStyle={setAppStyle}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
