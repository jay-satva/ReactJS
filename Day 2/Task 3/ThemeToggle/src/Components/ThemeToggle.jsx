import {useState, useMemo, useEffect } from "react";

const bigList = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);
function ThemeToggle (){
    const [search, setSearch] = useState('')
    const [darkMode, setDarkmode] = useState(false)
    useEffect(() => {
        document.body.className = darkMode ? "dark" : "light";
    }, [darkMode]);

    const filterItems = useMemo(() =>{
        return bigList.filter(i=>i.toLowerCase().includes(search.toLowerCase()))
    }, [search])
    const toggleTheme = ()=>{
        setDarkmode(prev => !prev)
    }
    return(
        <>
            <div>

                <input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <button onClick={toggleTheme}>
                    Toggle Theme
                </button>

                <p>Results: {filterItems.length}</p>

                
                    <table style={{border: "1px solid black", borderCollapse: "collapse", width: "300px"}}>
                        <tr>
                            <th style={{ border: "1px solid black", padding: "8px" }}>Sr. No</th>
                            <th style={{ border: "1px solid black", padding: "8px" }}>Item</th>
                        </tr>
                        <tbody>
                            {filterItems.slice(0, 10).map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid black", padding: "8px" }}>
                                {index + 1}
                                </td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>
                                {item}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                
            </div>
        </>
    )
}
export default ThemeToggle