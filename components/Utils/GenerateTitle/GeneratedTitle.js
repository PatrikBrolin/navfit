import styles from './GeneratedTitle.module.scss'
import { useState, useRef, useEffect } from 'react';

export default function GeneratedTitle({headline}){

    const [fetchedHeader, setFetchedHeader] = useState(headline)
    const [fullHeader, setFullHeader] = useState("Jag hjälper dig med träning och kost för att nå dina mål ");
    const [header, setHeader] = useState("");
    const headerRef = useRef("");
    const [headerAnimationDone, setHeaderAnimationDone] = useState(false);
    // const [fullHeaderAppend, setFullHeaderAppend] = useState("digitalt?");
    const [headerAppend, setHeaderAppend] = useState("");
    const headerAppendRef = useRef("");

    useEffect(() => {
        setTimeout(() => {
            createHeader();
        }, 500);
    }, []);

    // useEffect(() => {
    //     if(headerAnimationDone) {
    //         createHeaderAppend();
    //     }
    // }, [headerAnimationDone]);

    function createHeader() {
        for (let i = 0; i < fullHeader?.length; i++) {
            setTimeout(() => {
                let newHeader = headerRef.current + fullHeader[i];
                setHeader(newHeader);
                headerRef.current = newHeader;

                if(i == fullHeader?.length - 1) {
                    setHeaderAnimationDone(true);
                }
    
            }, 40 * (i + 1));
        }
    }
    function createHeaderAppend() {
        for (let i = 0; i < fullHeaderAppend?.length; i++) {
            setTimeout(() => {
                let newHeader = headerAppendRef.current + fullHeaderAppend[i];
                setHeaderAppend(newHeader);
                headerAppendRef.current = newHeader;
    
            }, 40 * (i + 1));
        }
    }

    console.log(headerAppend)
    return(
        <div className={styles.headerContainer}>
        <h1 className={styles.header}>{header}</h1>
        </div>
    )
   
}