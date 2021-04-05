import React from 'react'
import axios from 'axios'
import styled from 'styled-components'


const MainBox = styled.div`
text-align: center;`

const ActivityBox = styled.div`
font-size: 24px;`

export default class App extends React.Component {

  state = {
    activity: [],
    showActivity: false
  }

  getActivity = async () => {
    const response = await axios.get("http://www.boredapi.com/api/activity/")
    this.setState({activity: response.data, showActivity: true})
  }

  renderActivity = () => {
    const {activity, accessibility, type, link, participants, price} = this.state.activity
    return (
    <ActivityBox>
      <p><b>Type:</b> {type.charAt(0).toUpperCase() + type.slice(1)}</p>
      <p><b>Activity:</b> {activity}</p>
      <hr/>
      <p><b>Participants:</b> {participants}</p>
      <p><b>Accessibilyt (0/1):</b> {accessibility}</p>
      <p><b>Price (0/1):</b> {price}</p>
      <p><b>Link:</b> {link !== '' ? <a href={link} target="_blank">{link}</a> : 'None'}</p>
      <button onClick={this.getActivity}>Receive Other Recommendation</button>
    </ActivityBox>)
  }

  render() {

    return (
      <MainBox>
        <h1>Press the button to receive a activity recommendation!</h1><hr/>
        {this.state.showActivity ? this.renderActivity() :  
        <button onClick={this.getActivity}>Receive Recommendation</button>}
      </MainBox>
    )
  }
}
