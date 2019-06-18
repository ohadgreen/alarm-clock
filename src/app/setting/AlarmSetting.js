import React from "react";
import { Dropdown, Button, Modal } from "semantic-ui-react";

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
          Create
        </Button>
        <Modal open={this.state.settingModal} size={"small"}>
          <Modal.Content>
            <Modal.Header>Set Alarm</Modal.Header>
            <form>
            <Dropdown
              placeholder={"hours"}
              onChange={this.props.setHours}
              options={this.dropDownNumberOptions(23)}
              scrolling
            />
            <Dropdown
              placeholder={"minutes"}
              onChange={this.props.setMinutes}
              options={this.dropDownNumberOptions(59)}
              scrolling
            />
            <Button size="tiny" color="green" disabled={!this.props.setDisabled} onClick={this.setAlarmAndCloseModal}>
              Set
            </Button>
          </form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AlarmSetting;
