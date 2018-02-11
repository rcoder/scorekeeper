type Option<T> = T | undefined;

type Player = {
    name: string
};

export type Score = {
    key: number,
    player: Player,
    value: number
};

type GameEvent = "add_player" | "remove_player" | "change_score"

type GameUpdate = {
    event: GameEvent,
    ts: Date,
    target: Player,
    value: Option<any>
};

export class Game {
    history: Array<GameUpdate> = [];
    players: Array<Player> = [];

    private addEvent(event: GameEvent, target: Player, value: Option<any>) {
        let update = {
            event: event,
            ts: new Date(),
            target: target,
            value: value
        };
        this.history.push(update);
    }

    public addPlayer(name: string) {
        let player = {name: name};
        this.players.push(player);
        this.addEvent("add_player", player, undefined);
    }

    public removePlayer(name: string) {
        let player = {name: name};
        this.players = this.players.filter( p => p.name != name );
        this.addEvent("remove_player", player, undefined);
    }

    public changeScore(name: string, score: number) {
        this.addEvent("change_score", {name: name}, {currentScore: score});
    }

    public currentScores(): Array<Score> {
        let scores: {[key: string]: number} = {}

        let scoreChanges = this.history.filter( e => e.event == "change_score" );

        for (let e of scoreChanges) {
            scores[e.target.name] = e.value as number;
        }

        let current: Array<Score> = [];
        let idx = 0;
        
        for (let p of this.players) {
            let score = scores[p.name] ? scores[p.name] : 0;
            current.push({key: idx, player: p, value: score});
            idx = idx + 1;
        }

        return current;
    }
};
