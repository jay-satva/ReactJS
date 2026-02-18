import { useEffect, useState, useRef } from 'react';
function MemoPad(){
    const textAreaRef = useRef(null)
    const saveCountRef = useRef(0)
    useEffect(() => {
        textAreaRef.current.focus()
    }, [])

    const handleSave = () => {
        saveCountRef.current += 1
        console.log("Saved times:", saveCountRef.current);
    }
    return(
        <>
        <div>
            <h2>Memo Pad</h2>
            <textarea
                ref={textAreaRef}
                placeholder="Start typing..."
                rows={5}
                cols={40}
            />
            <br /><br />

            <button onClick={handleSave}>
                Manual Save
            </button>
        </div>
        </>
    )
}
export default MemoPad