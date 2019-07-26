import React from 'react'

const toDateInputValue = (() => {
    let local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toISOString().slice(0, 10);
});

const toTimeInputValue = (() => {
    let local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toISOString().slice(11, 16);
});


class InputDate extends React.Component {
    state = {
        date: toDateInputValue(), 
        time: toTimeInputValue() };

    onFormSubmit = (event) => {
        let fullDate = this.state.date + " " + this.state.time;
        console.log(new Date(fullDate))
        event.preventDefault();
    }

    render() {
        return (
        <form onSubmit={this.onFormSubmit}>
                <input type="date" value={this.state.date} onChange={(e) => { this.setState({ date: e.target.value })}}/>
                <input type="time" value={this.state.time} onChange={(e) => { this.setState({ time: e.target.value })}}/>
                <button type="submit">Submit</button>
        </form>);
    }
}

export default InputDate;