import {RoundProps} from "./StateProps"
import {TeamModel} from "../Models/TeamModel"

export type PhaseComponentProps = {
	componentRound: RoundProps
	currentRound: RoundProps
	teams: TeamModel | null;
	onChangeRound: Function
}

