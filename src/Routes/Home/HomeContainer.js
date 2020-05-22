import React from "react";
import HomePresenter from "./HomePresenter";
import { movieApi } from "api";

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount(){
        try{
            const { 
                data: { results: nowPlaying }
            } = await movieApi.nowPlaying(); //data 안에 results 안에 nowPlaying를 가져와 변수 nowPlaying안에 넣어줌
            //console.log(nowPlaying);
            const { 
                data: { results: upcoming }
            } = await movieApi.upcoming();
            const { 
                data: { results: popular }
            } = await movieApi.popular();
            this.setState({
                nowPlaying,
                upcoming,
                popular
            });
        } catch{
            this.setState({
                error: "Can't find movies information."
            }); /* 에러날 경우 */
        } finally{
            this.setState({
                loading: false
            }); /* 성공하던 에러나던 결과적으로는 false를 보여주도록*/
        } 
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading} = this.state;
        console.log(this.state);
        return(
            <HomePresenter  
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}