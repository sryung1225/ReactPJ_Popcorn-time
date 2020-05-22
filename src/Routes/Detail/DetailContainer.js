import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi} from "api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const { 
            location: { pathname }
        } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount () {
        const {
            match: {
                params: { id } // 원하는 객체가 props 전체가 아니라 match 안에 있는 params 안에 있는 id
            },
            history: { push }
        } = this.props;
        const { isMovie } = this.state;
        const parseId = parseInt(id);
        if (isNaN(parseId)) {
            return push("/");
        } // id가 숫자가 아니면 Home으로 바꿈(강제이동)
        let result = null;
        try{
            if (isMovie) {
                //const { data: result } = await movieApi.movieDetail(parseId); 와 동일
                ({ data: result } = await movieApi.movieDetail(parseId));
            } else {
                ({ data: result } = await tvApi.showDetail(parseId));
            }
        } catch { 
            this.setState({ error: "Can't find anything." })
        } finally {
            this.setState({ loading: false, result })
        }
    }


    render() {
        const { result, error, loading} = this.state;
        // console.log(result);
        return (
            <DetailPresenter  
                result={result}
                error={error}
                loading={loading}
            />
        );
    }
}