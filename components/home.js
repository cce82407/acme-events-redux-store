import React, { Component } from 'react';
import axios from 'axios';
=
import store from '../store';
import { gotTasks } from '../actions';
import { homePageTasksContainer, homePageContainer } from './styles';

class HomePage extends Component {
  state = {
    events: store.getState().events,
  };

  componentDidMount() {
    store.subscribe(() => {
      const { events } = store.getState();

      this.setState({
        events,
      });
    });

    this.getEvents();
  }

  getEvents = () => {
    axios.get('/api/events')
      .then((res) => {
        store.dispatch(fetchEvents(res.data.events));
      })
      .catch((e) => {
        console.log('Failed to fetch events.');
        console.error(e);
      });
  }

  render() {
    const { events } = this.state;

    return (
     <p> You've got ${events.length} events! </p>
    );
  }
}

export default HomePage;