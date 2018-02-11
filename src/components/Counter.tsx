import * as React from "react";
import * as Models from "../models";

type CounterProps = {
    player: string,
    score: number,
    bgcolor: string,
    scoreHandler: (name: string, delta: number) => void,
    removeHandler: (name: string) => void
};

type CounterState = {
    score: number;
};

export default class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = { score: props.score };
        this.changeScore = this.changeScore.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    private changeScore(delta: number) {
        var newScore = this.state.score + delta;
        this.setState({ score: newScore });
        this.props.scoreHandler(this.props.player, delta);
    }

    private handleRemove() {
        if (confirm("Remove player " + this.props.player + "@")) {
            this.props.removeHandler(this.props.player);
        }
    }

    render() {
        let style = {
            background: this.props.bgcolor
        };
        console.log({name: this.props.player, color: this.props.bgcolor});

        return <div className="sk-counter" style={style}>
            <span className="sk-counter-name">{ this.props.player }</span>
            <button className="sk-counter-decr" onClick = { _ => this.changeScore(-1) }> - </button>
            <span className="sk-counter-score">{ this.state.score }</span>
            <button className="sk-counter-incr" onClick = { _ => this.changeScore(1) }> + </button>
            <button className="sk-player-remove" onClick = {this.handleRemove}> X </button>
        </div>;
    }
}