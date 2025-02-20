import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const onClickForward = () => {
		setActiveIndex(prev => prev + 1);
	};

	const onClickBack = () => {
		setActiveIndex(prev => prev - 1);
	};

	const onClickStart = () => {
		setActiveIndex(0);
	};

	const onClickStep = (stepIndex) => {
		setActiveIndex(stepIndex);
	};

	const isStartIndex = activeIndex === 0;
	const isFinishIndex = activeIndex === data.length - 1;

	const stepsData = data.map(({ id, title }, idx) => {
		const isActive = idx === activeIndex;
		const isDone = idx < activeIndex;
		return (
			<li
				className={`${styles['steps-item']} ${isActive ? styles.active : ''} ${
					isDone ? styles.done : ''
				}`}
				onClick={() => onClickStep(idx)}
				key={id}>
				<button className={styles['steps-item-button']}>{idx + 1}</button>
				{title}
			</li>
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{data[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>{stepsData}</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onClickBack}
							disabled={isStartIndex}>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isFinishIndex ? onClickStart : onClickForward}>
							{isFinishIndex ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
