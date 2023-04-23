import styles from "./About.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useEffect, useState } from "react";
export default function About({ data }) {
  const [content, setContent] = useState();
  useEffect(() => {
    if (data) {
      setContent(
        <p>{documentToReactComponents(data?.items[0]?.paragrafText?.json)}</p>
      );
    }
  }, []);
  return <>{content}</>;
}
