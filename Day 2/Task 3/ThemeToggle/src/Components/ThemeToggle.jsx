import {useState, useMemo } from "react";

const bigList = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);
function ThemeToggle (){
    const [search, setSearch] = useState('')
    const [darkMode, setDarkmode] = useState(false)
    const filterItems = useMemo(() =>{
        return bigList.filter(i=>i.toLowerCase().includes(search.toLowerCase()))
    }, [search])
    const toggleTheme = ()=>{
        setDarkmode(prev => !prev)
    }
    return(
        <>
            <div style={{
                background: darkMode ? "#222" : "#fff",
                color: darkMode ? "#fff" : "#000",
                minHeight: "100vh",
                padding: "20px"
                }}>
                <h2>Heavy Lifter Filter</h2>

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

                <ol>
                    {filterItems.slice(0, 10).map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ol>
            </div>
        </>
    )
}
export default ThemeToggle