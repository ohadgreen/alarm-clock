import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { ClockDisplay } from "./clockDisplay/ClockDisplay";
import AlarmSetting from './setting/AlarmSetting';
import "./App.css";

const SNOOZE_MINUTES = 3;
const RADIO_URL = "http://streaming.tdiradio.com:8000/house.mp3";

class Clock extends React.Component {
  state = {
    currentTime: "",
    alarmTime: "",
    alarmHours: "",
    alarmMinutes: "",
    alarmOn: false
  };

  audio = new Audio(RADIO_URL);

  componentDidMount() {
    this.clock = setInterval(() => this.setCurrentTime(), 1000);
    this.interval = setInterval(() => this.checkAlarmClock(), 1000);
    this.setState({ alarmTime: localStorage.getItem("alarmTime") });
  }

  componentWillUnmount() {
    clearInterval(this.clock);
    clearInterval(this.interval);
  }

  setCurrentTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString("en-US", { hour12: false })
    });
  }

  setAlarmTime = e => {
    e.preventDefault();
    if (this.state.alarmHours !== "" && this.state.alarmMinutes !== ""){
        // console.log(`${this.state.alarmHours}:${this.state.alarmMinutes}`);
        const alarmTime = this.composeAlarmTime(
          this.state.alarmHours,
          this.state.alarmMinutes
        );
        this.setState({ alarmTime, alarmHours: "", alarmMinutes: "", });
        localStorage.setItem("alarmTime", alarmTime);
    }
  };

  composeAlarmTime = (hours, minutes) => {
    let today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes,
      0
    ).toLocaleTimeString("en-US", { hour12: false });
  };

  removeAlarm = e => {
      e.preventDefault();
      this.setState({ alarmTime: "", alarmOn: false });
      localStorage.removeItem("alarmTime");
  }

  snooze = e => {
    e.preventDefault();
    this.setState({
      alarmOn: false,
      alarmTime: this.composeAlarmTime(
        new Date().getHours(),
        new Date().getMinutes() + SNOOZE_MINUTES
      )
    });
    this.audio.pause();
  };

  setAlarmOff = () => {
    this.setState({ alarmOn: false });
    this.audio.pause();
  };

  checkAlarmClock() {
    if (this.state.alarmTime === "undefined" || !this.state.alarmTime) {
      this.alarmMessage = "Pls set your alarm.";
    } else {
      this.alarmMessage = "Your alarm is set for " + this.state.alarmTime;
      if (this.state.currentTime === this.state.alarmTime) {
        this.setState({ alarmOn: true });
        this.audio.play();
      }
    }
  }

  setHours = (e, { value }) => {
    this.setState({ alarmHours: value });
  };

  setMinutes = (e, { value }) => {
    this.setState({ alarmMinutes: value });
  };

  render() {
    return (
      <div className="app-container">
        <div className="clock">
          <ClockDisplay time={this.state.currentTime} />
        </div>
        <div className="setup">
          <AlarmSetting alarmTime={this.state.alarmTime} 
                        setHours={this.setHours}
                        setMinutes={this.setMinutes}
                        setDisabled={this.state.alarmHours === "" || this.state.alarmMinutes === ""}
                        setAlarm={this.setAlarmTime}
                        removeAlarm={this.removeAlarm}

          />          
          <Modal open={this.state.alarmOn} size={"tiny"}>
            <Modal.Content>
              <div className="alarm-container">
                <div className="alarm-header">Time to Workiz!</div>
                <div className="cancel-alarm-button">
              <Button size="tiny" color="red" onClick={this.setAlarmOff}>
                Cancel
              </Button>
              </div>
              <div className="snooze-alarm-button">
              <Button size="tiny" color="blue" onClick={this.snooze}>
                Snooze
              </Button>
              </div>
              </div>
            </Modal.Content>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Clock;
