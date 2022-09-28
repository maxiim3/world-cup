import {Tools} from "../Tools/Tools"

export type JsonTypeProps = {
	name: string
	xp: number
	flag: string
}

type RoundProps = {
	isQualified: boolean
	points: number
}
type RoundsType = {
	groups: RoundProps
	huitieme: RoundProps
	quart: RoundProps
	semiFinal: RoundProps
	final: RoundProps
	winner: boolean
}

export class TeamModel {
	private readonly _name: string
	private _xp: number
	private readonly _flag: string
	rounds: RoundsType
	private readonly _id: string

	constructor(json: JsonTypeProps) {
		this._name = json.name
		this._xp = json.xp
		this._flag = json.flag
		this._id = Tools.generateId(this._name) as string
		this.rounds = {
			groups: {
				isQualified: false,
				points: 0,
			},
			huitieme: {
				isQualified: false,
				points: 0,
			},
			quart: {
				isQualified: false,
				points: 0,
			},
			semiFinal: {
				isQualified: false,
				points: 0,
			},
			final: {
				isQualified: false,
				points: 0,
			},
			winner: false,
		}
	}

	get id(): string {
		return this._id
	}

	get flag() {
		return this._flag
	}

	get name() {
		return this._name
	}

	get xp() {
		return this._xp
	}

	set xp(value) {
		if (value >= 100) this._xp = 100
		else if (value <= 0) this._xp = 0
		else this._xp = value
	}
}
