import React from "react";
import { useFetch } from "./hooks/useFetch";
import { API_URL } from "./constants/server-apis";
import { Loader } from "./components/Loader";
import { generateHeader } from "./config/generateHeader";
import { TableWrapper } from "./components/TableWrapper";

function App() {
    const { data, isLoading, error } = useFetch(API_URL)

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div role="alert" className="error">{error}</div>
    }

    return (
        <div className="container">
            <header>
                <h1>Frontend Assignment</h1>
            </header>
            <main>
                <TableWrapper headers={generateHeader()} data={data} showPagination={true} />
            </main>
        </div>
    );
}

export default App;
