import React from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends React.Component {
    state = {
        trackTitle: ''
    }

    findTrack = (e, dispatch) => {
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10page=1&s_track_rating=desc&apikey=${
            process.env.REACT_APP_MM_KEY
          }`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                });
                this.setState({trackTitle: ''});
            })
            .catch(err => console.log(err));
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Consumer>
                {value=> {
                    const { dispatch } = value;
                   return (
                    <div className="card card-body mb-4 p-4">
                        <h1 className="display-4 text-center">
                           <i className="fas fa-music"></i> Search for A song    
                        </h1> 
                        <p className="lead text-center">Get the lyrics for any songs</p>
                        <form onSubmit={e => this.findTrack(e, dispatch)}>
                            <div className="form-group">
                                <input 
                                type="text" 
                                placeholder="Song title..." 
                                name="trackTitle"
                                value={this.state.trackTitle}
                                className="form-control form-control-lg"
                                onChange={this.onChange} />
                            </div>
                            <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get track lyrics</button>
                        </form>
                    </div>
                   ); 
                }}
            </Consumer>
        )
    }
}

export default Search;