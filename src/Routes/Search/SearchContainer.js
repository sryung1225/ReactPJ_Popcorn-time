import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi} from "api";

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        loading: false, /* 단어 입력 전에는 검색하기를 기다림(default가 false) */
        error: null
    };

    handleSubmit = () => {
        const { searchTerm } = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
    };

    searchByTerm = async() => {
        const { searchTerm } = this.state;
        this.setState({ loading : true });
        try {
            const {
                data: { results: movieResults }
            } = await movieApi.search(searchTerm);
            const {
                data: { results : tvResults }
            } = await tvApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            });
        } catch {
            this.setState({ error : "Can't find results." });
        } finally {
            this.setState({ loading : false });
        }
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
                handleSubmit={this.handleSubmit}
            />
        );
    }
}