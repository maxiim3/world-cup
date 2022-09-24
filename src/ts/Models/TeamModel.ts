import {Tools} from "../Tools/Tools"
export type JsonTypeProps = {
	name: string
	xp: number
	flag: string
}
export type TeamTypeProps = {
	name: string
	xp: number
	flag: string
	points: number
	id: string
}

export class TeamModel {
	private readonly _name: string
	private _xp: number
	private readonly _flag: string
	private _points: number
	private readonly _id: string

	constructor(json:JsonTypeProps) {
		this._name = json.name
		this._xp = json.xp
		this._flag = json.flag
		this._points = 0
		this._id = Tools.generateId(this._name) as string
	}

	get id(): string {
		return this._id
	}

	set points(value) {
		this._points = value
	}

	get points() {
		return this._points
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
