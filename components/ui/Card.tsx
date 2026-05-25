import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function Card({ children, title, description, className }: CardProps) {
  return (
    <div className={`${styles.card} ${className || ""}`.trim()}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
