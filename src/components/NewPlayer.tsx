import * as React from "react";
import * as Models from "../models";

type NewPlayerProps = {
    handler: (name: string) => void 
}

type NewPlayerState = {
    name: string
}

export default class NewPlayer extends React.Component<NewPlayerProps, NewPlayerState> {
    constructor(props: NewPlayerProps) {
        super(props);
        this.state = {name: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    private handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.name == "") {
            return;
        }

        this.props.handler(this.state.name);
        this.setState({name: ""});
    }

    private handleInput(event: any) {
        let target = event.target as HTMLInputElement;
        this.setState({name: target.value});
    }

    render() {
        return <form className="sk-newplayer-form">
            <input 
                type="text"
                onChange={this.handleInput}
                placeholder="New player name"
                value={this.state.name} />

            <button className="sk-newplayer-button" onClick={this.handleSubmit}>Ok</button>
        </form>
    }
}