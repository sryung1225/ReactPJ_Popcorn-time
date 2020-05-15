import React from "react";
import DetailPresenter from "./Detailresenter";

export default class extends React.Component {
    state = {
        result: null, /* movie나 tv나 상관없이 결과 출력 */
        error: null,
        loading: true
    };

    render() {
        const { result, error, loading} = this.state;
        return (
            <DetailPresenter  
                result={result}
                error={error}
                loading={loading}
            />
        );
    }
}