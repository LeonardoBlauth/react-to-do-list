import styles from './Counter.module.css';

interface CounterProps {
  variant: string;
  text: string;
  completedItemsQuantity?: number;
  itemsQuantity: number;
}
export function Counter({variant, text, completedItemsQuantity = 0, itemsQuantity,}: CounterProps) {
  return (
    <div className={styles.content}>
      <p className={styles[variant]}>
        {text}
      </p>
      <span>{variant === 'concluded' && completedItemsQuantity > 0 ? `${completedItemsQuantity} de ${itemsQuantity}` : completedItemsQuantity}</span>
    </div>
  )
}