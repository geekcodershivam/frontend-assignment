import React from "react";
import { useFetch } from "./hooks/useFetch";
import { API_URL } from "./constants/server-apis";
import { Loader } from "./components/Loader";
import { Table } from "./components/Table";
import { generateHeader } from "./config/generateHeader";

function App() {
    const { data, isLoading } = useFetch(API_URL)
    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="container">
            <header>
                <h1>Frontend Assignment</h1>
            </header>
            <main>
                <Table headers={generateHeader()} data={data} />
            </main>
        </div>
    );
}

export default App;
