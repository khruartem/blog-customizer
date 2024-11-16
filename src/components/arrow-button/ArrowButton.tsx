import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	handleClick: OnClick;
	formState: boolean;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const { handleClick, formState } = props;

	const classNameForm = clsx(styles.container, {
		[styles.container_open]: formState,
	});

	const classNameArrow = clsx({
		[styles.arrow]: !formState,
		[styles.arrow_open]: formState,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classNameForm}
			onClick={handleClick}>
			<img src={arrow} alt='иконка стрелочки' className={classNameArrow} />
		</div>
	);
};
