import styles from "./Review.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Review({ data }) {
  
  return (
    <li className={styles.review}>
    <div className={styles.reviewWrapper} >
      { /* documentToReactComponents is a contentful function uset to write out the contenful rich text property */ }
      {documentToReactComponents(data?.recensionText?.json)} 
      <span className={styles.reviewName}>{data?.namn}</span>
    </div>
  </li>
  );
}
