import React, {ButtonHTMLAttributes, useEffect, useState} from "react"
import {TeamModel} from "../Models/TeamModel"
import {Tools} from "../Tools/Tools"
import Loader from "./Loader"

class Match {
	host: TeamModel
	hostGoals: number
	guest: TeamModel
	guestGoals: number

	constructor(host: TeamModel, guest: TeamModel) {
		this.host = host
		this.guest = guest
		this.hostGoals = 0
		this.guestGoals = 0
	}

	random(team: TeamModel) {
		function shots() {
			const scores = []
			for (let chance = 0; chance < team.xp * 1000; chance++) {
				scores.push(Math.random())
			}
			const sum = Math.round(scores.reduce((res, score) => res + score))
			// const maxScore = Math.round((sum * team.xp / 1000))
			return Math.round(sum / scores.length)
		}

		const collection = []
		for (let i = 0; i < team.xp; i++) {
			collection.push(shots())
		}
		return collection.reduce((res, score) => res + score)
	}

	match(): void {
		this.hostGoals = this.random(this.host)
		this.guestGoals = this.random(this.guest)
		let winner: TeamModel | null = null
		if (this.hostGoals !== this.guestGoals) {
			if (this.hostGoals < this.guestGoals) winner = this.guest
			else if (this.hostGoals > this.guestGoals) winner = this.host
		}
		if (winner) {
			winner.points += 3
		}
	}
}

const TeamRow = (props: {team: TeamModel}) => {
	const [points, setPoints] = useState(props.team.points)
	useEffect(() => {
		return () => {}
	}, [points])

	return (
		<tr
			key={Tools.generateId(props.team.id)}
			data-team-row={props.team.id}>
			<td>{props.team.name}</td>
			<td className={"group__flags"}>{props.team.flag}</td>
			<td className={"points"}>{points}</td>
		</tr>
	)
}

const Group = (props: {group: IGroupType}) => {
	const [loading, setLoading] = useState(false)
	const buttonID = Tools.generateId("button", props.group.key)

	function simulateGroups() {
		setLoading(true)
		const btn = document.getElementById(CSS.escape(buttonID)) as HTMLButtonElement
		btn.disabled = true

		const matchs = [
			new Match(props.group.teams[0], props.group.teams[1]),
			new Match(props.group.teams[0], props.group.teams[2]),
			new Match(props.group.teams[0], props.group.teams[3]),
			new Match(props.group.teams[1], props.group.teams[2]),
			new Match(props.group.teams[1], props.group.teams[3]),
			new Match(props.group.teams[2], props.group.teams[3]),
		]
		matchs.forEach(match => match.match())
		setTimeout(() => {
			setLoading(false)
		}, 750)
	}

	return (
		<article>
			<h3 className={"group__name"}>{props.group.key.toUpperCase()}</h3>
			<table className={`group__table group__table--${props.group.key}`}>
				<thead>
					<tr>
						<th>nom</th>
						<th>flag</th>
						<th>points</th>
					</tr>
				</thead>
				<tbody>
					{loading && <Loader>Loading Groups</Loader>}
					{!loading &&
						props.group.teams.map(team => (
							<TeamRow
								key={Tools.generateId(team.id)}
								team={team}
							/>
						))}
				</tbody>
			</table>
			<button
				id={buttonID}
				className={"btn__simulate-group"}
				onClick={() => simulateGroups()}>
				Simulate
			</button>
		</article>
	)
}

export default Group

export interface IGroupType {
	key: string
	teams: TeamModel[]
}
