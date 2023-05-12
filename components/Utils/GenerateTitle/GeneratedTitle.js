import styles from './GeneratedTitle.module.scss'
import { useState, useRef, useEffect } from 'react';

//This component creates the text in the hero section that writes out text like a typewriter
export default function GeneratedTitle(){

    const [fullHeader, setFullHeader] = useState("Navarro "); 
    const [header, setHeader] = useState("");
    const headerRef = useRef("");
    const [headerAnimationDone, setHeaderAnimationDone] = useState(false);
    const [fullHeaderAppend, setFullHeaderAppend] = useState("Fitness");
    const [headerAppend, setHeaderAppend] = useState("");
    const headerAppendRef = useRef("");

    useEffect(() => {
        setHeader("")
        setTimeout(() => {
            createHeader();
        }, 500);
    }, []);

    useEffect(() => {
        if(headerAnimationDone) {
            createHeaderAppend();
        }
    }, [headerAnimationDone]);

    // this function creates the first part of the heading "Navarro"
    //it takes the length of the state fullHeader and append one letter att a time to the state setHeader state
    // i use a timeout to give the look of the text beeing writen out. 
    function createHeader() {
        for (let i = 0; i < fullHeader?.length; i++) {
            setTimeout(() => {
                let newHeader = headerRef.current + fullHeader[i];
                setHeader(newHeader);
                headerRef.current = newHeader;

                if(i == fullHeader?.length - 1) {
                    setHeaderAnimationDone(true);
                }
    
            }, 100 * (i + 1));
        }
    }
     // this function creates the last part of the heading "Fitness"
    // it takes the length of the state fullHeaderAppeng and append one letter att a time to the state setHeaderAppend state
    // i use a timeout to give the look of the text beeing writen out. 
    function createHeaderAppend() {
        for (let i = 0; i < fullHeaderAppend?.length; i++) {
            setTimeout(() => {
                let newHeader = headerAppendRef.current + fullHeaderAppend[i];
                setHeaderAppend(newHeader);
                headerAppendRef.current = newHeader;
    
            }, 100 * (i + 1));
        }
    }

    return(
        <div className={styles.headerContainer}>
            <h2 className={styles.header}><span>{header}</span>{headerAppend}</h2>
        </div>
    )
   
}