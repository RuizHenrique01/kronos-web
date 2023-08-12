import styles from './inputError.module.css'

interface IProps {
    children: React.ReactNode
}

export default function InputError({ children }: IProps){
    return (
        <span className={styles.error}>
            {children}
        </span>
    );
}