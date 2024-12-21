import React from "react";
import { useFetch } from "./hooks/useFetch";
import { API_URL } from "./constants/server-apis";
import { Loader } from "./components/Loader";

function App() {
    const { data, isLoading } = useFetch(API_URL)
    if (isLoading) {
        return <Loader />
    }
    console.log(data)
    return (
        <div className="container">
            <header>
                <h1>Frontend Assignment</h1>
            </header>
            <main>
            </main>
        </div>
    );
}

export default App;
