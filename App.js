import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

class Countdown extends React.Component{
  constructor(props){
    super()
    this.state = {
      minutes: parseInt(props.min),
      seconds: parseInt(props.sec)
    }
  }
  componentDidMount() {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render(){
    const {minutes, seconds} = this.state
    return(
      <div>
        {minutes === 0 && seconds === 0 ? <h1>Selesai</h1> : <h1>Waktu tersisa: {minutes}:{seconds < 10 ? 0+seconds : seconds}</h1>}
      </div>
    )
  }
}

class Stopwatch extends React.Component{
  constructor() {
    super()
    this.state = {
      minutes: 0,
      seconds: 0,
      isToggleOn: false
    }
    this.start = this.start.bind(this)
    this.done = this.done.bind(this)
    this.lap = this.lap.bind(this)
  }

  async start() {
    await this.setState({isToggleOn: true})
    this.componentDidMount()
  }
  
  async done(){
    await this.setState({ isToggleOn: false })
    this.componentWillUnmount()
  }

  lap(){
    console.log(`menit adalah ${this.state.minutes} dan detik adalah ${this.state.seconds}`)
    return(
    alert(`Lap time: : ${this.state.minutes} : ${this.state.seconds}`)
    )
  }

  componentDidMount() {
    const { seconds, minutes, isToggleOn } = this.state
    if (isToggleOn){
      this.myInterval = setInterval(() => {
         if (seconds >= 0) {
          this.setState(({ seconds }) => ({ seconds: seconds + 1 }))
        } 
        if (seconds === 10) {
          this.setState(({ minutes }) => ({ minutes: minutes + 1, seconds: 0 }))
        }
      }, 1000)
    }
  }
  componentWillUnmount() {
    clearInterval(this.myInterval)
  }
  

  render() {
    const { minutes, seconds, isToggleOn } = this.state
    return (
      <div>
        {
          <h1>
            {minutes}:{seconds}
            <br />
            <button onClick={this.start}> Mulai</button>
            <button onClick={this.done}>Selesai</button>
            <button onClick={this.lap}>Lap</button>
          </h1>
        }
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Selamat datang di React</h3>
        <Countdown min="10" sec="0"/>
        <Stopwatch/>
      </header>
    </div>
  );
}

export default App;
