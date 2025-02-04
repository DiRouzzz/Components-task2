import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [steps, setSteps] = useState(data);

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	const onClickForward = () => {
		if (!isLastStep) {
			setActiveIndex(prev => prev + 1);
		}
	};

	const onClickBack = () => {
		if (!isFirstStep) {
			setActiveIndex(prev => prev - 1);
		}
	};

	const onClickStartAgain = () => {
		setActiveIndex(0);
	};

	const onClickActive = event => {
		const index = Number(event.target.textContent) - 1;
		setActiveIndex(index);
	};

	const stepsItem = steps.map(({ id, title }, idx) => {
		const isActive = idx === activeIndex;
		const isDone = idx < activeIndex;
		return (
			<li
				className={`${styles['steps-item']} ${isActive ? styles.active : ''} ${
					isDone ? styles.done : ''
				}`}
				key={id}>
				<button className={styles['steps-item-button']} onClick={onClickActive}>
					{idx + 1}
				</button>
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
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>{stepsItem}</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onClickBack}
							disabled={isFirstStep}>
							Назад
						</button>
						{isLastStep ? (
							<button className={styles.button} onClick={onClickStartAgain}>
								Начать сначала
							</button>
						) : (
							<button className={styles.button} onClick={onClickForward}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
