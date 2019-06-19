import React from "react";
import { Dropdown, Button, Modal } from "semantic-ui-react";
import './AlarmSetting.css';

class AlarmSetting extends React.Component {
  state = {
    settingModal: false
  };

  dropDownNumberOptions = n => {
    let dropDownOptions = [];
    for (let i = 0; i <= n; i++) {
      dropDownOptions.push({ text: i, value: i });
    }
    return dropDownOptions;
  };

  setAlarmAndCloseModal = e => {
    this.props.setAlarm(e); 
    this.setState({ settingModal: false });
  }

  render() {
    const alarmIsSet = this.props.alarmTime && this.props.alarmTime !== "";

    return (
      <div>
        <h3>
          {alarmIsSet
            ? "alarm set for " + this.props.alarmTime
            : "alarm not set"}
        </h3>
        <Button
          size="tiny"
          color="blue"
          onClick={() => this.setState({ settingModal: true })}
        >
          {alarmIsSet ? "Update" : "Create"}
        </Button>
        {alarmIsSet ? 
        <Button
          size="tiny"
          color="red"
          onClick={this.props.removeAlarm}
        >
          Remove
        </Button> : ""}
        <Modal open={this.state.settingModal} size={"tiny"}>
          <Modal.Content>
            <div className="alarm-setting-container">
            <div className="alarm-setting-header">Set Alarm Time:</div>
            <div className="set-hours-dd">
            <Dropdown
              placeholder={"hours"}
              onChange={this.props.setHours}
              options={this.dropDownNumberOptions(23)}
              scrolling
            />
            </div>
            <div className="set-minutes-dd">
            <Dropdown
              placeholder={"minutes"}
              onChange={this.props.setMinutes}
              options={this.dropDownNumberOptions(59)}
              scrolling
            />
            </div>
            <div className="alarm-set-button">
            <Button size="tiny" color="green" disabled={this.props.setDisabled} onClick={this.setAlarmAndCloseModal}>
              Set
            </Button>
            </div>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AlarmSetting;
