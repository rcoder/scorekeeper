import * as React from "react";
import * as Models from "../models";
import * as MD5 from "md5";
import * as Color from "color";

import Counter from "./Counter";
import NewPlayer from "./NewPlayer";

type ScorekeeperProps = {
    game: Models.Game
}

type ScorekeeperState = {
    game: Models.Game
}

export default class Scorekeeper extends React.Component<ScorekeeperProps, ScorekeeperState> {
    constructor(props: ScorekeeperProps) {
        super(props);
        this.state = {game: this.props.game};
        this.changeScore = this.changeScore.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
    }

    private generateColor(name: string): string {
        let hash = MD5(name + "."); // magic nonce makes our names look better :)
        let color = Color("#" + hash.slice(hash.length - 6));
        return color.darken(0.4).toString();
    }

    private changeScore(name: string, score: number) {
        let game = this.state.game;
        game.changeScore(name, score);
        this.setState({game: game});
    }

    private addPlayer(name: string) {
        let game = this.state.game;
        game.addPlayer(name);
        this.setState({game: game});
    }

    private removePlayer(name: string) {
        let game = this.state.game;
        game.removePlayer(name);
        this.setState({game: game});
    }

    render() {
        let currentScores = this.state.game.currentScores()

        return <div className="sk-game">
            <NewPlayer handler={this.addPlayer} />
            <h1>&micro;Scorekeeper</h1>
            {currentScores.map(score => 
                <Counter
                    bgcolor={this.generateColor(score.player.name)}
                    key={score.key}
                    player={score.player.name}
                    score={score.value}
                    scoreHandler={this.changeScore}
                    removeHandler={this.removePlayer} />
            )}
        </div>
    }
}