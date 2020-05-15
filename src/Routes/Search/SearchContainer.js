import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        loading: false, /* 단어 입력 전에는 검색하기를 기다림(default가 false) */
        error: null
    };

    render() {
        const { movieResults, tvResults, searchTerm, loading, error} = this.state;
        return (
            <SearchPresenter  
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
            />
        );
    }
}