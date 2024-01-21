import styles from "./button.module.scss";

function Button({ classname, children, ...rest }) {
  return (
    <button className={styles[classname]} {...rest}>
      {children}
    </button>
  );
}

export default Button;
