import {
	StrictMode,
	CSSProperties,
	useState,
} from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps'

import styles from './App.module.scss';

export const App = () => {
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
